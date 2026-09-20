"use client";

import { Check, Layers3 } from "lucide-react";
import { FC, useState } from "react";
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

const paymentKey = (memberId: string | number, periodId: string | number) =>
  `${String(memberId)}:${Number(periodId)}`;

const SemesterPaymentEntry: FC<Props> = ({
  members,
  periods,
  recentPayments,
  onSubmitSemester,
}) => {
  const [memberId, setMemberId] = useState("");
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);
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

  const handleMemberChange = (nextMemberId: string) => {
    setMemberId(nextMemberId);
    setSelectedPeriods([]);
  };

  const togglePeriod = (periodId: number) => {
    setSelectedPeriods((current) =>
      current.includes(periodId)
        ? current.filter((id) => id !== periodId)
        : [...current, periodId],
    );
  };

  const toggleAllPeriods = () => {
    setSelectedPeriods(
      allPeriodsSelected ? [] : unpaidPeriods.map((period) => period.id),
    );
  };

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
            <button
              type="button"
              onClick={toggleAllPeriods}
              disabled={!memberId || unpaidPeriods.length === 0 || isSubmitting}
              className="w-fit border-2 border-[#241a1a] bg-[#fffaf2] px-3 py-2 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {allPeriodsSelected ? "Batalkan semua" : "Pilih semua minggu"}
            </button>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
            {periods.map((period, index) => {
              const isPaid = paidPeriodKeys.has(paymentKey(memberId, period.id));
              const isSelected = isPaid || selectedPeriods.includes(period.id);
              const periodClassName = isPaid
                ? "cursor-not-allowed border-[#557348] bg-[#edf4e9]"
                : isSelected
                  ? "cursor-pointer border-[#550000] bg-[#f4e4df]"
                  : "cursor-pointer border-[#ddd0c7] bg-[#fffaf2] hover:border-[#241a1a]";
              const checkboxClassName = isPaid
                ? "border-[#557348] bg-[#557348]"
                : "peer-checked:bg-[#550000]";

              return (
                <label
                  key={period.id}
                  className={`flex items-start gap-3 rounded-md border-2 p-3 transition ${periodClassName}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => togglePeriod(period.id)}
                    disabled={isPaid || isSubmitting}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center border-2 border-[#241a1a] bg-white text-transparent peer-checked:text-white ${checkboxClassName}`}
                  >
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-black">
                      Minggu {index + 1}
                    </span>
                    <span className="mt-1 block text-xs text-[#6f6262]">
                      {isPaid ? "Sudah bayar" : period.label}
                    </span>
                  </span>
                </label>
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
