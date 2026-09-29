export const expenseCategories = [
  "ATK",
  "Konsumsi",
  "Acara",
  "Transportasi",
  "Lainnya",
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number];

export type Expense = {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  category: ExpenseCategory;
  spent_at: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  profile?: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
};

export type DateFilter = "all" | "month" | "threeMonths" | "year";
