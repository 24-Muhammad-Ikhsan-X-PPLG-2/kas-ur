"use client";

import { supabase } from "@/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CashConfig, CashPeriod } from "./type";
import KonfigurasiSection from "./components/KonfigurasiSection";
import Nav from "./components/Nav";
import PeriodSection from "./components/PeriodSection";
import SystemNote from "./components/SystemNote";
import {
  CashConfigInput,
  CashConfigValues,
  CashPeriodInput,
  CashPeriodValues,
  configSchema,
  periodSchema,
} from "./schema";
import ModalConfig from "./components/ModalConfig";
import ModalPeriod from "./components/ModalPeriod";
import ModalDelete from "./components/ModalDelete";
import { generateNumber } from "@/utils/client";

// const cashConfig = { amount: 5000, period: "weekly" as const, isActive: true };
// const initialPeriods = [
//   {
//     id: 1,
//     startDate: "2026-09-15",
//     endDate: "2026-09-21",
//     amount: 5000,
//     status: "Aktif",
//   },
//   {
//     id: 2,
//     startDate: "2026-09-22",
//     endDate: "2026-09-28",
//     amount: 5000,
//     status: "Mendatang",
//   },
//   {
//     id: 3,
//     startDate: "2026-09-29",
//     endDate: "2026-10-05",
//     amount: 5000,
//     status: "Mendatang",
//   },
//   {
//     id: 4,
//     startDate: "2026-10-06",
//     endDate: "2026-10-12",
//     amount: 5000,
//     status: "Mendatang",
//   },
// ];

type AdminClientProps = {
  cashConfig: CashConfig;
  periods: CashPeriod[];
  username: string;
};

const AdminClient: FC<AdminClientProps> = ({
  cashConfig,
  periods: periodsServer,
  username,
}) => {
  const [periods, setPeriods] = useState<CashPeriod[]>(periodsServer);
  const [config, setConfig] = useState<CashConfig>(cashConfig);
  const [modal, setModal] = useState<"config" | "period" | "delete" | null>(
    null,
  );
  const [editingPeriod, setEditingPeriod] = useState<CashPeriod | null>(null);
  const configForm = useForm<CashConfigInput, unknown, CashConfigValues>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      amount: cashConfig.amount,
      period: cashConfig.period,
      isActive: cashConfig.is_active,
    },
    mode: "onBlur",
  });
  const periodForm = useForm<CashPeriodInput, unknown, CashPeriodValues>({
    resolver: zodResolver(periodSchema),
    defaultValues: { amount: cashConfig.amount, startDate: "", endDate: "" },
    mode: "onBlur",
  });
  const openConfig = () => {
    configForm.reset(config);
    setModal("config");
  };
  const openNewPeriod = () => {
    setEditingPeriod(null);
    periodForm.reset({ amount: config.amount, startDate: "", endDate: "" });
    setModal("period");
  };
  const openEditPeriod = (period: CashPeriod) => {
    setEditingPeriod(period);
    periodForm.reset(period);
    setModal("period");
  };
  const onConfigSubmit: SubmitHandler<CashConfigValues> = async (data) => {
    const toastId = toast.loading("Sebentar...");
    const { error } = await supabase
      .from("cash_config")
      .update({
        amount: data.amount,
        period: data.period,
        is_active: data.isActive,
      })
      .eq("id", cashConfig.id);
    if (error) {
      toast.update(toastId, {
        render: "Yah terjadi error, coba lagi nanti...",
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
      return;
    }
    setConfig({
      ...data,
      created_at: new Date().toISOString(),
      is_active: data.isActive,
      id: cashConfig.id,
    });
    setModal(null);
    toast.update(toastId, {
      render: "Konfigurasi berhasil diperbarui.",
      autoClose: 3000,
      type: "success",
      isLoading: false,
    });
  };
  const onPeriodSubmit: SubmitHandler<CashPeriodValues> = async (data) => {
    const toastId = toast.loading("Sebentar...");
    if (editingPeriod) {
      setPeriods((current) =>
        current.map((period) =>
          period.id === editingPeriod.id
            ? { ...period, ...data, status: period.status }
            : period,
        ),
      );
      const { error: errorUpdate } = await supabase
        .from("cash_periods")
        .update({
          start_date: data.startDate,
          end_date: data.endDate,
          amount: data.amount,
        })
        .eq("id", editingPeriod.id);
      if (errorUpdate) {
        toast.update(toastId, {
          render: errorUpdate.message,
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
        return;
      }
    } else {
      const id = generateNumber();
      setPeriods((current) => [
        ...current,
        { id, ...data, status: "Mendatang" },
      ]);
      const { error: errorInsert, data: dataInsert } = await supabase
        .from("cash_periods")
        .insert({
          config_id: config.id,
          start_date: data.startDate,
          end_date: data.endDate,
          amount: data.amount,
        })
        .select("id")
        .maybeSingle();
      setPeriods((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                id: dataInsert!.id,
              }
            : item,
        ),
      );
      if (errorInsert) {
        toast.update(toastId, {
          render: errorInsert.message,
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
        return;
      }
    }
    setModal(null);
    toast.update(toastId, {
      render: `Periode kas berhasil ${editingPeriod ? "diperbarui" : "ditambahkan"}.`,
      autoClose: 3000,
      isLoading: false,
      type: "success",
    });
  };
  const deletePeriod = async () => {
    if (!editingPeriod) return;
    const toastId = toast.loading("Sebentarrr...");
    const { error: errorDelete } = await supabase
      .from("cash_periods")
      .delete()
      .eq("id", editingPeriod.id);
    if (errorDelete) {
      toast.update(toastId, {
        render: errorDelete.message,
        autoClose: 3000,
        isLoading: false,
        type: "success",
      });
      return;
    }
    setPeriods((current) =>
      current.filter((period) => period.id !== editingPeriod.id),
    );
    setEditingPeriod(null);
    setModal(null);
    toast.update(toastId, {
      render: "Periode kas berhasil dihapus.",
      autoClose: 3000,
      isLoading: false,
      type: "success",
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#241a1a]">
      <Nav username={username} />
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <header className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#550000]">
              XI PPLG 2 / Admin
            </p>
            <h1 className="text-[2.9rem] font-black leading-[.92] tracking-[-.08em] sm:text-6xl">
              Atur kas
              <br />
              <span className="text-[#550000]">kelas.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-[#6f6262] sm:text-lg">
              Kelola nominal pembayaran dan periode kas XI PPLG 2.
            </p>
          </div>
          <span className="w-fit -rotate-2 border-2 border-[#241a1a] bg-[#241a1a] px-3 py-2 font-mono text-xs font-bold text-[#d6e7b8] shadow-[4px_4px_0_#241a1a]">
            // CASH CONFIGURATION
          </span>
        </header>
        <KonfigurasiSection config={config} openConfig={openConfig} />
        <PeriodSection
          openEditPeriod={openEditPeriod}
          openNewPeriod={openNewPeriod}
          periods={periods}
          setEditingPeriod={setEditingPeriod}
          setModal={setModal}
        />

        <SystemNote />
      </div>
      <footer className="border-t-[3px] border-[#241a1a] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 text-xs font-bold text-[#6f6262] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-black text-[#241a1a]">
            Kas XI <b className="text-[#550000]">PPLG 2</b>
          </span>
          <span>© 2026 XI PPLG 2</span>
          <span className="font-mono text-[#550000]">// system settings</span>
        </div>
      </footer>
      {modal === "config" && (
        <ModalConfig
          configForm={configForm}
          onConfigSubmit={onConfigSubmit}
          setModal={setModal}
        />
      )}
      {modal === "period" && (
        <ModalPeriod
          editingPeriod={editingPeriod}
          onPeriodSubmit={onPeriodSubmit}
          periodForm={periodForm}
          setModal={setModal}
        />
      )}
      {modal === "delete" && editingPeriod && (
        <ModalDelete
          deletePeriod={deletePeriod}
          editingPeriod={editingPeriod}
          setModal={setModal}
        />
      )}
    </main>
  );
};

export default AdminClient;
