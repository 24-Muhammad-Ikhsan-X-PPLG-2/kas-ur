import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi."),
  description: z.string().trim().optional(),
  amount: z
    .string()
    .min(1, "Nominal wajib diisi.")
    .refine((value) => Number(value.replace(/[^0-9]/g, "")) > 0, {
      message: "Nominal harus lebih besar dari 0.",
    }),
  category: z.string().min(1, "Kategori wajib dipilih."),
  spent_at: z.string().min(1, "Tanggal wajib diisi."),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
