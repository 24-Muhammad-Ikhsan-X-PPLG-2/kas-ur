"use client";

import z from "zod";

export const configSchema = z.object({
  amount: z.coerce
    .number({ message: "Masukkan nominal kas." })
    .positive("Nominal harus lebih dari 0."),
  period: z.enum(["weekly", "monthly"]),
  isActive: z.boolean(),
});
export const periodSchema = z
  .object({
    startDate: z.string().min(1, "Tanggal mulai wajib diisi."),
    endDate: z.string().min(1, "Tanggal selesai wajib diisi."),
    amount: z.coerce
      .number({ message: "Masukkan nominal periode." })
      .positive("Nominal harus lebih dari 0."),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Tanggal selesai harus setelah tanggal mulai.",
    path: ["endDate"],
  });

export type CashConfigInput = z.input<typeof configSchema>;
export type CashConfigValues = z.output<typeof configSchema>;
export type CashPeriodInput = z.input<typeof periodSchema>;
export type CashPeriodValues = z.output<typeof periodSchema>;
