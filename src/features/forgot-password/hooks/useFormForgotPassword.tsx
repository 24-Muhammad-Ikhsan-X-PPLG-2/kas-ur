"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordValues } from "../schema";
import AuthService from "@/service/AuthService";
import { toast } from "react-toastify";

const useFormResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async ({ email }) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const { error, success } = await AuthService.resetPassword(email);

      if (!success || error) {
        const message = error?.message?.toLowerCase() || "";

        if (
          message.includes("user not found") ||
          message.includes("not found")
        ) {
          setError("email", {
            message: "Email belum terdaftar. Coba cek kembali email kamu.",
          });
          return;
        }

        toast.error("Gagal mengirim link reset password. Coba lagi nanti.");
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    // state
    isLoading,
    isSuccess,
    errors,
    // function
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useFormResetPassword;
