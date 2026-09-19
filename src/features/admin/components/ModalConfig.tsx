"use client";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Modal from "./Modal";
import FormError from "./FormError";
import { AlertTriangle } from "lucide-react";
import { FC } from "react";
import { CashConfigValues } from "../schema";

type Props = {
  setModal: (v: "config" | "period" | "delete" | null) => void;
  configForm: UseFormReturn<
    {
      amount: unknown;
      period: "weekly" | "monthly";
      isActive: boolean;
    },
    unknown,
    {
      amount: number;
      period: "weekly" | "monthly";
      isActive: boolean;
    }
  >;
  onConfigSubmit: SubmitHandler<CashConfigValues>;
};

const ModalConfig: FC<Props> = ({ configForm, setModal, onConfigSubmit }) => {
  return (
    <Modal
      title="Edit Konfigurasi Kas"
      description="Ubah aturan pembayaran kas untuk periode berikutnya."
      onClose={() => setModal(null)}
    >
      <form
        className="grid gap-5"
        onSubmit={configForm.handleSubmit(onConfigSubmit)}
        noValidate
      >
        <div>
          <label
            htmlFor="config-amount"
            className="mb-2 block text-sm font-extrabold"
          >
            Nominal Kas
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-[#7a1f3d]">
              Rp
            </span>
            <input
              id="config-amount"
              type="number"
              className="h-12 w-full rounded-md border-[3px] border-[#171416] bg-white pl-10 pr-3 text-sm font-bold outline-none focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d]"
              {...configForm.register("amount")}
            />
          </div>
          <FormError message={configForm.formState.errors.amount?.message} />
        </div>
        <div>
          <p className="mb-2 text-sm font-extrabold">Frekuensi Pembayaran</p>
          <div className="grid grid-cols-2 gap-3">
            {(["weekly", "monthly"] as const).map((period) => (
              <label key={period} className="cursor-pointer">
                <input
                  type="radio"
                  value={period}
                  className="peer sr-only"
                  {...configForm.register("period")}
                />
                <span className="block rounded-md border-[3px] border-[#171416] bg-white p-3 text-center text-sm font-black peer-checked:bg-[#7a1f3d] peer-checked:text-[#fffaf3] peer-focus-visible:outline-3 peer-focus-visible:outline-[#7a1f3d]">
                  {period === "weekly" ? "Mingguan" : "Bulanan"}
                </span>
              </label>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center justify-between rounded-md border-2 border-[#171416] p-3">
          <span>
            <span className="block text-sm font-extrabold">Status</span>
            <span className="text-xs text-[#766d6e]">Konfigurasi Aktif</span>
          </span>
          <input
            type="checkbox"
            className="h-5 w-5 accent-[#7a1f3d]"
            {...configForm.register("isActive")}
          />
        </label>
        <div className="flex items-start gap-3 border-2 border-[#171416] bg-[#f3e1df] p-3 text-xs leading-relaxed">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#7a1f3d]" />{" "}
          <span>
            <b>Perhatian:</b> perubahan konfigurasi dapat memengaruhi periode
            kas berikutnya.
          </span>
        </div>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setModal(null)}
            className="min-h-11 rounded-md border-[3px] border-[#171416] px-4 text-sm font-black"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={configForm.formState.isSubmitting}
            className="min-h-11 rounded-md border-[3px] border-[#171416] bg-[#7a1f3d] px-4 text-sm font-black text-[#fffaf3] shadow-[4px_4px_0_#171416] disabled:cursor-wait disabled:opacity-70"
          >
            {configForm.formState.isSubmitting
              ? "Menyimpan..."
              : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalConfig;
