"use client";

import { CalendarDays, Tag, UserRound, WalletCards } from "lucide-react";
import Modal from "@/features/admin/components/Modal";
import { Expense } from "../type";
import { formatExpenseAmount, formatExpenseDate } from "../utils";

type ExpenseDetailDialogProps = { expense: Expense; onClose: () => void };

const ExpenseDetailDialog = ({
  expense,
  onClose,
}: ExpenseDetailDialogProps) => (
  <Modal
    title="Detail Pengeluaran"
    description="Rincian catatan penggunaan kas kelas."
    onClose={onClose}
  >
    <div className="border-2 border-[#241a1a] bg-[#ead6d1] p-4">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#550000]">
        {expense.category}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-[-0.06em]">
        {expense.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6f6262]">
        {expense.description || "Tidak ada deskripsi untuk pengeluaran ini."}
      </p>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="border-2 border-[#ddd0c7] bg-[#fffaf2] p-4">
        <WalletCards
          size={18}
          className="mb-3 text-[#550000]"
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-wide text-[#6f6262]">
          Nominal
        </p>
        <p className="mt-1 text-xl font-black text-[#550000]">
          {formatExpenseAmount(expense.amount)}
        </p>
      </div>
      <div className="border-2 border-[#ddd0c7] bg-[#fffaf2] p-4">
        <Tag size={18} className="mb-3 text-[#550000]" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-wide text-[#6f6262]">
          Kategori
        </p>
        <p className="mt-1 font-black">{expense.category}</p>
      </div>
      <div className="border-2 border-[#ddd0c7] bg-[#fffaf2] p-4">
        <CalendarDays
          size={18}
          className="mb-3 text-[#550000]"
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-wide text-[#6f6262]">
          Tanggal Pengeluaran
        </p>
        <p className="mt-1 font-black">{formatExpenseDate(expense.spent_at)}</p>
      </div>
      <div className="border-2 border-[#ddd0c7] bg-[#fffaf2] p-4">
        <UserRound
          size={18}
          className="mb-3 text-[#550000]"
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-wide text-[#6f6262]">
          Dicatat Oleh
        </p>
        <p className="mt-1 font-black">
          {expense.profile?.username ?? "Tidak diketahui"}
        </p>
      </div>
    </div>
    <p className="mt-5 text-xs text-[#6f6262]">
      Dibuat pada{" "}
      {new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(expense.created_at))}
    </p>
  </Modal>
);

export default ExpenseDetailDialog;
