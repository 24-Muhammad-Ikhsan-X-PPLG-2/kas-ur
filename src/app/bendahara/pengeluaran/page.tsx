import PengeluaranClient from "@/features/pengeluaran/client";
import { getProfile } from "@/utils/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Atur Pengeluaran | Kas XI PPLG 2",
};

const Pengeluaran = async () => {
  const user = await getProfile();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "anggota") {
    redirect("/");
  }

  return <PengeluaranClient username={user.username} />;
};

export default Pengeluaran;
