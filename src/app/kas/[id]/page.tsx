import KasClient from "@/features/kas/client";
import { createClient } from "@/supabase/server";
import { getProfile } from "@/utils/server";
import { redirect } from "next/navigation";

const PageKas = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("member")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    console.error(error);
    redirect("/");
  }

  return <KasClient username={data.name} />;
};

export default PageKas;
