import { createClient } from "@/supabase/server";
import { ProfileType } from "@/types/profile";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = (await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()) as PostgrestMaybeSingleResponse<ProfileType>;
  return data;
}
