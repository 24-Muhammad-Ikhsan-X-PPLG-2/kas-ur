"use client";

type PeriodControlsProps = {
  allPeriodsSelected: boolean;
  isRangeMode: boolean;
  isDisabled: boolean;
  onToggleAll: () => void;
  onToggleRange: () => void;
};

// Menampilkan tombol aksi untuk memilih semua atau memilih rentang periode.
const PeriodControls = ({
  allPeriodsSelected,
  isRangeMode,
  isDisabled,
  onToggleAll,
  onToggleRange,
}: PeriodControlsProps) => (
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={onToggleAll}
      disabled={isDisabled}
      className="w-fit border-2 border-[#241a1a] bg-[#fffaf2] px-3 py-2 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      {allPeriodsSelected ? "Batalkan semua" : "Pilih semua minggu"}
    </button>
    <button
      type="button"
      onClick={onToggleRange}
      disabled={isDisabled}
      className={`w-fit border-2 px-3 py-2 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 disabled:cursor-not-allowed disabled:opacity-50 ${isRangeMode ? "border-[#550000] bg-[#550000] text-[#fffaf2]" : "border-[#241a1a] bg-[#fffaf2]"}`}
    >
      {isRangeMode ? "Batal pilih rentang" : "Pilih rentang"}
    </button>
  </div>
);

export default PeriodControls;
