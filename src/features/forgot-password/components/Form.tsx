"use client";

import useFormForgotPassword from "../hooks/useFormForgotPassword";

const Form = () => {
  const { errors, handleSubmit, isLoading, isSuccess, onSubmit, register } =
    useFormForgotPassword();
  return (
    <form className="mt-7" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-5">
        <label htmlFor="email" className="mb-2 block text-sm font-extrabold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Masukkan email kamu"
          autoComplete="email"
          autoFocus
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`h-[52px] w-full rounded-[7px] border-[3px] bg-white px-3.5 text-sm outline-none transition focus:border-[#550000] focus:shadow-[4px_4px_0_#550000] ${errors.email ? "border-[#3d0000] bg-[#fff2f4]" : "border-[#241a1a]"}`}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1.5 text-xs font-bold text-[#3d0000]"
          >
            ! {errors.email.message}
          </p>
        )}
      </div>

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
        {isLoading ? "Mengirim..." : "Kirim Link Reset Password"}
      </button>

      {isSuccess && (
        <div
          className="mt-4 rounded-[7px] border-[3px] border-[#3f6b4a] bg-[#edf6ee] px-3 py-3 text-sm font-bold text-[#214b2d]"
          role="status"
        >
          Link reset password sudah dikirim. Cek inbox email kamu.
        </div>
      )}
    </form>
  );
};

export default Form;
