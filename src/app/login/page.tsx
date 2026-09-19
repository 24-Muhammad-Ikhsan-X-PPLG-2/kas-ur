import LoginClient from "@/features/login/client";
import TestPage from "@/features/test";
import { createClient } from "@/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login woi",
};

const LoginPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/");
  }
  return <LoginClient />;
};

export default LoginPage;
