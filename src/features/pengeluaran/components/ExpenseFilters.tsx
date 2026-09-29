import { Search, SlidersHorizontal, X } from "lucide-react";
import { expenseCategories, DateFilter, ExpenseCategory } from "../type";

type ExpenseFiltersProps = {
  search: string;
  category: ExpenseCategory | "all";
  dateFilter: DateFilter;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ExpenseCategory | "all") => void;
  onDateFilterChange: (value: DateFilter) => void;
  onReset: () => void;
};

const ExpenseFilters = ({
  search,
  category,
  dateFilter,
  onSearchChange,
  onCategoryChange,
  onDateFilterChange,
  onReset,
}: ExpenseFiltersProps) => {
  const hasFilters = Boolean(
    search || category !== "all" || dateFilter !== "all",
  );

  return (
    <section
      className="mt-8 rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-5 shadow-[6px_6px_0_#241a1a] sm:p-6"
      aria-labelledby="filters-heading"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#550000]">
            Find a record
          </p>
          <h2
            id="filters-heading"
            className="text-xl font-black tracking-[-0.05em]"
          >
            Filter pengeluaran
          </h2>
        </div>
        <SlidersHorizontal
          size={20}
          className="text-[#550000]"
          aria-hidden="true"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
        <label className="text-sm font-extrabold">
          Cari pengeluaran
          <span className="relative mt-2 block">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f6262]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari pengeluaran..."
              className="h-11 w-full rounded-md border-[3px] border-[#241a1a] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
            />
          </span>
        </label>
        <label className="text-sm font-extrabold">
          Kategori
          <select
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as ExpenseCategory | "all")
            }
            className="mt-2 h-11 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
          >
            <option value="all">Semua Kategori</option>
            {expenseCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-extrabold">
          Periode
          <select
            value={dateFilter}
            onChange={(event) =>
              onDateFilterChange(event.target.value as DateFilter)
            }
            className="mt-2 h-11 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
          >
            <option value="all">Semua</option>
            <option value="month">Bulan Ini</option>
            <option value="threeMonths">3 Bulan Terakhir</option>
            <option value="year">Tahun Ini</option>
          </select>
        </label>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-[#241a1a] bg-[#ead6d1] px-3 text-xs font-black shadow-[3px_3px_0_#241a1a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
          >
            <X size={15} aria-hidden="true" /> Reset
          </button>
        )}
      </div>
    </section>
  );
};

export default ExpenseFilters;
