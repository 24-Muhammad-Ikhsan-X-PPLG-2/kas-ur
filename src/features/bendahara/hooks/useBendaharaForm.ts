"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase } from "@/supabase/client";
import { money } from "@/utils/client";
import { PaymentFormValues, paymentSchema } from "../schema";
import { Member, PaymentRecord, Period, SummaryData } from "../types";

type UseBendaharaFormProps = {
  periodsFromServer: Period[];
  memberFromServer: Member[];
  paymentsRecord: PaymentRecord[];
  summary: SummaryData;
};

type SemesterPaymentInput = {
  memberId: string;
  periods: Period[];
};

function getNowDate(): string {
  const sekarang = new Date();

  const tanggal = String(sekarang.getDate()).padStart(2, "0");
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const tahun = sekarang.getFullYear();

  return `${tahun}-${bulan}-${tanggal}`;
}

function isSamePayment(
  payment: PaymentRecord,
  memberId: string,
  periodId: number,
) {
  return (
    String(payment.memberId) === String(memberId) &&
    Number(payment.periodId) === Number(periodId)
  );
}

function getSummary(
  payments: PaymentRecord[],
  memberCount: number,
): SummaryData {
  const today = getNowDate();
  const paidMemberIds = new Set(
    payments.map((payment) => String(payment.memberId)),
  );
  const totalCash = payments.reduce(
    (total, payment) =>
      total + Number(String(payment.amount).replace(/[^0-9]/g, "")),
    0,
  );

  return {
    paymentsToday: payments
      .filter((payment) => payment.date.slice(0, 10) === today)
      .length.toString(),
    paidMembers: paidMemberIds.size.toString(),
    unpaidMembers: Math.max(memberCount - paidMemberIds.size, 0).toString(),
    totalCash: money(totalCash),
  };
}

export const useBendaharaForm = ({
  periodsFromServer,
  memberFromServer,
  paymentsRecord,
}: UseBendaharaFormProps) => {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paidAt: getNowDate(), note: "" },
    mode: "onBlur",
  });
  const [periods] = useState<Period[]>(periodsFromServer);
  const [members] = useState<Member[]>(memberFromServer);
  const [recentPayments, setRecentPayments] =
    useState<PaymentRecord[]>(paymentsRecord);
  const summary = getSummary(recentPayments, members.length);

  const onSubmit = async (data: PaymentFormValues) => {
    const toastId = toast.loading("Bentaran...");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { data: exists } = await supabase
        .from("cash_payments")
        .select("id")
        .eq("period_id", data.periodId)
        .eq("member_id", data.memberId)
        .maybeSingle();

      if (exists) {
        const { error: errorUpdate } = await supabase
          .from("cash_payments")
          .update({
            amount: data.amount,
            recorded_by: user.id,
          })
          .eq("id", exists.id);
        if (errorUpdate) {
          toast.update(toastId, {
            render: errorUpdate.message,
            isLoading: false,
            autoClose: 3000,
            type: "error",
          });
          console.error(errorUpdate);
          return;
        }
      } else {
        const { error } = await supabase
          .from("cash_payments")
          .insert({
            period_id: data.periodId,
            member_id: data.memberId,
            amount: Number(data.amount),
            paid_at: new Date(data.paidAt).toISOString(),
            recorded_by: user.id,
          })
          .select("*");
        if (error) {
          toast.update(toastId, {
            render: error.message,
            isLoading: false,
            autoClose: 3000,
            type: "error",
          });
          console.error(error);
          return;
        }
      }

      toast.update(toastId, {
        render: "Oke done selesai",
        isLoading: false,
        autoClose: 3000,
        type: "success",
      });
      const member = members.find(
        (item) => String(item.id) === String(data.memberId),
      );
      const period = periods.find((item) => item.id === Number(data.periodId));
      if (member && period) {
        setRecentPayments((current) => [
          ...current.filter(
            (payment) => !isSamePayment(payment, member.id, period.id),
          ),
          {
            id: Date.now(),
            memberId: String(member.id),
            periodId: period.id,
            member: member.name,
            period: period.shortLabel,
            amount: money(Number(data.amount)),
            date: data.paidAt,
          },
        ]);
      }
      form.reset();
    } catch (error) {
      toast.update(toastId, {
        render: "Ada error ga terduga terjadi",
        isLoading: false,
        autoClose: 3000,
        type: "error",
      });
      console.error(error);
    }
  };

  const onSubmitSemester = async ({
    memberId,
    periods: selectedPeriods,
  }: SemesterPaymentInput) => {
    const toastId = toast.loading("Menyimpan pembayaran semester...");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.update(toastId, {
        render: "Sesi pengguna tidak ditemukan",
        isLoading: false,
        autoClose: 3000,
        type: "error",
      });
      return false;
    }

    try {
      await Promise.all(
        selectedPeriods.map(async (period) => {
          const { data: exists, error: findError } = await supabase
            .from("cash_payments")
            .select("id")
            .eq("period_id", period.id)
            .eq("member_id", memberId)
            .maybeSingle();

          if (findError) throw findError;

          const amount = Number(period.amount.replace(/[^0-9]/g, ""));

          if (exists) {
            const { error } = await supabase
              .from("cash_payments")
              .update({
                amount,
                recorded_by: user.id,
              })
              .eq("id", exists.id);

            if (error) throw error;
            return;
          }

          const { error } = await supabase.from("cash_payments").insert({
            period_id: period.id,
            member_id: memberId,
            amount,
            paid_at: new Date().toISOString(),
            recorded_by: user.id,
          });

          if (error) throw error;
        }),
      );

      toast.update(toastId, {
        render: `${selectedPeriods.length} pembayaran berhasil dicatat`,
        isLoading: false,
        autoClose: 3000,
        type: "success",
      });
      const member = members.find(
        (item) => String(item.id) === String(memberId),
      );
      const paidAt = new Date().toISOString();
      if (member) {
        setRecentPayments((current) => [
          ...current.filter(
            (payment) =>
              !selectedPeriods.some((period) =>
                isSamePayment(payment, member.id, period.id),
              ),
          ),
          ...selectedPeriods.map((period, index) => ({
            id: Date.now() + index,
            memberId: String(member.id),
            periodId: period.id,
            member: member.name,
            period: period.shortLabel,
            amount: period.amount,
            date: paidAt,
          })),
        ]);
      }
      return true;
    } catch (error) {
      toast.update(toastId, {
        render: "Gagal menyimpan pembayaran semester",
        isLoading: false,
        autoClose: 3000,
        type: "error",
      });
      console.error(error);
      return false;
    }
  };

  return {
    form,
    periods,
    members,
    recentPayments,
    summary,
    onSubmit,
    onSubmitSemester,
  };
};
