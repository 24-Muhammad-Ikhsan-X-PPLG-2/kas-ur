"use client";

import { CalendarDays, Download, Trash2 } from "lucide-react";
import { PaymentRecord } from "../types";
import { FC, useState } from "react";
import { formatTime, money } from "@/utils/client";
import { useRouter } from "next/navigation";

type Props = {
  recentPayments: PaymentRecord[];
  onDeletePayment: (payment: PaymentRecord) => Promise<void>;
};

const PaymentHistory: FC<Props> = ({ recentPayments, onDeletePayment }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedPayments = [...recentPayments].sort((first, second) => {
    const dateDifference =
      new Date(second.date).getTime() - new Date(first.date).getTime();

    return dateDifference || second.id - first.id;
  });
  const visiblePayments = showAll ? sortedPayments : sortedPayments.slice(0, 5);
  const router = useRouter();
  const handleExportExcel = async () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/api/export-excel`);
  };

  return (
    <section className="mt-12" aria-labelledby="recent-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
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
          className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#241a1a] bg-[#fffaf2] px-3 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
          onClick={handleExportExcel}
        >
          <Download size={15} aria-hidden="true" /> <span>Export Excel</span>
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] shadow-[6px_6px_0_#241a1a]">
        <div className="hidden grid-cols-[1.1fr_1.3fr_.8fr_.7fr_.8fr_auto] gap-4 border-b-[3px] border-[#241a1a] bg-[#ead6d1] px-5 py-3 text-[10px] font-black uppercase tracking-wide md:grid">
          <span>Anggota</span>
          <span>Periode</span>
          <span>Nominal</span>
          <span>Tanggal</span>
          <span>Status</span>
          <span className="sr-only">Aksi</span>
        </div>
        {visiblePayments.map((payment) => (
          <div
            key={payment.id}
            className="grid gap-3 border-b-2 border-[#ddd0c7] px-4 py-4 last:border-b-0 md:grid-cols-[1.1fr_1.3fr_.8fr_.7fr_.8fr_auto] md:items-center md:gap-4 md:px-5"
          >
            <span className="font-black">{payment.member}</span>
            <span className="text-sm text-[#6f6262]">{payment.period}</span>
            <span className="font-black text-[#550000]">{payment.amount}</span>
            <span className="flex items-center gap-1 text-sm text-[#6f6262]">
              <CalendarDays size={14} aria-hidden="true" />
              {formatTime(payment.date)}
            </span>
            <span className="w-fit border-2 border-[#550000] px-2 py-1 text-[10px] font-black uppercase text-[#550000]">
              {5000 > Number(payment.amount) ? "Nunggak" : "Tercatat"}
            </span>
            <button
              type="button"
              title={`Hapus pembayaran ${payment.member}`}
              aria-label={`Hapus pembayaran ${payment.member} untuk ${payment.period}`}
              onClick={() => {
                if (
                  window.confirm(
                    `Hapus pembayaran ${payment.member} untuk periode ${payment.period}?`,
                  )
                ) {
                  void onDeletePayment(payment);
                }
              }}
              className="flex min-h-10 w-fit items-center gap-2 rounded-md border-2 border-[#550000] px-3 text-xs font-black text-[#550000] transition hover:bg-[#550000] hover:text-[#fffaf2] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
            >
              <Trash2 size={15} aria-hidden="true" />
              <span className="md:hidden">Hapus pembayaran</span>
            </button>
          </div>
        ))}
      </div>
      {recentPayments.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="min-h-10 rounded-md border-2 border-[#241a1a] bg-[#fffaf2] px-4 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
          >
            {showAll ? "Tampilkan lebih sedikit" : "Tampilkan semua"}
          </button>
        </div>
      )}
    </section>
  );
};
export default PaymentHistory;
