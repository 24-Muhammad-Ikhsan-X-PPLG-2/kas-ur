"use client";

import { Info } from "lucide-react";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import BendaharaFooter from "./BendaharaFooter";
import BendaharaHeader from "./BendaharaHeader";
import BendaharaNavbar from "./BendaharaNavbar";
import MemberPaymentStatus from "./MemberPaymentStatus";
import PaymentEntryForm from "./PaymentEntryForm";
import PaymentHistory from "./PaymentHistory";
import SemesterPaymentEntry from "./SemesterPaymentEntry";
import SummaryCard from "./SummaryCard";
import { PaymentFormValues } from "../schema";
import { Member, PaymentRecord, Period, SummaryData } from "../types";

type Props = {
  periods: Period[];
  members: Member[];
  recentPayments: PaymentRecord[];
  summary: SummaryData;
  form: UseFormReturn<PaymentFormValues>;
  onSubmit: (data: PaymentFormValues) => Promise<void>;
  onSubmitSemester: (input: {
    memberId: string;
    periods: Period[];
  }) => Promise<boolean>;
};

const BendaharaPage: FC<Props> = ({
  periods,
  members,
  recentPayments,
  summary,
  form,
  onSubmit,
  onSubmitSemester,
}) => (
  <main className="min-h-screen overflow-x-hidden bg-[#f8f2e8] text-[#171416]">
    <BendaharaNavbar />
    <div className="mx-auto max-w-300 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
      <BendaharaHeader />

      <section
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Ringkasan kas"
      >
        <SummaryCard
          label="Pembayaran Hari Ini"
          value={summary.paymentsToday}
          accent
        />
        <SummaryCard label="Sudah Bayar" value={summary.paidMembers} />
        <SummaryCard label="Belum Bayar" value={summary.unpaidMembers} accent />
        <SummaryCard label="Total Kas" value={summary.totalCash} />
      </section>

      <PaymentEntryForm
        members={members}
        periods={periods}
        form={form}
        onSubmit={onSubmit}
      />
      <SemesterPaymentEntry
        members={members}
        periods={periods}
        recentPayments={recentPayments}
        onSubmitSemester={onSubmitSemester}
      />
      <PaymentHistory recentPayments={recentPayments} />
      <MemberPaymentStatus member={members} />

      <div className="mt-10 flex items-center gap-3 border-2 border-dashed border-[#b9aaa1] p-4 text-sm text-[#766d6e]">
        <Info
          size={18}
          className="shrink-0 text-[#7a1f3d]"
          aria-hidden="true"
        />
        <span>
          Data pada halaman ini masih berupa tampilan mock untuk dashboard
          bendahara.
        </span>
      </div>
    </div>
    <BendaharaFooter />
  </main>
);

export default BendaharaPage;
