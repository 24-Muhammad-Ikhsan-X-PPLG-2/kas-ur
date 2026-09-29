"use client";

import { Plus } from "lucide-react";
import BendaharaFooter from "@/features/bendahara/components/BendaharaFooter";
import BendaharaNavbar from "@/features/bendahara/components/BendaharaNavbar";
import DeleteExpenseDialog from "./components/DeleteExpenseDialog";
import ExpenseDetailDialog from "./components/ExpenseDetailDialog";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseFormDialog from "./components/ExpenseFormDialog";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { ExpenseClientProps } from "./type";
import { usePengeluaran } from "./hooks/usePengeluaran";

const PengeluaranClient = ({ username }: ExpenseClientProps) => {
  const {
    filteredExpenses,
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
  } = usePengeluaran();

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
          onEdit={openEdit}
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
