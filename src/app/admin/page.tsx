import AdminClient from "@/features/admin/client";
import { CashPeriod } from "@/features/admin/type";
import { createClient } from "@/supabase/server";
import { getProfile } from "@/utils/server";
import { redirect } from "next/navigation";

type PeriodStatus = "Aktif" | "Mendatang" | "Selesai";

const getPeriodStatus = (startDate: string, endDate: string): PeriodStatus => {
  const today = new Date().toISOString().split("T")[0];

  if (today < startDate) {
    return "Mendatang";
  }

  if (today > endDate) {
    return "Selesai";
  }

  return "Aktif";
};

const AdminPage = async () => {
  const user = await getProfile();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "admin") {
    redirect("/");
  }
  const supabase = await createClient();
  const { data: cashConfig } = await supabase
    .from("cash_config")
    .select("*")
    .maybeSingle();
  const { data: periodsDB } = await supabase.from("cash_periods").select("*");
  const periods: CashPeriod[] =
    periodsDB?.map((item) => ({
      amount: item.amount,
      endDate: item.end_date,
      startDate: item.start_date,
      id: item.id,
      status: getPeriodStatus(item.start_date, item.end_date),
    })) ?? [];
  return (
    <AdminClient
      periods={periods}
      cashConfig={cashConfig!}
      username={user.username}
    />
  );
};

export default AdminPage;
