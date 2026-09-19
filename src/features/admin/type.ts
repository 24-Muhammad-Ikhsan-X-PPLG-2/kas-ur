export type CashPeriod = {
  id: number;
  startDate: string;
  endDate: string;
  amount: number;
  status: string;
};

export type CashConfig = {
  id: string;
  amount: number;
  period: "weekly" | "monthly";
  is_active: boolean;
  created_at: string;
};
