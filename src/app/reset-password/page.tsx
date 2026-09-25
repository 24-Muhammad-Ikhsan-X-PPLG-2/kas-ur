import ResetPasswordClient from "@/features/reset-password/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Kas XI PPLG 2",
};

const ResetPassword = () => {
  return <ResetPasswordClient />;
};

export default ResetPassword;
