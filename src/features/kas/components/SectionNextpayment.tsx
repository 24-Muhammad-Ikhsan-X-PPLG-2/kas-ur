"use client";

import { FC } from "react";
import { NextPayment } from "../type";
import { CalendarDays, Clock3, WalletCards } from "lucide-react";

type Props = {
  nextPayment: NextPayment | null;
};

const SectionNextpayment: FC<Props> = ({ nextPayment }) => {
  return (
    <section
      className="relative overflow-hidden rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-8 lg:p-10"
      aria-labelledby="next-payment-heading"
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rotate-12 border-[3px] border-[#241a1a] bg-[#550000] sm:h-36 sm:w-36"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <p
              className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#6f6262]"
              id="next-payment-heading"
            >
              {nextPayment ? "Pembayaran berikutnya" : "Status pembayaran"}
            </p>
            <span className="bg-[#550000] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#fffaf2]">
              {nextPayment ? "Belum lunas" : "Semua lunas"}
            </span>
          </div>
          <p className="text-[4rem] font-black leading-none tracking-[-0.09em] text-[#550000] sm:text-7xl">
            {nextPayment?.amount ?? "Lunas"}
          </p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold sm:gap-7">
            {nextPayment && (
              <span className="flex items-center gap-2">
                <CalendarDays size={18} aria-hidden="true" />
                {nextPayment.period}
              </span>
            )}
            <span className="flex items-center gap-2">
              <WalletCards size={18} aria-hidden="true" /> Kas kelas
            </span>
          </div>
        </div>
        <div className="max-w-[240px] border-l-4 border-[#550000] pl-4 sm:mt-12">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
            <Clock3 size={16} aria-hidden="true" /> Batas pembayaran
          </p>
          <p className="mt-2 text-lg font-black">
            {nextPayment?.dueDate ?? "Tidak ada tunggakan"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6f6262]">
            Yuk, jangan sampai lupa bayar kas minggu ini.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionNextpayment;
