"use client";

import { CalendarDays, Download } from "lucide-react";
import { PaymentRecord } from "../types";
import { FC, useState } from "react";
import { formatTime } from "@/utils/client";

type Props = {
  recentPayments: PaymentRecord[];
};

const PaymentHistory: FC<Props> = ({ recentPayments }) => {
  const [showAll, setShowAll] = useState(false);
  const visiblePayments = showAll ? recentPayments : recentPayments.slice(0, 5);

  return (
    <section className="mt-12" aria-labelledby="recent-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#7a1f3d]">
            Activity log
          </p>
          <h2
            id="recent-heading"
            className="text-3xl font-black tracking-[-0.06em]"
          >
            Pembayaran Terbaru
          </h2>
        </div>
        <button
          type="button"
          className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#171416] bg-[#fffdf8] px-3 text-xs font-black shadow-[3px_3px_0_#171416] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
        >
          <Download size={15} aria-hidden="true" /> <span>Export Excel</span>
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border-[3px] border-[#171416] bg-[#fffdf8] shadow-[6px_6px_0_#171416]">
        <div className="hidden grid-cols-[1.1fr_1.3fr_.8fr_.7fr_.8fr] gap-4 border-b-[3px] border-[#171416] bg-[#e6c1cc] px-5 py-3 text-[10px] font-black uppercase tracking-wide md:grid">
          <span>Anggota</span>
          <span>Periode</span>
          <span>Nominal</span>
          <span>Tanggal</span>
          <span>Status</span>
        </div>
        {visiblePayments.map((payment) => (
          <div
            key={`${payment.member}-${payment.date}`}
            className="grid gap-3 border-b-2 border-[#ded5ca] px-4 py-4 last:border-b-0 md:grid-cols-[1.1fr_1.3fr_.8fr_.7fr_.8fr] md:items-center md:gap-4 md:px-5"
          >
            <span className="font-black">{payment.member}</span>
            <span className="text-sm text-[#766d6e]">{payment.period}</span>
            <span className="font-black text-[#7a1f3d]">{payment.amount}</span>
            <span className="flex items-center gap-1 text-sm text-[#766d6e]">
              <CalendarDays size={14} aria-hidden="true" />
              {formatTime(payment.date)}
            </span>
            <span className="w-fit border-2 border-[#7a1f3d] px-2 py-1 text-[10px] font-black uppercase text-[#7a1f3d]">
              {5000 > Number(payment.amount) ? "Nunggak" : "Tercatat"}
            </span>
          </div>
        ))}
      </div>
      {recentPayments.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="min-h-10 rounded-md border-2 border-[#171416] bg-[#fffdf8] px-4 text-xs font-black shadow-[3px_3px_0_#171416] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
          >
            {showAll ? "Tampilkan lebih sedikit" : "Tampilkan semua"}
          </button>
        </div>
      )}
    </section>
  );
};
export default PaymentHistory;
