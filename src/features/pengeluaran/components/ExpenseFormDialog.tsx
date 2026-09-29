"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "@/features/admin/components/Modal";
import FormError from "@/features/admin/components/FormError";
import { expenseCategories, Expense } from "../type";
import { expenseSchema, ExpenseFormValues } from "../schema";
import { formatExpenseAmount, getTodayDate } from "../utils";

type ExpenseFormDialogProps = {
  expense: Expense | null;
  onClose: () => void;
  onSave: (values: ExpenseFormValues) => void | Promise<void>;
};

const ExpenseFormDialog = ({
  expense,
  onClose,
  onSave,
}: ExpenseFormDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      category: "",
      spent_at: getTodayDate(),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    reset(
      expense
        ? {
            title: expense.title,
            description: expense.description ?? "",
            amount: String(expense.amount),
            category: expense.category,
            spent_at: expense.spent_at,
          }
        : {
            title: "",
            description: "",
            amount: "",
            category: "",
            spent_at: getTodayDate(),
          },
    );
  }, [expense, reset]);

  return (
    <Modal
      title={expense ? "Edit Pengeluaran" : "Tambah Pengeluaran"}
      description={
        expense
          ? "Perbarui catatan pengeluaran kas kelas."
          : "Catat penggunaan uang kas kelas secara rapi."
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSave)} noValidate className="grid gap-5">
        <div>
          <label
            htmlFor="expense-title"
            className="mb-2 block text-sm font-extrabold"
          >
            Judul
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="expense-title"
                placeholder="Contoh: Beli spidol"
                className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              />
            )}
          />
          <FormError message={errors.title?.message} />
        </div>
        <div>
          <label
            htmlFor="expense-description"
            className="mb-2 block text-sm font-extrabold"
          >
            Deskripsi{" "}
            <span className="font-normal text-[#6f6262]">(opsional)</span>
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="expense-description"
                rows={3}
                placeholder="Jelaskan penggunaan uang kas..."
                className="w-full resize-none rounded-md border-[3px] border-[#241a1a] bg-white px-3 py-2 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              />
            )}
          />
          <FormError message={errors.description?.message} />
        </div>
        <div>
          <label
            htmlFor="expense-amount"
            className="mb-2 block text-sm font-extrabold"
          >
            Nominal
          </label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                id="expense-amount"
                inputMode="numeric"
                value={
                  field.value ? formatExpenseAmount(Number(field.value)) : ""
                }
                onChange={(event) =>
                  field.onChange(event.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="Rp0"
                className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
              />
            )}
          />
          <FormError message={errors.amount?.message} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="expense-category"
              className="mb-2 block text-sm font-extrabold"
            >
              Kategori
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="expense-category"
                  className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
                >
                  <option value="">Pilih kategori</option>
                  {expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
            />
            <FormError message={errors.category?.message} />
          </div>
          <div>
            <label
              htmlFor="expense-date"
              className="mb-2 block text-sm font-extrabold"
            >
              Tanggal
            </label>
            <Controller
              name="spent_at"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="expense-date"
                  type="date"
                  className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000]"
                />
              )}
            />
            <FormError message={errors.spent_at?.message} />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t-2 border-dashed border-[#d8ccc2] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-md border-[3px] border-[#241a1a] px-4 text-sm font-black transition hover:bg-[#ead6d1] focus-visible:outline-3 focus-visible:outline-[#550000]"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-11 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[4px_4px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-[#550000]"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Pengeluaran"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseFormDialog;
