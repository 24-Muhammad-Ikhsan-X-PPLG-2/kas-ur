import ForgotPasswordClient from "@/features/forgot-password/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa password | Kas XI PPLG 2",
};

const ForgotPassword = () => {
  return <ForgotPasswordClient />;
};

export default ForgotPassword;
