"use client";

import { useState } from "react";
import { PaymentRecord, Period } from "../types";

type UseSemesterPaymentEntryProps = {
  periods: Period[];
  recentPayments: PaymentRecord[];
  onSubmitSemester: (input: {
    memberId: string;
    periods: Period[];
  }) => Promise<boolean>;
  onDeletePayment: (payment: PaymentRecord) => Promise<void>;
};

export const paymentKey = (
  memberId: string | number,
  periodId: string | number,
) => `${String(memberId)}:${Number(periodId)}`;

export const useSemesterPaymentEntry = ({
  periods,
  recentPayments,
  onSubmitSemester,
  onDeletePayment,
}: UseSemesterPaymentEntryProps) => {
  const [memberId, setMemberId] = useState("");
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);
  const [anchorPeriodId, setAnchorPeriodId] = useState<number | null>(null);
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paidPeriodKeys = new Set(
    recentPayments.map((payment) =>
      paymentKey(payment.memberId, payment.periodId),
    ),
  );
  const unpaidPeriods = periods.filter(
    (period) => !paidPeriodKeys.has(paymentKey(memberId, period.id)),
  );
  const allPeriodsSelected =
    unpaidPeriods.length > 0 &&
    unpaidPeriods.every((period) => selectedPeriods.includes(period.id));
  const periodGroups = periods.reduce<Map<string, Period[]>>(
    (groups, period) => {
      const group = groups.get(period.monthKey) ?? [];
      group.push(period);
      groups.set(period.monthKey, group);
      return groups;
    },
    new Map(),
  );

  const handleMemberChange = (nextMemberId: string) => {
    setMemberId(nextMemberId);
    setSelectedPeriods([]);
    setAnchorPeriodId(null);
    setIsRangeMode(false);
  };

  const handlePeriodChange = (periodId: number, periodIndex: number) => {
    const paidPayment = recentPayments.find(
      (payment) =>
        paymentKey(payment.memberId, payment.periodId) ===
        paymentKey(memberId, periodId),
    );

    if (paidPayment) {
      if (
        window.confirm(
          `Hapus pembayaran ${paidPayment.member} untuk periode ${paidPayment.period}?`,
        )
      ) {
        void onDeletePayment(paidPayment);
      }
      return;
    }

    const anchorIndex = periods.findIndex(
      (period) => period.id === anchorPeriodId,
    );

    if (isRangeMode && anchorIndex !== -1) {
      const start = Math.min(anchorIndex, periodIndex);
      const end = Math.max(anchorIndex, periodIndex);
      const rangeIds = periods
        .slice(start, end + 1)
        .filter(
          (period) => !paidPeriodKeys.has(paymentKey(memberId, period.id)),
        )
        .map((period) => period.id);

      setSelectedPeriods((current) => [...new Set([...current, ...rangeIds])]);
      setAnchorPeriodId(null);
      setIsRangeMode(false);
      return;
    }

    setAnchorPeriodId(periodId);
    if (isRangeMode) {
      setSelectedPeriods((current) =>
        current.includes(periodId) ? current : [...current, periodId],
      );
      return;
    }

    setSelectedPeriods((current) =>
      current.includes(periodId)
        ? current.filter((id) => id !== periodId)
        : [...current, periodId],
    );
  };

  const toggleAllPeriods = () => {
    setSelectedPeriods(
      allPeriodsSelected ? [] : unpaidPeriods.map((period) => period.id),
    );
  };

  const toggleRangeMode = () => {
    setIsRangeMode((current) => !current);
    setAnchorPeriodId(null);
  };

  const handleSubmit = async () => {
    if (!memberId || selectedPeriods.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmitSemester({
      memberId,
      periods: periods.filter((period) => selectedPeriods.includes(period.id)),
    });
    setIsSubmitting(false);

    if (success) {
      setMemberId("");
      setSelectedPeriods([]);
      setAnchorPeriodId(null);
      setIsRangeMode(false);
    }
  };

  return {
    memberId,
    selectedPeriods,
    isRangeMode,
    isSubmitting,
    paidPeriodKeys,
    unpaidPeriods,
    allPeriodsSelected,
    periodGroups,
    handleMemberChange,
    handlePeriodChange,
    toggleAllPeriods,
    toggleRangeMode,
    handleSubmit,
  };
};
