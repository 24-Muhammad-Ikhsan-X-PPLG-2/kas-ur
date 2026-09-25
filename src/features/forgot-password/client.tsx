"use client";

import Link from "next/link";
import Header from "./components/Header";
import Form from "./components/Form";

const ForgotPasswordClient = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e8] px-5 py-6 text-[#241a1a] sm:px-10 sm:py-8 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8ccc2_1px,transparent_1px),linear-gradient(90deg,#d8ccc2_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <Header />

      <section
        className="relative z-10 mx-auto grid min-h-[calc(100vh-132px)] max-w-6xl place-items-center py-10 sm:py-14"
        aria-label="Forgot password Kas XI PPLG 2"
      >
        <div className="absolute left-[4%] top-[13%] hidden rotate-[-4deg] border-2 border-[#241a1a] bg-[#241a1a] p-3 font-mono text-[10px] text-[#d6e7b8] shadow-[5px_5px_0_#241a1a] lg:grid">
          <span className="text-[#d99c92]">&gt; reset access</span>
          <b>secure link ready_</b>
        </div>
        <div className="absolute right-[9%] top-[17%] hidden rotate-6 border-2 border-[#241a1a] bg-[#fffaf2] px-3 py-2 text-[11px] leading-tight text-[#550000] shadow-[5px_5px_0_#241a1a] lg:block">
          Jangan lupa
          <br />
          <strong className="text-sm">bayar kas.</strong>
        </div>
        <div className="absolute bottom-[14%] left-[11%] hidden rotate-3 border-2 border-[#241a1a] bg-[#fffaf2] px-2.5 py-2 font-mono text-[10px] text-[#6f6262] shadow-[4px_4px_0_#241a1a] lg:block">
          &#123; access: <b className="text-[#3f6b4a]">reset</b> &#125;
        </div>

        <div className="w-full max-w-[470px] rounded-[14px] border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9 sm:shadow-[11px_11px_0_#241a1a]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-[#ddd0c7] pb-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#6f6262]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#241a1a] bg-[#709663]" />{" "}
            akses kelas
          </div>

          <header className="pt-7">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#550000]">
              Keamanan akun
            </p>
            <h1 className="max-w-sm text-[2.6rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3.1rem]">
              Lupa Password?
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6f6262]">
              Masukkan email akunmu dan kami akan mengirimkan link untuk
              mengatur ulang password.
            </p>
          </header>

          <Form />

          <div className="mt-7 border-t-2 border-dashed border-[#d8ccc2] pt-4 text-center text-sm">
            <Link
              href="/login"
              className="font-extrabold text-[#550000] underline underline-offset-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
            >
              Kembali ke Login
            </Link>
          </div>
        </div>
      </section>

      <p className="relative z-10 -mt-5 text-center text-xs text-[#8b7b76]">
        Dibuat untuk kita, dikelola bersama.
      </p>
    </main>
  );
};

export default ForgotPasswordClient;
