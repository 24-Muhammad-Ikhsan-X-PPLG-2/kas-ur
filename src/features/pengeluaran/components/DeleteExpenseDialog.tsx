"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/features/admin/components/Modal";
import { Expense } from "../type";

type DeleteExpenseDialogProps = {
  expense: Expense;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteExpenseDialog = ({
  expense,
  onClose,
  onConfirm,
}: DeleteExpenseDialogProps) => (
  <Modal
    title="Hapus pengeluaran?"
    description={`Pengeluaran "${expense.title}" akan dihapus dari daftar.`}
    onClose={onClose}
  >
    <div className="flex items-start gap-3 border-2 border-[#241a1a] bg-[#f4e4df] p-4 text-sm leading-relaxed">
      <AlertTriangle
        className="shrink-0 text-[#3d0000]"
        size={20}
        aria-hidden="true"
      />
      <span>
        Data pengeluaran ini akan dihapus secara permanen dari catatan kas.
      </span>
    </div>
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="min-h-11 rounded-md border-[3px] border-[#241a1a] px-4 text-sm font-black transition hover:bg-[#ead6d1] focus-visible:outline-3 focus-visible:outline-[#550000]"
      >
        Batal
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#3d0000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
      >
        Hapus Pengeluaran
      </button>
    </div>
  </Modal>
);

export default DeleteExpenseDialog;
