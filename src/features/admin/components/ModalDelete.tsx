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
      <div className="flex items-start gap-3 border-2 border-[#241a1a] bg-[#f4e4df] p-4 text-sm leading-relaxed">
        <AlertTriangle className="shrink-0 text-[#3d0000]" size={20} />
        <span>Data ini hanya akan dihapus dari tampilan mock.</span>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setModal(null)}
          className="min-h-11 rounded-md border-[3px] border-[#241a1a] px-4 text-sm font-black"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={deletePeriod}
          className="min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#3d0000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a]"
        >
          Hapus Periode
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
