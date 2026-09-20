"use client";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { CashPeriod } from "../type";
import FormError from "./FormError";
import Modal from "./Modal";
import { FC } from "react";
import { CashPeriodValues } from "../schema";

type Props = {
  editingPeriod: CashPeriod | null;
  setModal: (v: "config" | "period" | "delete" | null) => void;
  periodForm: UseFormReturn<
    {
      startDate: string;
      endDate: string;
      amount: unknown;
    },
    unknown,
    {
      startDate: string;
      endDate: string;
      amount: number;
    }
  >;
  onPeriodSubmit: SubmitHandler<CashPeriodValues>;
};

const ModalPeriod: FC<Props> = ({
  editingPeriod,
  periodForm,
  setModal,
  onPeriodSubmit,
}) => {
  return (
    <Modal
      title={editingPeriod ? "Edit Periode Kas" : "Tambah Periode Kas"}
      description="Tentukan rentang tanggal dan nominal periode kas."
      onClose={() => setModal(null)}
    >
      <form
        className="grid gap-5"
        onSubmit={periodForm.handleSubmit(onPeriodSubmit)}
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="start-date"
              className="mb-2 block text-sm font-extrabold"
            >
              Tanggal Mulai
            </label>
            <input
              id="start-date"
              type="date"
              className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              {...periodForm.register("startDate")}
            />
            <FormError
              message={periodForm.formState.errors.startDate?.message}
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="mb-2 block text-sm font-extrabold"
            >
              Tanggal Selesai
            </label>
            <input
              id="end-date"
              type="date"
              className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              {...periodForm.register("endDate")}
            />
            <FormError message={periodForm.formState.errors.endDate?.message} />
          </div>
        </div>
        <div>
          <label
            htmlFor="period-amount"
            className="mb-2 block text-sm font-extrabold"
          >
            Nominal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-[#550000]">
              Rp
            </span>
            <input
              id="period-amount"
              type="number"
              className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white pl-10 pr-3 text-sm font-bold outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              {...periodForm.register("amount")}
            />
          </div>
          <FormError message={periodForm.formState.errors.amount?.message} />
        </div>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setModal(null)}
            className="min-h-11 rounded-md border-[3px] border-[#241a1a] px-4 text-sm font-black"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={periodForm.formState.isSubmitting}
            className="min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a] disabled:cursor-wait disabled:opacity-70"
          >
            {periodForm.formState.isSubmitting
              ? "Menyimpan..."
              : editingPeriod
                ? "Simpan Perubahan"
                : "Tambah Periode"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPeriod;
