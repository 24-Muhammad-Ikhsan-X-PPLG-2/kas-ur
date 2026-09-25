"use client";

import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password baru wajib diisi.")
      .min(8, "Password minimal 8 karakter."),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
