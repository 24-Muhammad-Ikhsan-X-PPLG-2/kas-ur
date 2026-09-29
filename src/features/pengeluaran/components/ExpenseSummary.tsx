import { WalletCards, TrendingDown, CalendarDays } from "lucide-react";
import { formatExpenseAmount } from "../utils";

type ExpenseSummaryProps = {
  balance: number;
  totalExpenses: number;
  currentMonthExpenses: number;
};

const summaryItems = [
  {
    key: "balance",
    label: "Saldo Kas",
    icon: WalletCards,
    accent: true,
  },
  {
    key: "total",
    label: "Total Pengeluaran",
    icon: TrendingDown,
    accent: false,
  },
  {
    key: "month",
    label: "Bulan Ini",
    icon: CalendarDays,
    accent: false,
  },
] as const;

const ExpenseSummary = ({
  balance,
  totalExpenses,
  currentMonthExpenses,
}: ExpenseSummaryProps) => {
  const values = { balance, total: totalExpenses, month: currentMonthExpenses };

  return (
    <section
      className="grid gap-5 sm:grid-cols-3"
      aria-label="Ringkasan pengeluaran"
    >
      {summaryItems.map(({ key, label, icon: Icon, accent }) => (
        <article
          key={key}
          className="rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-4 shadow-[5px_5px_0_#241a1a]"
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`h-2 w-12 ${accent ? "bg-[#550000]" : "bg-[#ead6d1]"}`}
              aria-hidden="true"
            />
            <Icon
              size={19}
              className={accent ? "text-[#550000]" : "text-[#6f6262]"}
              aria-hidden="true"
            />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-[#6f6262]">
            {label}
          </p>
          <p
            className={`mt-2 text-2xl font-black tracking-[-0.06em] sm:text-3xl ${accent ? "text-[#550000]" : "text-[#241a1a]"}`}
          >
            {formatExpenseAmount(values[key])}
          </p>
        </article>
      ))}
    </section>
  );
};

export default ExpenseSummary;
