"use client";

import { CalendarDays } from "lucide-react";
import { ScheduleItemProps } from "../type";

// Menampilkan satu periode beserta status pembayaran aktualnya.
const ScheduleItem = ({ period, amount, status }: ScheduleItemProps) => {
  const isPaid = status === "Sudah lunas";
  const statusClassName = isPaid
    ? "border-[#3f6b4a] text-[#3f6b4a]"
    : "border-[#550000] text-[#550000]";

  return (
    <article className="rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-4 shadow-[5px_5px_0_#241a1a]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
          <CalendarDays size={18} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span
          className={`border-2 px-2 py-1 text-[10px] font-black uppercase tracking-wide ${statusClassName}`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm font-extrabold">{period}</p>
      <p className="mt-2 text-xl font-black tracking-tight text-[#550000]">
        {amount}
      </p>
    </article>
  );
};
export default ScheduleItem;
