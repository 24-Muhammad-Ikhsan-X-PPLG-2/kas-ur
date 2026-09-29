"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/supabase/client";
import { ExpenseFormValues } from "../schema";
import {
  DateFilter,
  Expense,
  ExpenseCategory,
  ExpenseSummaryRow,
  PaymentSummaryRow,
} from "../type";
import { getDateRange, getTotal } from "../utils";

export const usePengeluaran = () => {
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
  const openEdit = (expense: Expense) => setFormExpense(expense);
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

  return {
    expenses,
    filteredExpenses: expenses,
    search,
    category,
    dateFilter,
    isLoading,
    formExpense,
    selectedExpense,
    deletingExpense,
    summary,
    setSearch,
    setCategory,
    setDateFilter,
    setSelectedExpense,
    setDeletingExpense,
    openAdd,
    openEdit,
    closeForm,
    resetFilters,
    handleSave,
    handleDelete,
  };
};
