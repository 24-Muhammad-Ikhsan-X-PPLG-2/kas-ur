"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";
import AuthService from "@/service/AuthService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Masukkan email yang valid."),
  password: z.string().min(1, "Password wajib diisi."),
});

type LoginValues = z.infer<typeof loginSchema>;

const EyeIcon = ({ visible }: { visible: boolean }) => {
  if (visible) {
    return <Eye size={24} />;
  }
  return <EyeClosed size={24} />;
};

const LoginClient = () => {
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f2e8] px-5 py-6 text-[#171416] sm:px-10 sm:py-8 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8cfc4_1px,transparent_1px),linear-gradient(90deg,#d8cfc4_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-start justify-between gap-4">
        <a
          href="/"
          aria-label="Kas XI PPLG 2 beranda"
          className="flex items-center gap-3 text-[1.1rem] font-extrabold tracking-[-0.06em] sm:text-xl"
        >
          <span className="grid h-9 w-10 -rotate-3 place-items-center border-[3px] border-[#171416] bg-[#7a1f3d] text-sm text-[#f8f2e8] shadow-[4px_4px_0_#171416] sm:h-10 sm:w-11">
            XI
          </span>
          <span>
            Kas XI <b className="text-[#7a1f3d]">PPLG 2</b>
          </span>
        </a>
        <span className="max-w-[118px] rotate-2 border-2 border-[#171416] bg-[#fffdf8] px-2 py-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.08em] sm:max-w-none sm:text-[10px]">
          XI PPLG 2 <i className="text-[#7a1f3d]">•</i> 2026/2027
        </span>
      </header>

      <section
        className="relative z-10 mx-auto grid min-h-[calc(100vh-132px)] max-w-6xl place-items-center py-10 sm:py-14"
        aria-label="Login Kas XI PPLG 2"
      >
        <div className="absolute left-[4%] top-[13%] hidden rotate-[-4deg] border-2 border-[#171416] bg-[#171416] p-3 font-mono text-[10px] text-[#bce2a7] shadow-[5px_5px_0_#171416] lg:grid">
          <span className="text-[#e3a2b6]">&gt; status kas</span>
          <b>all systems okay_</b>
        </div>
        <div className="absolute right-[9%] top-[17%] hidden rotate-6 border-2 border-[#171416] bg-[#fffdf8] px-3 py-2 text-[11px] leading-tight text-[#7a1f3d] shadow-[5px_5px_0_#171416] lg:block">
          Jangan lupa
          <br />
          <strong className="text-sm">bayar kas.</strong>
        </div>
        <div className="absolute bottom-[14%] left-[11%] hidden rotate-3 border-2 border-[#171416] bg-[#fffdf8] px-2.5 py-2 font-mono text-[10px] text-[#766d6e] shadow-[4px_4px_0_#171416] lg:block">
          &#123; kas: <b className="text-[#347252]">active</b> &#125;
        </div>
        <div className="absolute bottom-[13%] right-[12%] hidden h-[70px] w-[108px] rotate-[-5deg] border-2 border-[#171416] bg-[#e5c4cd] px-2 pt-4 shadow-[4px_4px_0_#171416] lg:block">
          <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full border border-[#171416] bg-[#7a1f3d]" />
          <span className="absolute left-5 top-2 h-1.5 w-1.5 rounded-full border border-[#171416] bg-[#7a1f3d]" />
          <span className="absolute left-8 top-2 h-1.5 w-1.5 rounded-full border border-[#171416] bg-[#7a1f3d]" />
          <span className="font-mono text-[9px] font-bold">classroom.exe</span>
        </div>

        <div className="w-full max-w-[470px] rounded-[14px] border-[3px] border-[#171416] bg-[#fffdf8] p-6 shadow-[8px_8px_0_#171416] sm:p-9 sm:shadow-[11px_11px_0_#171416]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-[#ded5ca] pb-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#766d6e]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#171416] bg-[#72a56d]" />{" "}
            akses terbatas untuk kelas
          </div>
          <header className="pt-7">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#7a1f3d]">
              Halo, anggota kelas.
            </p>
            <h1 className="max-w-sm text-[2.6rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3.5rem]">
              Masuk ke Kas Kelas
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#766d6e]">
              Masuk untuk melihat status pembayaran dan informasi kas XI PPLG 2.
            </p>
          </header>

          <form className="mt-7" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-extrabold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email kamu"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`h-[52px] w-full rounded-[7px] border-[3px] bg-white px-3.5 text-sm outline-none transition focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d] ${errors.email ? "border-[#59142e] bg-[#fff2f4]" : "border-[#171416]"}`}
                {...register("email")}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs font-bold text-[#59142e]"
                >
                  ! {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-extrabold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`h-[52px] w-full rounded-[7px] border-[3px] bg-white px-3.5 pr-12 text-sm outline-none transition focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d] ${errors.password ? "border-[#59142e] bg-[#fff2f4]" : "border-[#171416]"}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute right-1 top-1 grid h-[46px] w-11 place-items-center text-[#766d6e] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs font-bold text-[#59142e]"
                >
                  ! {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-5 flex justify-end">
              <a
                href="#forgot-password"
                className="text-sm font-extrabold text-[#7a1f3d] underline underline-offset-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
              >
                Lupa password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-[55px] w-full items-center justify-center gap-2 rounded-[7px] border-[3px] border-[#171416] bg-[#7a1f3d] font-black text-[#fffaf3] shadow-[6px_6px_0_#171416] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#171416] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#7a1f3d]"
            >
              {isLoading && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-[#f4cbd7] border-t-transparent"
                  aria-hidden="true"
                />
              )}
              {isLoading ? "Memeriksa..." : "Masuk"}
            </button>
            {isSuccess && (
              <p
                className="mt-4 text-center text-xs font-extrabold text-[#276344]"
                role="status"
              >
                Login berhasil. Selamat datang kembali!
              </p>
            )}
          </form>
          <footer className="mt-7 border-t-2 border-dashed border-[#d8cec3] pt-4 text-center text-xs text-[#766d6e]">
            Belum punya akun?{" "}
            <a
              href="https://wa.me/628561617593"
              className="font-extrabold text-[#7a1f3d] underline underline-offset-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
            >
              Hubungi admin kelas.
            </a>
          </footer>
        </div>
      </section>
      <p className="relative z-10 -mt-5 text-center text-xs text-[#968b85]">
        Dibuat untuk kita, dikelola bersama.
      </p>
    </main>
  );
};

export default LoginClient;
