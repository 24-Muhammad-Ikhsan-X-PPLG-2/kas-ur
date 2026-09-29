import { Expense } from "./type";

export const formatExpenseAmount = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatExpenseDate = (
  date: string,
  month: "long" | "short" = "long",
) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month,
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export const getTotalExpenses = (expenses: Expense[]) =>
  expenses.reduce((total, expense) => total + expense.amount, 0);

export const getTodayDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};
