import z from "zod";

export const paymentSchema = z.object({
  memberId: z.string().min(1, "Pilih anggota."),
  periodId: z.string().min(1, "Pilih periode."),
  paidAt: z.string().min(1, "Tanggal pembayaran wajib diisi."),
  amount: z.string().min(1, "Masukkan nominal"),
  note: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
