"use client";

import { ArrowDown, ArrowRight, CalendarDays, WalletCards } from "lucide-react";

const SystemNote = () => {
  return (
    <section
      className="mt-12 grid items-center gap-4 rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-5 shadow-[5px_5px_0_#241a1a] md:grid-cols-[1fr_auto_1fr]"
      aria-labelledby="how-heading"
    >
      <div>
        <p className="font-mono text-xs font-black uppercase tracking-[.12em] text-[#550000]">
          System note
        </p>
        <h2 id="how-heading" className="mt-1 text-xl font-black">
          Cara Kerja
        </h2>
      </div>
      <div className="flex flex-col items-center gap-2 text-center text-xs font-bold sm:flex-row">
        <div className="border-2 border-[#241a1a] bg-[#ead6d1] p-3">
          <WalletCards size={19} className="mx-auto mb-1 text-[#550000]" />
          Konfigurasi Kas
        </div>
        <ArrowRight className="hidden sm:block" size={20} />
        <ArrowDown className="sm:hidden" size={20} />
        <div className="border-2 border-[#241a1a] bg-[#ead6d1] p-3">
          <CalendarDays size={19} className="mx-auto mb-1 text-[#550000]" />
          Periode Kas
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#6f6262]">
        Konfigurasi menentukan aturan pembayaran. Periode menyimpan rentang
        tanggal dan nominalnya.
      </p>
    </section>
  );
};

export default SystemNote;
