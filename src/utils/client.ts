import { CashPeriod } from "@/features/admin/type";

export function formatTime(date: string) {
  const formatted = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
  return formatted;
}
export const money = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
export const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
export const dateRange = (period: CashPeriod) =>
  `${dateLabel(period.startDate)} – ${dateLabel(period.endDate)}`;
export const generateNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000);
};

type BillingStatus =
  | "entar aja tagihnya"
  | "tagih sekarang"
  | "sekarang tagih, udh telat";

export function getBillingStatus(
  startDate: string,
  endDate: string,
): BillingStatus {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Hilangkan jam supaya perbandingan hanya berdasarkan tanggal
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (today < start) {
    return "entar aja tagihnya";
  }

  if (today > end) {
    return "sekarang tagih, udh telat";
  }

  return "tagih sekarang";
}
