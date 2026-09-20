import KasClient from "@/features/kas/client";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

type PeriodRow = {
  id: number;
  amount: number;
  start_date: string;
  end_date: string;
};

type PaymentRow = {
  period_id: number;
  amount: number;
  paid_at: string;
};

type PaymentStatus = "Sudah lunas" | "Belum lunas";

type PaymentScheduleItem = {
  id: number;
  period: string;
  amount: string;
  status: PaymentStatus;
};

// Membuat label periode lengkap untuk ringkasan pembayaran.
const getPeriodLabel = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const month = end.toLocaleDateString("id-ID", { month: "long" });

  return `${start.getDate()}-${end.getDate()} ${month} ${end.getFullYear()}`;
};

// Membuat label periode ringkas untuk daftar jadwal pembayaran.
const getShortPeriodLabel = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const month = end.toLocaleDateString("id-ID", { month: "short" });

  return `${start.getDate()}-${end.getDate()} ${month}`;
};

// Membuat label tanggal jatuh tempo dari akhir periode.
const getDueDateLabel = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Memformat nominal menggunakan format mata uang Indonesia.
const formatAmount = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const PageKas = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data: member, error: memberError } = await supabase
    .from("member")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  if (memberError || !member) {
    console.error(memberError);
    redirect("/");
  }

  const [{ data: periods }, { data: payments }, { data: config }] =
    await Promise.all([
      supabase
        .from("cash_periods")
        .select("id, amount, start_date, end_date")
        .order("start_date", { ascending: true }),
      supabase
        .from("cash_payments")
        .select("period_id, amount, paid_at")
        .eq("member_id", id),
      supabase.from("cash_config").select("amount").maybeSingle(),
    ]);
  const periodRows = (periods ?? []) as PeriodRow[];
  const paymentRows = (payments ?? []) as PaymentRow[];
  const paidAmountsByPeriod = new Map(
    paymentRows.map((payment) => [
      Number(payment.period_id),
      Number(payment.amount),
    ]),
  );
  const paymentSchedule: PaymentScheduleItem[] = periodRows.map((period) => {
    const paidAmount = paidAmountsByPeriod.get(Number(period.id)) ?? 0;
    const remainingAmount = Math.max(period.amount - paidAmount, 0);
    const isPaid = paidAmount >= period.amount;

    return {
      id: period.id,
      period: getShortPeriodLabel(period.start_date, period.end_date),
      amount:
        !isPaid && paidAmount > 0
          ? `Sisa ${formatAmount(remainingAmount)}`
          : formatAmount(period.amount),
      status: isPaid ? "Sudah lunas" : "Belum lunas",
    };
  });
  const nextPayment = periodRows.find(
    (period) =>
      (paidAmountsByPeriod.get(Number(period.id)) ?? 0) < period.amount,
  );
  const nextPaymentAmount = nextPayment
    ? Math.max(
        nextPayment.amount -
          (paidAmountsByPeriod.get(Number(nextPayment.id)) ?? 0),
        0,
      )
    : 0;

  return (
    <KasClient
      username={member.name}
      weeklyAmount={formatAmount(config?.amount ?? nextPayment?.amount ?? 0)}
      nextPayment={
        nextPayment
          ? {
              amount: formatAmount(nextPaymentAmount),
              dueDate: getDueDateLabel(nextPayment.end_date),
              period: getPeriodLabel(
                nextPayment.start_date,
                nextPayment.end_date,
              ),
            }
          : null
      }
      paymentSchedule={paymentSchedule}
    />
  );
};

export default PageKas;
