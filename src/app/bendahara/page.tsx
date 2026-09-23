import BendaharaClient, {
  Member,
  PaymentRecord,
  Period,
  SummaryData,
} from "@/features/bendahara/client";
import { createClient } from "@/supabase/server";
import { money } from "@/utils/client";
import { getProfile } from "@/utils/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bendahara | Kas XI PPLG 2",
  description: "Dashboard pencatatan pembayaran kas XI PPLG 2.",
};

type PaymentRow = {
  id: number;
  member_id: string;
  period_id: number;
  amount: number;
  paid_at: string;
  cash_periods: {
    start_date: string;
    end_date: string;
  };
  member: {
    name: string;
  };
};

// Membuat label periode dengan nama bulan lengkap.
function getPeriodLabel(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const startMonth = start.toLocaleDateString("id-ID", { month: "long" });
  const endMonth = end.toLocaleDateString("id-ID", { month: "long" });

  if (
    start.getMonth() !== end.getMonth() ||
    start.getFullYear() !== end.getFullYear()
  ) {
    return `${start.getDate()} ${startMonth} ${start.getFullYear()} - ${end.getDate()} ${endMonth} ${end.getFullYear()}`;
  }

  return `${start.getDate()}-${end.getDate()} ${endMonth} ${end.getFullYear()}`;
}

// Membuat label periode ringkas untuk riwayat pembayaran.
function getShortPeriodLabel(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const endMonth = end.toLocaleDateString("id-ID", { month: "short" });
  const startFullMonth = start.toLocaleDateString("id-ID", { month: "long" });
  const endFullMonth = end.toLocaleDateString("id-ID", { month: "long" });

  if (
    start.getMonth() !== end.getMonth() ||
    start.getFullYear() !== end.getFullYear()
  ) {
    return `${start.getDate()} ${startFullMonth} - ${end.getDate()} ${endFullMonth}`;
  }

  return `${start.getDate()}-${end.getDate()} ${endMonth}`;
}

// Mengubah data periode database menjadi data yang siap ditampilkan.
function mapPeriods(
  data: { id: number; amount: number; start_date: string; end_date: string }[],
): Period[] {
  return [...data]
    .sort((first, second) => first.start_date.localeCompare(second.start_date))
    .map((period) => ({
      id: period.id,
      amount: money(period.amount),
      label: getPeriodLabel(period.start_date, period.end_date),
      shortLabel: getShortPeriodLabel(period.start_date, period.end_date),
      monthKey: period.start_date.slice(0, 7),
      monthLabel: new Date(`${period.start_date}T00:00:00`).toLocaleDateString(
        "id-ID",
        { month: "long", year: "numeric" },
      ),
    }));
}

// Mengubah data anggota database menjadi data yang dipakai komponen client.
function mapMembers(data: { id: string; name: string }[]): Member[] {
  return data.map((member) => ({
    id: member.id,
    name: member.name,
  }));
}

// Mengubah pembayaran database menjadi record riwayat yang siap ditampilkan.
function mapPaymentRecords(data: PaymentRow[]): PaymentRecord[] {
  return data.map((payment) => ({
    id: payment.id,
    memberId: payment.member_id,
    periodId: payment.period_id,
    amount: money(Number(payment.amount)),
    period: getShortPeriodLabel(
      payment.cash_periods.start_date,
      payment.cash_periods.end_date,
    ),
    date: payment.paid_at,
    member: payment.member.name,
  }));
}

// Menghitung ringkasan pembayaran dari data transaksi terbaru.
function buildSummary(
  payments: PaymentRow[],
  memberCount: number,
): SummaryData {
  const today = new Date();
  const paymentsToday = payments.filter((payment) => {
    const paidAt = new Date(payment.paid_at);
    return (
      paidAt.getFullYear() === today.getFullYear() &&
      paidAt.getMonth() === today.getMonth() &&
      paidAt.getDate() === today.getDate()
    );
  }).length;
  const paidMemberCount = new Set(payments.map((payment) => payment.member_id))
    .size;
  const totalCash = payments.reduce(
    (total, payment) => total + Number(payment.amount),
    0,
  );

  return {
    paymentsToday: paymentsToday.toString(),
    paidMembers: paidMemberCount.toString(),
    unpaidMembers: Math.max(memberCount - paidMemberCount, 0).toString(),
    totalCash: money(totalCash),
  };
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
  const periods = mapPeriods(dataCashPeriods ?? []);
  const members = mapMembers(dataMember ?? []);
  const payments = mapPaymentRecords(dataCashPayments ?? []);
  const summary = buildSummary(dataCashPayments ?? [], members.length);
  return (
    <BendaharaClient
      paymentsRecord={payments}
      memberFromServer={members}
      periodsFromServer={periods}
      summary={summary}
      username={user.username}
    />
  );
};

export default BendaharaPage;
