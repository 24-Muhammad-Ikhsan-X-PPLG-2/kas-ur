"use client";

import { Layers3 } from "lucide-react";
import { FC, useState } from "react";
import PeriodControls from "./PeriodControls";
import PeriodOption from "./PeriodOption";
import SelectField from "./SelectField";
import { Member, PaymentRecord, Period } from "../types";

type Props = {
  members: Member[];
  periods: Period[];
  recentPayments: PaymentRecord[];
  onSubmitSemester: (input: {
    memberId: string;
    periods: Period[];
  }) => Promise<boolean>;
};

// Membuat key stabil untuk mencocokkan anggota dan periode pembayaran.
const paymentKey = (memberId: string | number, periodId: string | number) =>
  `${String(memberId)}:${Number(periodId)}`;

// Menampilkan form pembayaran beberapa periode sekaligus.
const SemesterPaymentEntry: FC<Props> = ({
  members,
  periods,
  recentPayments,
  onSubmitSemester,
}) => {
  const [memberId, setMemberId] = useState("");
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);
  const [anchorPeriodId, setAnchorPeriodId] = useState<number | null>(null);
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paidPeriodKeys = new Set(
    recentPayments.map((payment) =>
      paymentKey(payment.memberId, payment.periodId),
    ),
  );
  const unpaidPeriods = periods.filter(
    (period) => !paidPeriodKeys.has(paymentKey(memberId, period.id)),
  );
  const allPeriodsSelected =
    unpaidPeriods.length > 0 &&
    unpaidPeriods.every((period) => selectedPeriods.includes(period.id));

  // Mengganti anggota sekaligus membersihkan pilihan periode sebelumnya.
  const handleMemberChange = (nextMemberId: string) => {
    setMemberId(nextMemberId);
    setSelectedPeriods([]);
    setAnchorPeriodId(null);
    setIsRangeMode(false);
  };

  // Memilih atau membatalkan satu periode, termasuk pilihan rentang.
  const handlePeriodChange = (periodId: number, periodIndex: number) => {
    const anchorIndex = periods.findIndex(
      (period) => period.id === anchorPeriodId,
    );

    if (isRangeMode && anchorIndex !== -1) {
      const start = Math.min(anchorIndex, periodIndex);
      const end = Math.max(anchorIndex, periodIndex);
      const rangeIds = periods
        .slice(start, end + 1)
        .filter(
          (period) => !paidPeriodKeys.has(paymentKey(memberId, period.id)),
        )
        .map((period) => period.id);

      setSelectedPeriods((current) => [...new Set([...current, ...rangeIds])]);
      setAnchorPeriodId(null);
      setIsRangeMode(false);
      return;
    }

    setAnchorPeriodId(periodId);
    if (isRangeMode) {
      setSelectedPeriods((current) =>
        current.includes(periodId) ? current : [...current, periodId],
      );
      return;
    }

    setSelectedPeriods((current) =>
      current.includes(periodId)
        ? current.filter((id) => id !== periodId)
        : [...current, periodId],
    );
  };

  // Memilih semua periode yang belum dibayar atau membatalkan semuanya.
  const toggleAllPeriods = () => {
    setSelectedPeriods(
      allPeriodsSelected ? [] : unpaidPeriods.map((period) => period.id),
    );
  };

  // Mengaktifkan mode pemilihan rentang dari periode awal ke periode akhir.
  const toggleRangeMode = () => {
    setIsRangeMode((current) => !current);
    setAnchorPeriodId(null);
  };

  // Menyimpan seluruh periode terpilih melalui callback parent.
  const handleSubmit = async () => {
    if (!memberId || selectedPeriods.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmitSemester({
      memberId,
      periods: periods.filter((period) => selectedPeriods.includes(period.id)),
    });
    setIsSubmitting(false);

    if (success) {
      setMemberId("");
      setSelectedPeriods([]);
      setAnchorPeriodId(null);
      setIsRangeMode(false);
    }
  };

  return (
    <section
      className="mt-12 max-w-4xl rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9"
      aria-labelledby="semester-heading"
      suppressHydrationWarning
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
            Bulk payment
          </p>
          <h2
            id="semester-heading"
            className="text-3xl font-black tracking-[-.06em]"
          >
            Catat satu semester
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#6f6262]">
            Pilih anggota, lalu tandai semua minggu yang dibayar sekaligus.
          </p>
        </div>
        <span className="hidden rounded-md border-2 border-[#241a1a] bg-[#ead6d1] p-2 text-[#550000] sm:block">
          <Layers3 size={20} aria-hidden="true" />
        </span>
      </div>

      <div className="grid gap-5">
        <SelectField
          id="semester-member"
          label="Nama Anggota"
          value={memberId}
          onChange={(event) => handleMemberChange(event.target.value)}
        >
          <option value="">Pilih anggota</option>
          {members.map((member) => (
            <option value={member.id} key={member.id}>
              {member.name}
            </option>
          ))}
        </SelectField>

        <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a]">
          <div className="flex flex-col gap-3 border-b-[3px] border-[#241a1a] bg-[#ead6d1] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wide">
                Periode semester
              </p>
              <p className="mt-1 text-xs text-[#6f6262]">
                {selectedPeriods.length} dari {unpaidPeriods.length} minggu
                belum dibayar
              </p>
            </div>
            <PeriodControls
              allPeriodsSelected={allPeriodsSelected}
              isRangeMode={isRangeMode}
              isDisabled={
                !memberId || unpaidPeriods.length === 0 || isSubmitting
              }
              onToggleAll={toggleAllPeriods}
              onToggleRange={toggleRangeMode}
            />
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
            {periods.map((period, index) => {
              const isPaid = paidPeriodKeys.has(
                paymentKey(memberId, period.id),
              );

              return (
                <PeriodOption
                  key={period.id}
                  period={period}
                  index={index}
                  isPaid={isPaid}
                  isSelected={isPaid || selectedPeriods.includes(period.id)}
                  isSubmitting={isSubmitting}
                  onSelect={handlePeriodChange}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-2 border-dashed border-[#b8a49d] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black">
              {selectedPeriods.length > 0
                ? `${selectedPeriods.length} pembayaran siap dicatat`
                : "Belum ada minggu yang dipilih"}
            </p>
            <p className="mt-1 text-xs text-[#6f6262]">
              Semua periode diproses sekaligus sebagai pembayaran anggota ini.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!memberId || selectedPeriods.length === 0 || isSubmitting}
            className="min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Catat semester"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SemesterPaymentEntry;
