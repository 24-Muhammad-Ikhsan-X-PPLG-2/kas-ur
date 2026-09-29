import { DateFilter, Expense } from "./type";

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

export const getDateRange = (filter: DateFilter) => {
  if (filter === "all") return null;

  const today = new Date();
  const todayDate = getTodayDate();
  let startDate: Date;

  if (filter === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
  } else if (filter === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  } else {
    startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  }

  const offset = startDate.getTimezoneOffset() * 60000;
  const normalizedStart = new Date(startDate.getTime() - offset)
    .toISOString()
    .slice(0, 10);

  return { startDate: normalizedStart, endDate: todayDate };
};

export const getTotal = (rows: { amount: number | string }[]) =>
  rows.reduce((total, row) => total + Number(row.amount), 0);
