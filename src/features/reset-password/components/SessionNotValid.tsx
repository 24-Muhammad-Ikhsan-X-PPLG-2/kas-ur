"use client";

import Link from "next/link";

const SessionNotValid = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e8] px-5 py-6 text-[#241a1a] sm:px-10 sm:py-8 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8ccc2_1px,transparent_1px),linear-gradient(90deg,#d8ccc2_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-start justify-between gap-4">
        <Link
          href="/"
          aria-label="Kas XI PPLG 2 beranda"
          className="flex items-center gap-3 text-[1.1rem] font-extrabold tracking-[-0.06em] sm:text-xl"
        >
          <span className="grid h-9 w-10 -rotate-3 place-items-center border-[3px] border-[#241a1a] bg-[#550000] text-sm text-[#f7f1e8] shadow-[4px_4px_0_#241a1a] sm:h-10 sm:w-11">
            XI
          </span>
          <span>
            Kas XI <b className="text-[#550000]">PPLG 2</b>
          </span>
        </Link>
        <span className="max-w-[118px] rotate-2 border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.08em] sm:max-w-none sm:text-[10px]">
          XI PPLG 2 <i className="text-[#550000]">•</i> 2026/2027
        </span>
      </header>

      <section
        className="relative z-10 mx-auto grid min-h-[calc(100vh-132px)] max-w-6xl place-items-center py-10 sm:py-14"
        aria-label="Reset password invalid"
      >
        <div className="w-full max-w-[470px] rounded-[14px] border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9 sm:shadow-[11px_11px_0_#241a1a]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-[#ddd0c7] pb-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#6f6262]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#241a1a] bg-[#d99c92]" />{" "}
            link tidak valid
          </div>

          <header className="pt-7">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#550000]">
              Keamanan akun
            </p>
            <h1 className="text-[2.4rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3rem]">
              Gagal Mengubah Password
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#6f6262]">
              Link reset password mungkin sudah tidak berlaku. Silakan minta
              link reset password baru.
            </p>
          </header>

          <div className="mt-7">
            <Link
              href="/forgot-password"
              className="flex min-h-[55px] w-full items-center justify-center rounded-[7px] border-[3px] border-[#241a1a] bg-[#550000] font-black text-[#fffaf2] shadow-[6px_6px_0_#241a1a] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#241a1a] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#550000]"
            >
              Minta Link Reset Baru
            </Link>
          </div>

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
    </main>
  );
};

export default SessionNotValid;
