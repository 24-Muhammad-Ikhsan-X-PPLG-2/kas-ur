"use client";

import { Layers3 } from "lucide-react";
import { FC } from "react";
import PeriodControls from "./PeriodControls";
import PeriodOption from "./PeriodOption";
import SelectField from "./SelectField";
import {
  paymentKey,
  useSemesterPaymentEntry,
} from "../hooks/useSemesterPaymentEntry";
import { Member, PaymentRecord, Period } from "../types";

type Props = {
  members: Member[];
  periods: Period[];
  recentPayments: PaymentRecord[];
  onSubmitSemester: (input: {
    memberId: string;
    periods: Period[];
  }) => Promise<boolean>;
  onDeletePayment: (payment: PaymentRecord) => Promise<void>;
};

// Menampilkan form pembayaran beberapa periode sekaligus.
const SemesterPaymentEntry: FC<Props> = ({
  members,
  periods,
  recentPayments,
  onSubmitSemester,
  onDeletePayment,
}) => {
  const {
    memberId,
    selectedPeriods,
    isRangeMode,
    isSubmitting,
    paidPeriodKeys,
    unpaidPeriods,
    allPeriodsSelected,
    periodGroups,
    handleMemberChange,
    handlePeriodChange,
    toggleAllPeriods,
    toggleRangeMode,
    handleSubmit,
  } = useSemesterPaymentEntry({
    periods,
    recentPayments,
    onSubmitSemester,
    onDeletePayment,
  });

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
          <option value="" defaultChecked>
            Pilih anggota
          </option>
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

          <div className="space-y-6 p-4 sm:p-5">
            {[...periodGroups.values()].map((group) => (
              <div key={group[0].monthKey}>
                <h3 className="mb-3 border-b-2 border-[#b8a49d] pb-2 text-sm font-black uppercase tracking-[0.08em] text-[#550000]">
                  {group[0].monthLabel}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((period, groupIndex) => {
                    const index = periods.findIndex(
                      (item) => item.id === period.id,
                    );
                    const isPaid = paidPeriodKeys.has(
                      paymentKey(memberId, period.id),
                    );

                    return (
                      <PeriodOption
                        key={period.id}
                        period={period}
                        index={index}
                        weekNumber={groupIndex + 1}
                        isPaid={isPaid}
                        isSelected={
                          isPaid || selectedPeriods.includes(period.id)
                        }
                        isSubmitting={isSubmitting}
                        onSelect={handlePeriodChange}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
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
