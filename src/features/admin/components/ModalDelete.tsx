"use client";

import { dateRange } from "@/utils/client";
import Modal from "./Modal";
import { FC } from "react";
import { CashPeriod } from "../type";
import { AlertTriangle } from "lucide-react";

type Props = {
  setModal: (v: "config" | "period" | "delete" | null) => void;
  deletePeriod: () => void;
  editingPeriod: CashPeriod;
};

const ModalDelete: FC<Props> = ({ deletePeriod, setModal, editingPeriod }) => {
  return (
    <Modal
      title="Hapus periode ini?"
      description={`Periode ${dateRange(editingPeriod)} akan dihapus dari daftar periode kas.`}
      onClose={() => setModal(null)}
    >
      <div className="flex items-start gap-3 border-2 border-[#171416] bg-[#f3e1df] p-4 text-sm leading-relaxed">
        <AlertTriangle className="shrink-0 text-[#59142e]" size={20} />
        <span>Data ini hanya akan dihapus dari tampilan mock.</span>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setModal(null)}
          className="min-h-11 rounded-md border-[3px] border-[#171416] px-4 text-sm font-black"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={deletePeriod}
          className="min-h-11 rounded-md border-[3px] border-[#171416] bg-[#59142e] px-4 text-sm font-black text-[#fffaf3] shadow-[4px_4px_0_#171416]"
        >
          Hapus Periode
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
