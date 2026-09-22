"use client";

import { Check } from "lucide-react";
import { Period } from "../types";

type PeriodOptionProps = {
  period: Period;
  index: number;
  isPaid: boolean;
  isSelected: boolean;
  isSubmitting: boolean;
  onSelect: (periodId: number, periodIndex: number) => void;
};

// Menampilkan satu periode sebagai checkbox pembayaran.
const PeriodOption = ({
  period,
  index,
  isPaid,
  isSelected,
  isSubmitting,
  onSelect,
}: PeriodOptionProps) => {
  const periodClassName = isPaid
    ? "cursor-pointer border-[#557348] bg-[#edf4e9]"
    : isSelected
      ? "cursor-pointer border-[#550000] bg-[#f4e4df]"
      : "cursor-pointer border-[#ddd0c7] bg-[#fffaf2] hover:border-[#241a1a]";
  const checkboxClassName = isPaid
    ? "border-[#557348] bg-[#557348]"
    : "peer-checked:bg-[#550000]";

  return (
    <label
      className={`flex items-start gap-3 rounded-md border-2 p-3 transition ${periodClassName}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => undefined}
        onClick={() => onSelect(period.id, index)}
        disabled={isSubmitting}
        className="peer sr-only"
      />
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center border-2 border-[#241a1a] bg-white text-transparent peer-checked:text-white ${checkboxClassName}`}
      >
        <Check size={13} strokeWidth={3} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-black">Minggu {index + 1}</span>
        <span className="mt-1 block text-xs text-[#6f6262]">
          {isPaid ? "Sudah bayar - klik untuk hapus" : period.label}
        </span>
      </span>
    </label>
  );
};

export default PeriodOption;
