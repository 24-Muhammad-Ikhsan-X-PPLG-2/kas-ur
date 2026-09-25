"use client";

import { FC } from "react";
import { PaymentScheduleItem } from "../type";
import ScheduleItem from "./ScheduleItem";

type Props = {
  paymentSchedule: PaymentScheduleItem[];
};

const SectionPaymentCheck: FC<Props> = ({ paymentSchedule }) => {
  return (
    <section className="mt-16" aria-labelledby="schedule-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
            Payment check
          </p>
          <h2
            id="schedule-heading"
            className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
          >
            Jadwal Pembayaran
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-[#6f6262] sm:block">
          {paymentSchedule.length} periode
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {paymentSchedule.map((item) => (
          <ScheduleItem key={item.period} {...item} />
        ))}
      </div>
    </section>
  );
};

export default SectionPaymentCheck;
