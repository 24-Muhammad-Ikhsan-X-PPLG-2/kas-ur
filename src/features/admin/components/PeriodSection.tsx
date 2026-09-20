"use client";

import { FC } from "react";
import { CashPeriod } from "../type";
import { CalendarDays, Edit3, Plus, Trash2 } from "lucide-react";
import { dateRange, money } from "@/utils/client";

type Props = {
  openNewPeriod: () => void;
  periods: CashPeriod[];
  openEditPeriod: (v: CashPeriod) => void;
  setEditingPeriod: (v: CashPeriod) => void;
  setModal: (v: "config" | "period" | "delete") => void;
};

const PeriodSection: FC<Props> = ({
  openNewPeriod,
  periods,
  openEditPeriod,
  setEditingPeriod,
  setModal,
}) => {
  return (
    <section className="mt-14" aria-labelledby="periods-heading">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#550000]">
            Schedule control
          </p>
          <h2
            id="periods-heading"
            className="text-3xl font-black tracking-[-.06em] sm:text-4xl"
          >
            Periode Kas
          </h2>
          <p className="mt-2 text-sm text-[#6f6262]">
            Kelola periode pembayaran kas yang sudah dibuat.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewPeriod}
          className="flex min-h-11 items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#241a1a] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#550000] transition active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
        >
          <Plus size={17} />
          Tambah Periode
        </button>
      </div>
      {periods.length === 0 ? (
        <div className="rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-8 text-center shadow-[6px_6px_0_#241a1a]">
          <CalendarDays className="mx-auto mb-3 text-[#550000]" />
          <h3 className="font-black">Belum ada periode kas.</h3>
          <p className="mt-1 text-sm text-[#6f6262]">
            Tambahkan periode pembayaran untuk mulai mengatur jadwal kas kelas.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] shadow-[6px_6px_0_#241a1a]">
          <div className="hidden grid-cols-[1.6fr_1fr_1fr_.6fr] gap-4 border-b-[3px] border-[#241a1a] bg-[#ead6d1] px-5 py-3 text-[10px] font-black uppercase tracking-wide md:grid">
            <span>Periode</span>
            <span>Nominal</span>
            <span>Status</span>
            <span>Aksi</span>
          </div>
          {periods.map((period) => (
            <div
              key={period.id}
              className="grid gap-4 border-b-2 border-[#ddd0c7] p-4 last:border-b-0 md:grid-cols-[1.6fr_1fr_1fr_.6fr] md:items-center md:gap-4 md:px-5"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
                  <CalendarDays size={17} />
                </span>
                <div>
                  <p className="font-black">{dateRange(period)}</p>
                  <p className="mt-1 text-xs text-[#6f6262]">
                    Periode kas kelas
                  </p>
                </div>
              </div>
              <p className="font-black text-[#550000]">
                {money(period.amount)}
              </p>
              <span
                className={`w-fit border-2 px-2 py-1 text-[10px] font-black uppercase ${period.status === "Aktif" ? "border-[#3f6b4a] text-[#3f6b4a]" : "border-[#6f6262] text-[#6f6262]"}`}
              >
                {period.status}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEditPeriod(period)}
                  className="flex min-h-9 items-center gap-1 rounded border-2 border-[#241a1a] bg-[#fffaf2] px-2 text-xs font-black shadow-[2px_2px_0_#241a1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  aria-label={`Edit periode ${dateRange(period)}`}
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPeriod(period);
                    setModal("delete");
                  }}
                  className="grid h-9 w-9 place-items-center rounded border-2 border-[#3d0000] text-[#3d0000] shadow-[2px_2px_0_#3d0000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  aria-label={`Hapus periode ${dateRange(period)}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PeriodSection;
