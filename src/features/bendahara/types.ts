export type Period = {
  id: number;
  label: string;
  shortLabel: string;
  amount: string;
};

export type PaymentRecord = {
  id: number;
  member: string;
  period: string;
  amount: string;
  date: string;
};

export type Member = {
  id: string;
  name: string;
};

export type SummaryData = {
  paymentsToday: string;
  paidMembers: string;
  unpaidMembers: string;
  totalCash: string;
};

export type BendaharaClientProps = {
  periodsFromServer: Period[];
  memberFromServer: Member[];
  paymentsRecord: PaymentRecord[];
  summary: SummaryData;
};
