"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/service/AuthService";
import { toast } from "react-toastify";

const useFormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }) => {
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const { error } = await AuthService.login(email, password);
      if (error) {
        if (error.message === "Invalid login credentials") {
          setError("email", {
            message: "Email atau password salah",
          });
          setError("password", {
            message: "Email atau password salah",
          });
          return;
        }
        toast.error(error.message);
        return;
      }
      router.push("/");
    } catch (e: any) {
      console.error(e);
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    // state
    showPassword,
    isLoading,
    isSuccess,
    errors,
    // function
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useFormLogin;
