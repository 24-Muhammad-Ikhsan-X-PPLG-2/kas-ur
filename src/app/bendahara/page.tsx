import BendaharaClient, {
  Member,
  PaymentRecord,
  Period,
  SummaryData,
} from "@/features/bendahara/client";
import { createClient } from "@/supabase/server";
import { money } from "@/utils/client";
import { getProfile } from "@/utils/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bendahara | Kas XI PPLG 2",
  description: "Dashboard pencatatan pembayaran kas XI PPLG 2.",
};

function getLabel(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = end.toLocaleDateString("id-ID", {
    month: "long",
  });

  return `${start.getDate()}-${end.getDate()} ${month} ${end.getFullYear()}`;
}
function getShortLabel(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = end.toLocaleDateString("id-ID", {
    month: "short",
  });

  return `${start.getDate()}-${end.getDate()} ${month}`;
}

const BendaharaPage = async () => {
  const user = await getProfile();
  if (!user) {
    redirect("/login");
  }
  if (user.role === "anggota") {
    redirect("/");
  }
  const supabase = await createClient();
  const { data: dataCashPeriods } = await supabase
    .from("cash_periods")
    .select("*");
  const { data: dataMember } = await supabase.from("member").select("*");
  const { data: dataCashPayments } = await supabase.from("cash_payments")
    .select(`
      *,
      cash_periods:period_id (
        *
      ),
      member:member_id (
        name
      )
    `);
  const periods: Period[] =
    dataCashPeriods?.map((period) => ({
      id: period.id,
      amount: money(period.amount),
      label: getLabel(period.start_date, period.end_date),
      shortLabel: getShortLabel(period.start_date, period.end_date),
    })) ?? [];
  const member: Member[] =
    dataMember?.map((anggota) => ({
      id: anggota.id,
      name: anggota.name,
    })) ?? [];
  const paymentsRecord: PaymentRecord[] =
    dataCashPayments?.map((item) => ({
      id: item.id,
      memberId: item.member_id,
      periodId: item.period_id,
      amount: item.amount,
      period: getShortLabel(
        item.cash_periods.start_date,
        item.cash_periods.end_date,
      ),
      date: item.paid_at,
      member: item.member.name,
    })) ?? [];
  const today = new Date();
  const paymentsToday =
    dataCashPayments?.filter((payment) => {
      const paidAt = new Date(payment.paid_at);
      return (
        paidAt.getFullYear() === today.getFullYear() &&
        paidAt.getMonth() === today.getMonth() &&
        paidAt.getDate() === today.getDate()
      );
    }).length ?? 0;
  const paidMemberIds = new Set(
    dataCashPayments?.map((payment) => payment.member_id) ?? [],
  );
  const totalCash =
    dataCashPayments?.reduce(
      (total, payment) => total + Number(payment.amount),
      0,
    ) ?? 0;
  const summary: SummaryData = {
    paymentsToday: paymentsToday.toString(),
    paidMembers: paidMemberIds.size.toString(),
    unpaidMembers: Math.max(
      (dataMember?.length ?? 0) - paidMemberIds.size,
      0,
    ).toString(),
    totalCash: money(totalCash),
  };
  return (
    <BendaharaClient
      paymentsRecord={paymentsRecord}
      memberFromServer={member}
      periodsFromServer={periods}
      summary={summary}
    />
  );
};

export default BendaharaPage;
