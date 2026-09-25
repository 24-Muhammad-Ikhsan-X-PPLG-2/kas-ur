"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordValues } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/service/AuthService";
import { toast } from "react-toastify";

const useFormResetPassword = ({
  setIsSessionValid,
  setIsSuccess,
}: {
  setIsSessionValid: (v: boolean) => void;
  setIsSuccess: (v: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = async ({ password }) => {
    setServerError("");
    setIsLoading(true);

    try {
      const { error, success } = await AuthService.updatePassword(password);

      if (!success || error) {
        const message = error?.message?.toLowerCase() || "";

        if (
          message.includes("session") ||
          message.includes("expired") ||
          message.includes("invalid") ||
          message.includes("reset")
        ) {
          setIsSessionValid(false);
          setServerError(
            "Link reset password mungkin sudah tidak berlaku. Silakan minta link reset password baru.",
          );
          return;
        }

        setServerError("Gagal mengubah password. Coba lagi nanti.");
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
      setServerError("Gagal mengubah password. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    // state
    showPassword,
    showConfirmPassword,
    isLoading,
    serverError,
    errors,
    // function
    setShowPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    onSubmit,
  };
};
export default useFormResetPassword;
