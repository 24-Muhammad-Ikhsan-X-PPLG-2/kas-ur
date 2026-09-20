"use client";

import { formatTime, money } from "@/utils/client";
import { CashConfig } from "../type";
import { Edit3 } from "lucide-react";
import { FC } from "react";

type Props = {
  config: CashConfig;
  openConfig: () => void;
};

const KonfigurasiSection: FC<Props> = ({ config, openConfig }) => {
  return (
    <section
      className="rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9"
      aria-labelledby="active-config-heading"
    >
      <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-7 flex items-center gap-3">
            <p
              className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#6f6262]"
              id="active-config-heading"
            >
              Konfigurasi Aktif
            </p>
            <span className="bg-[#550000] px-2.5 py-1.5 text-[10px] font-black uppercase text-[#fffaf2]">
              {config.is_active ? "Aktif" : "Nonaktif"}
            </span>
          </div>
          <p className="text-[4rem] font-black leading-none tracking-[-.09em] text-[#550000] sm:text-7xl">
            {money(config.amount)}
          </p>
          <div className="mt-7 flex flex-wrap gap-6 text-sm font-bold">
            <span>
              <span className="block text-xs font-bold uppercase tracking-wide text-[#6f6262]">
                Periode
              </span>
              <span className="mt-1 block">
                {config.period === "weekly" ? "Mingguan" : "Bulanan"}
              </span>
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wide text-[#6f6262]">
                Status
              </span>
              <span className="mt-1 block">
                {config.is_active ? "Aktif" : "Nonaktif"}
              </span>
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wide text-[#6f6262]">
                Dibuat
              </span>
              <span className="mt-1 block">
                {formatTime(config.created_at)}
              </span>
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={openConfig}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[5px_5px_0_#241a1a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#241a1a] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
        >
          <Edit3 size={16} />
          Edit Konfigurasi
        </button>
      </div>
    </section>
  );
};

export default KonfigurasiSection;
