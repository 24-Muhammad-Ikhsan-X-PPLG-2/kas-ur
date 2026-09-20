import HomeClient from "@/features/home/client";
import { createClient } from "@/supabase/server";
import { getProfile } from "@/utils/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Anggota | Kas XI PPLG 2",
  description: "Jadwal dan informasi pembayaran kas kelas XI PPLG 2.",
};
// Mengambil daftar anggota untuk ditampilkan pada halaman awal.
const Page = async () => {
  const user = await getProfile();
  if (user) {
    if (user.role === "admin") {
      redirect("/admin");
    } else if (user.role === "bendahara") {
      redirect("/bendahara");
    }
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("member")
    .select("id, name")
    .order("name");

  return (
    <HomeClient
      members={data ?? []}
      errorMessage={error ? "Daftar anggota gagal dimuat." : undefined}
    />
  );
};

export default Page;
