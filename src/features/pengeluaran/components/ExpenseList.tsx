import { CalendarDays, Eye, Pencil, Trash2 } from "lucide-react";
import { Expense } from "../type";
import { formatExpenseAmount, formatExpenseDate } from "../utils";

type ExpenseListProps = {
  expenses: Expense[];
  isLoading: boolean;
  onSelect: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
  onAdd: () => void;
};

const ExpenseSkeleton = () => (
  <div className="animate-pulse space-y-3 border-b-2 border-[#ddd0c7] px-4 py-5 last:border-b-0 md:grid md:grid-cols-[.8fr_1.5fr_1fr_.9fr_.8fr_auto] md:items-center md:gap-4 md:space-y-0 md:px-5">
    <div className="h-4 w-24 bg-[#ead6d1]" />
    <div>
      <div className="h-4 w-40 bg-[#ead6d1]" />
      <div className="mt-2 h-3 w-56 bg-[#f0e5de]" />
    </div>
    <div className="h-5 w-16 bg-[#ead6d1]" />
    <div className="h-4 w-24 bg-[#ead6d1]" />
    <div className="h-4 w-16 bg-[#ead6d1]" />
    <div className="h-9 w-20 bg-[#ead6d1]" />
  </div>
);

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="border-[3px] border-dashed border-[#b8a49d] p-8 text-center sm:p-12">
    <p className="text-xl font-black tracking-[-0.04em]">
      Belum ada pengeluaran
    </p>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6f6262]">
      Belum ada catatan pengeluaran yang sesuai dengan pencarian atau filter
      kamu.
    </p>
    <button
      type="button"
      onClick={onAdd}
      className="mt-5 min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
    >
      Tambah Pengeluaran
    </button>
  </div>
);

const ExpenseActions = ({
  expense,
  onEdit,
  onDelete,
}: Pick<ExpenseListProps, "onEdit" | "onDelete"> & { expense: Expense }) => (
  <div className="flex gap-2" onClick={(event) => event.stopPropagation()}>
    <button
      type="button"
      onClick={() => onEdit(expense)}
      className="grid h-9 w-9 place-items-center rounded-md border-2 border-[#241a1a] bg-[#fffaf2] text-[#550000] transition hover:bg-[#550000] hover:text-[#fffaf2] focus-visible:outline-3 focus-visible:outline-[#550000]"
      aria-label={`Edit ${expense.title}`}
      title="Edit"
    >
      <Pencil size={15} aria-hidden="true" />
    </button>
    <button
      type="button"
      onClick={() => onDelete(expense)}
      className="grid h-9 w-9 place-items-center rounded-md border-2 border-[#3d0000] text-[#3d0000] transition hover:bg-[#3d0000] hover:text-[#fffaf2] focus-visible:outline-3 focus-visible:outline-[#550000]"
      aria-label={`Hapus ${expense.title}`}
      title="Hapus"
    >
      <Trash2 size={15} aria-hidden="true" />
    </button>
  </div>
);

const ExpenseList = ({
  expenses,
  isLoading,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
}: ExpenseListProps) => (
  <section className="mt-10" aria-labelledby="expense-list-heading">
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
          Ledger
        </p>
        <h2
          id="expense-list-heading"
          className="text-3xl font-black tracking-[-0.06em]"
        >
          Daftar Pengeluaran
        </h2>
      </div>
      {!isLoading && (
        <span className="border-2 border-[#241a1a] bg-[#ead6d1] px-2 py-1 text-[10px] font-black uppercase">
          {expenses.length} catatan
        </span>
      )}
    </div>
    <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] shadow-[6px_6px_0_#241a1a]">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }, (_, index) => (
            <ExpenseSkeleton key={index} />
          ))}
        </>
      ) : expenses.length === 0 ? (
        <EmptyState onAdd={onAdd} />
      ) : (
        <>
          <div className="hidden grid-cols-[.8fr_1.5fr_1fr_.9fr_.8fr_auto] gap-4 border-b-[3px] border-[#241a1a] bg-[#ead6d1] px-5 py-3 text-[10px] font-black uppercase tracking-wide md:grid">
            <span>Tanggal</span>
            <span>Pengeluaran</span>
            <span>Kategori</span>
            <span>Nominal</span>
            <span>Dicatat oleh</span>
            <span className="sr-only">Aksi</span>
          </div>
          <div>
            {expenses.map((expense) => (
              <div
                key={expense.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(expense)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    onSelect(expense);
                }}
                className="cursor-pointer border-b-2 border-[#ddd0c7] px-4 py-4 transition hover:bg-[#f8eee9] last:border-b-0 md:grid md:grid-cols-[.8fr_1.5fr_1fr_.9fr_.8fr_auto] md:items-center md:gap-4 md:px-5"
              >
                <span className="flex items-center gap-1 text-sm text-[#6f6262]">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatExpenseDate(expense.spent_at, "short")}
                </span>
                <div className="mt-3 md:mt-0">
                  <p className="font-black">{expense.title}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-[#6f6262]">
                    {expense.description || "Tanpa deskripsi"}
                  </p>
                </div>
                <span className="mt-3 w-fit border-2 border-[#550000] px-2 py-1 text-[10px] font-black uppercase text-[#550000] md:mt-0">
                  {expense.category}
                </span>
                <span className="mt-3 block font-black text-[#550000] md:mt-0">
                  {formatExpenseAmount(expense.amount)}
                </span>
                <span className="mt-1 block text-sm text-[#6f6262] md:mt-0">
                  {expense.profile?.username ?? "Tidak diketahui"}
                </span>
                <div className="mt-4 flex items-center justify-between gap-3 md:mt-0 md:justify-end">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(expense);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#550000] md:hidden"
                  >
                    <Eye size={14} aria-hidden="true" /> Detail
                  </button>
                  <ExpenseActions
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </section>
);

export default ExpenseList;
