import LoginClient from "@/features/login/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login woi",
};

const LoginPage = () => {
  return <LoginClient />;
};

export default LoginPage;
