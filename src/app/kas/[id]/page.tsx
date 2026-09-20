import KasClient from "@/features/kas/client";
import { createClient } from "@/supabase/server";

const PageKas = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();
  return <KasClient />;
};

export default PageKas;
