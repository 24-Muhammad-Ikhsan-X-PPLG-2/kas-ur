"use client";

import { X } from "lucide-react";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  onClose: () => void;
};

const Modal = ({ children, title, description, onClose }: ModalProps) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-[#241a1a]/60 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[9px_9px_0_#241a1a] sm:p-8">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#550000]">
            Admin action
          </p>
          <h2
            id="modal-title"
            className="text-3xl font-black tracking-[-0.07em]"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm text-[#6f6262]">{description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000] shadow-[3px_3px_0_#241a1a] focus-visible:outline-3 focus-visible:outline-[#550000]"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
