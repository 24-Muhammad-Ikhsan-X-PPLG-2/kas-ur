"use client";
import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Masukkan email yang valid."),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
