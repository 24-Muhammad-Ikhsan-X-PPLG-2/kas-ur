"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/supabase/client";
import BendaharaFooter from "@/features/bendahara/components/BendaharaFooter";
import BendaharaNavbar from "@/features/bendahara/components/BendaharaNavbar";
import { ExpenseFormValues } from "./schema";
import DeleteExpenseDialog from "./components/DeleteExpenseDialog";
import ExpenseDetailDialog from "./components/ExpenseDetailDialog";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseFormDialog from "./components/ExpenseFormDialog";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { DateFilter, Expense, ExpenseCategory } from "./type";
import { getTodayDate } from "./utils";

type ExpenseSummaryRow = {
  amount: number | string;
  spent_at: string;
};

type PaymentSummaryRow = {
  amount: number | string;
};

type ExpenseClientProps = {
  username: string;
};

const getDateRange = (filter: DateFilter) => {
  if (filter === "all") return null;

  const today = new Date();
  const todayDate = getTodayDate();
  let startDate: Date;

  if (filter === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
  } else if (filter === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  } else {
    startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  }

  const offset = startDate.getTimezoneOffset() * 60000;
  const normalizedStart = new Date(startDate.getTime() - offset)
    .toISOString()
    .slice(0, 10);

  return { startDate: normalizedStart, endDate: todayDate };
};

const getTotal = (rows: { amount: number | string }[]) =>
  rows.reduce((total, row) => total + Number(row.amount), 0);

const PengeluaranClient = ({ username }: ExpenseClientProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [formExpense, setFormExpense] = useState<Expense | null | undefined>(
    undefined,
  );
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [summary, setSummary] = useState({
    balance: 0,
    totalExpenses: 0,
    currentMonthExpenses: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadExpenses = async () => {
      setIsLoading(true);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!isMounted) return;
      if (authError || !user) {
        toast.error("Sesi pengguna tidak ditemukan.");
        setIsLoading(false);
        return;
      }

      let expenseQuery = supabase
        .from("cash_expenses")
        .select(
          `
            *,
            profile:profiles!cash_expenses_created_by_fkey(
              id,
              username,
              avatar_url
            )
          `,
        )
        .order("spent_at", { ascending: false });

      const normalizedSearch = search.trim().replace(/[(),]/g, "");
      if (normalizedSearch) {
        expenseQuery = expenseQuery.or(
          `title.ilike.%${normalizedSearch}%,description.ilike.%${normalizedSearch}%,category.ilike.%${normalizedSearch}%`,
        );
      }
      if (category !== "all") {
        expenseQuery = expenseQuery.eq("category", category);
      }
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        expenseQuery = expenseQuery
          .gte("spent_at", dateRange.startDate)
          .lte("spent_at", dateRange.endDate);
      }

      const [expenseResponse, allExpensesResponse, paymentsResponse] =
        await Promise.all([
          expenseQuery,
          supabase.from("cash_expenses").select("amount, spent_at"),
          supabase.from("cash_payments").select("amount"),
        ]);

      if (!isMounted) return;
      if (expenseResponse.error) {
        toast.error(
          `Pengeluaran gagal dimuat: ${expenseResponse.error.message}`,
        );
        setExpenses([]);
      } else {
        setExpenses((expenseResponse.data ?? []) as unknown as Expense[]);
      }

      if (allExpensesResponse.error || paymentsResponse.error) {
        toast.error("Ringkasan kas gagal dimuat.");
      } else {
        const allExpenses = (allExpensesResponse.data ??
          []) as ExpenseSummaryRow[];
        const payments = (paymentsResponse.data ?? []) as PaymentSummaryRow[];
        const totalExpenses = getTotal(allExpenses);
        const currentMonthRange = getDateRange("month");
        const currentMonthExpenses = allExpenses
          .filter(
            (expense) =>
              Boolean(currentMonthRange) &&
              expense.spent_at >= currentMonthRange!.startDate &&
              expense.spent_at <= currentMonthRange!.endDate,
          )
          .reduce((total, expense) => total + Number(expense.amount), 0);

        setSummary({
          totalExpenses,
          currentMonthExpenses,
          balance: getTotal(payments) - totalExpenses,
        });
      }
      setIsLoading(false);
    };

    void loadExpenses();
    return () => {
      isMounted = false;
    };
  }, [category, dateFilter, refreshKey, search]);

  const openAdd = () => setFormExpense(null);
  const closeForm = () => setFormExpense(undefined);
  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setDateFilter("all");
  };

  const handleSave = async (values: ExpenseFormValues) => {
    const toastId = toast.loading("Menyimpan pengeluaran...");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.update(toastId, {
        render: "Sesi pengguna tidak ditemukan.",
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
      return;
    }

    const payload = {
      title: values.title.trim(),
      description: values.description?.trim() || null,
      amount: Number(values.amount.replace(/[^0-9]/g, "")),
      category: values.category as ExpenseCategory,
      spent_at: values.spent_at,
    };

    const response = formExpense
      ? await supabase
          .from("cash_expenses")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", formExpense.id)
          .select("id")
          .maybeSingle()
      : await supabase
          .from("cash_expenses")
          .insert({
            ...payload,
            created_by: user.id,
          })
          .select("id")
          .single();

    if (response.error || (formExpense && !response.data)) {
      toast.update(toastId, {
        render:
          response.error?.message ??
          "Pengeluaran tidak ditemukan atau kamu tidak memiliki izin untuk mengubahnya.",
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
      return;
    }

    toast.update(toastId, {
      render: formExpense
        ? "Pengeluaran berhasil diperbarui."
        : "Pengeluaran berhasil ditambahkan.",
      autoClose: 3000,
      isLoading: false,
      type: "success",
    });
    closeForm();
    setRefreshKey((current) => current + 1);
  };

  const handleDelete = async () => {
    if (!deletingExpense) return;
    const toastId = toast.loading("Menghapus pengeluaran...");
    const { error } = await supabase
      .from("cash_expenses")
      .delete()
      .eq("id", deletingExpense.id);

    if (error) {
      toast.update(toastId, {
        render: error.message,
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
      return;
    }

    toast.update(toastId, {
      render: "Pengeluaran berhasil dihapus.",
      autoClose: 3000,
      isLoading: false,
      type: "success",
    });
    setDeletingExpense(null);
    setSelectedExpense(null);
    setRefreshKey((current) => current + 1);
  };

  const filteredExpenses = useMemo(() => expenses, [expenses]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#241a1a]">
      <BendaharaNavbar username={username} />
      <div className="mx-auto max-w-300 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#550000]">
              XI PPLG 2 / Bendahara
            </p>
            <h1 className="text-[2.9rem] font-black leading-[.92] tracking-[-.08em] sm:text-6xl">
              Atur <span className="text-[#550000]">pengeluaran.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-[#6f6262] sm:text-lg">
              Kelola dan pantau penggunaan uang kas XI PPLG 2.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[5px_5px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000] sm:w-auto"
          >
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
            Tambah Pengeluaran
          </button>
        </header>
        <ExpenseSummary {...summary} />
        <ExpenseFilters
          search={search}
          category={category}
          dateFilter={dateFilter}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onDateFilterChange={setDateFilter}
          onReset={resetFilters}
        />
        <ExpenseList
          expenses={filteredExpenses}
          isLoading={isLoading}
          onSelect={setSelectedExpense}
          onEdit={(expense) => setFormExpense(expense)}
          onDelete={setDeletingExpense}
          onAdd={openAdd}
        />
      </div>
      <BendaharaFooter />
      {formExpense !== undefined && (
        <ExpenseFormDialog
          expense={formExpense}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}
      {selectedExpense && (
        <ExpenseDetailDialog
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
        />
      )}
      {deletingExpense && (
        <DeleteExpenseDialog
          expense={deletingExpense}
          onClose={() => setDeletingExpense(null)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
};

export default PengeluaranClient;
