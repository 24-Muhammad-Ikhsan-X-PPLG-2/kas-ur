import HomeClient from "@/features/home/client";
import { getProfile } from "@/utils/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Anggota | Kas XI PPLG 2",
  description: "Jadwal dan informasi pembayaran kas kelas XI PPLG 2.",
};
const Page = async () => {
  const user = await getProfile();
  if (!user) {
    redirect("/login");
  }
  return <HomeClient />;
};

export default Page;
