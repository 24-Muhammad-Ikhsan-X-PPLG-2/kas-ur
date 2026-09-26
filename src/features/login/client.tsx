"use client";

import DekorasiPage from "./components/DekorasiPage";
import FormLogin from "./components/Form";
import Header from "./components/Header";

const LoginClient = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e8] px-5 py-6 text-[#241a1a] sm:px-10 sm:py-8 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8ccc2_1px,transparent_1px),linear-gradient(90deg,#d8ccc2_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <Header />

      <section
        className="relative z-10 mx-auto grid min-h-[calc(100vh-132px)] max-w-6xl place-items-center py-10 sm:py-14"
        aria-label="Login Kas XI PPLG 2"
      >
        <DekorasiPage />

        <div className="w-full max-w-[470px] rounded-[14px] border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9 sm:shadow-[11px_11px_0_#241a1a]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-[#ddd0c7] pb-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#6f6262]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#241a1a] bg-[#709663]" />{" "}
            akses terbatas untuk kelas
          </div>
          <header className="pt-7">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#550000]">
              Halo, anggota kelas.
            </p>
            <h1 className="max-w-sm text-[2.6rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3.5rem]">
              Masuk ke Kas Kelas
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6f6262]">
              Masuk untuk melihat status pembayaran dan informasi kas XI PPLG 2.
            </p>
          </header>

          <FormLogin />
          <footer className="mt-7 border-t-2 border-dashed border-[#d8ccc2] pt-4 text-center text-xs text-[#6f6262]">
            Belum punya akun?{" "}
            <a
              href="https://wa.me/628561617593"
              target="_blank"
              className="font-extrabold text-[#550000] underline underline-offset-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
            >
              Hubungi admin kelas.
            </a>
          </footer>
        </div>
      </section>
      <p className="relative z-10 -mt-5 text-center text-xs text-[#8b7b76]">
        Dibuat untuk kita, dikelola bersama.
      </p>
    </main>
  );
};

export default LoginClient;
