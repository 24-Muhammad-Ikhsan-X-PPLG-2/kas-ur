"use client";

import { Check, Plus } from "lucide-react";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import SelectField from "./SelectField";
import { PaymentFormValues } from "../schema";
import { Member, Period } from "../types";

type Props = {
  members: Member[];
  periods: Period[];
  form: UseFormReturn<PaymentFormValues>;
  onSubmit: (data: PaymentFormValues) => Promise<void>;
};

const PaymentEntryForm: FC<Props> = ({ members, periods, form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <section
      className="mt-12 max-w-3xl rounded-xl border-[3px] border-[#171416] bg-[#fffdf8] p-6 shadow-[8px_8px_0_#171416] sm:p-9"
      aria-labelledby="form-heading"
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#7a1f3d]">
            Payment desk
          </p>
          <h2
            id="form-heading"
            className="text-3xl font-black tracking-[-.06em]"
          >
            Catat Pembayaran
          </h2>
          <p className="mt-2 text-sm text-[#766d6e]">
            Masukkan pembayaran kas anggota yang sudah diterima.
          </p>
        </div>
        <span className="hidden rounded-md border-2 border-[#171416] bg-[#e6c1cc] p-2 text-[#7a1f3d] sm:block">
          <Plus size={20} aria-hidden="true" />
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <SelectField
          id="memberId"
          label="Nama Anggota"
          error={errors.memberId?.message}
          {...register("memberId")}
        >
          <option value="">Pilih anggota</option>
          {members.map((member) => (
            <option value={member.id} key={member.id}>
              {member.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="periodId"
          label="Periode Kas"
          error={errors.periodId?.message}
          {...register("periodId")}
        >
          <option value="">Pilih periode</option>
          {periods.map((period) => (
            <option value={period.id} key={period.id}>
              {period.label}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="amountId"
          label="Nominal"
          error={errors.amount?.message}
          {...register("amount")}
        >
          <option value="">Pilih Nominal</option>
          <option value="1000">Rp1.000</option>
          <option value="2000">Rp2.000</option>
          <option value="3000">Rp3.000</option>
          <option value="4000">Rp4.000</option>
          <option value="5000">Rp5.000</option>
        </SelectField>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="paidAt"
              className="mb-2 block text-sm font-extrabold"
            >
              Tanggal Pembayaran
            </label>
            <input
              id="paidAt"
              type="date"
              className={`h-12 w-full rounded-md border-[3px] border-[#171416] bg-white px-3 text-sm outline-none focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d] ${errors.paidAt ? "border-[#59142e]" : ""}`}
              {...register("paidAt")}
            />
            {errors.paidAt && (
              <p className="mt-1.5 text-xs font-bold text-[#59142e]">
                ! {errors.paidAt.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="note" className="mb-2 block text-sm font-extrabold">
              Catatan{" "}
              <span className="font-normal text-[#766d6e]">(opsional)</span>
            </label>
            <textarea
              id="note"
              rows={2}
              placeholder="Contoh: Bayar langsung ke bendahara"
              className="w-full resize-none rounded-md border-[3px] border-[#171416] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d]"
              {...register("note")}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex min-h-14 items-center justify-center gap-2 rounded-md border-[3px] border-[#171416] bg-[#7a1f3d] font-black text-[#fffaf3] shadow-[6px_6px_0_#171416] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[3px_3px_0_#171416] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none disabled:cursor-wait disabled:opacity-75 focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
        >
          <Check size={18} aria-hidden="true" />
          {isSubmitting ? "Menyimpan..." : "Catat Pembayaran"}
        </button>
      </form>
    </section>
  );
};

export default PaymentEntryForm;
