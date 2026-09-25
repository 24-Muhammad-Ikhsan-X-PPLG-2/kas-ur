export type PaymentScheduleItem = {
  id: number;
  period: string;
  amount: string;
  status: "Sudah lunas" | "Belum lunas";
};

export type NextPayment = {
  amount: string;
  dueDate: string;
  period: string;
};

export type KasClientProps = {
  username: string;
  weeklyAmount: string;
  nextPayment: NextPayment | null;
  paymentSchedule: PaymentScheduleItem[];
};

export type ScheduleItemProps = {
  period: string;
  amount: string;
  status: PaymentScheduleItem["status"];
};
