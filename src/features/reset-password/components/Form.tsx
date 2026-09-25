"use client";

import { FC } from "react";
import useFormResetPassword from "../hooks/useFormResetPassword";
import EyeIcon from "./EyeIcon";
import Link from "next/link";

type Props = {
  setIsSessionValid: (v: boolean) => void;
  setIsSuccess: (v: boolean) => void;
};

const Form: FC<Props> = ({ setIsSessionValid, setIsSuccess }) => {
  const {
    errors,
    handleSubmit,
    isLoading,
    onSubmit,
    register,
    serverError,
    setShowConfirmPassword,
    setShowPassword,
    showConfirmPassword,
    showPassword,
  } = useFormResetPassword({ setIsSessionValid, setIsSuccess });
  return (
    <>
      <header className="pt-7">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#550000]">
          Keamanan akun
        </p>
        <h1 className="text-[2.6rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3.1rem]">
          Buat Password Baru
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6f6262]">
          Masukkan password baru untuk mengamankan kembali akunmu.
        </p>
      </header>

      <form className="mt-7" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-extrabold"
          >
            Password Baru
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              autoComplete="new-password"
              autoFocus
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`h-[52px] w-full rounded-[7px] border-[3px] bg-white px-3.5 pr-12 text-sm outline-none transition focus:border-[#550000] focus:shadow-[4px_4px_0_#550000] ${errors.password ? "border-[#3d0000] bg-[#fff2f4]" : "border-[#241a1a]"}`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              className="absolute right-1 top-1 grid h-[46px] w-11 place-items-center text-[#6f6262] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
          {errors.password && (
            <p
              id="password-error"
              className="mt-1.5 text-xs font-bold text-[#3d0000]"
            >
              ! {errors.password.message}
            </p>
          )}
          <p className="mt-2 text-[11px] font-bold text-[#6f6262]">
            Password minimal 8 karakter
          </p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-extrabold"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password baru"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "confirm-password-error" : undefined
              }
              className={`h-[52px] w-full rounded-[7px] border-[3px] bg-white px-3.5 pr-12 text-sm outline-none transition focus:border-[#550000] focus:shadow-[4px_4px_0_#550000] ${errors.confirmPassword ? "border-[#3d0000] bg-[#fff2f4]" : "border-[#241a1a]"}`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={
                showConfirmPassword
                  ? "Sembunyikan konfirmasi password"
                  : "Tampilkan konfirmasi password"
              }
              className="absolute right-1 top-1 grid h-[46px] w-11 place-items-center text-[#6f6262] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
            >
              <EyeIcon visible={showConfirmPassword} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              className="mt-1.5 text-xs font-bold text-[#3d0000]"
            >
              ! {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {serverError && (
          <div
            className="mb-5 rounded-[7px] border-[3px] border-[#3d0000] bg-[#fff2f4] px-3 py-3 text-sm font-bold text-[#3d0000]"
            role="alert"
          >
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex min-h-[55px] w-full items-center justify-center gap-2 rounded-[7px] border-[3px] border-[#241a1a] bg-[#550000] font-black text-[#fffaf2] shadow-[6px_6px_0_#241a1a] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#241a1a] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#550000]"
        >
          {isLoading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-[#e8c9c4] border-t-transparent"
              aria-hidden="true"
            />
          )}
          {isLoading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>

      <div className="mt-7 border-t-2 border-dashed border-[#d8ccc2] pt-4 text-center text-sm">
        <Link
          href="/login"
          className="font-extrabold text-[#550000] underline underline-offset-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
        >
          Kembali ke Login
        </Link>
      </div>
    </>
  );
};

export default Form;
