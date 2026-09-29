"use client";

import { ArrowRight, ReceiptText } from "lucide-react";
import Link from "next/link";

const ExpenseSection = () => (
  <section
    className="relative mt-8 overflow-hidden rounded-xl border-[3px] border-[#241a1a] bg-[#ead6d1] p-6 shadow-[8px_8px_0_#241a1a] sm:p-7"
    aria-labelledby="expense-heading"
  >
    <div
      className="absolute -right-8 -top-8 h-28 w-28 rotate-12 border-[3px] border-[#241a1a] bg-[#550000]"
      aria-hidden="true"
    />
    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#241a1a] bg-[#fffaf2] text-[#550000] shadow-[3px_3px_0_#241a1a]">
          <ReceiptText size={23} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div>
          <p className="mb-2 font-mono text-xs font-black uppercase tracking-[0.12em] text-[#550000]">
            Expense desk
          </p>
          <h2
            id="expense-heading"
            className="text-2xl font-black tracking-[-0.06em] sm:text-3xl"
          >
            Atur pengeluaran kas
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6f6262]">
            Catat dan pantau penggunaan uang kas kelas dari satu halaman.
          </p>
        </div>
      </div>
      <Link
        href="/bendahara/pengeluaran"
        className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-5 text-sm font-black text-[#fffaf2] shadow-[5px_5px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
      >
        Kelola pengeluaran
        <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export default ExpenseSection;
