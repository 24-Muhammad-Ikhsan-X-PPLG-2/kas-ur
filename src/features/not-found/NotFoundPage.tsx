"use client";

import { ArrowLeft, ArrowRight, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f7f1e8] px-5 py-6 text-[#241a1a] sm:px-10 sm:py-8 lg:px-20">
      <style>{`
        @keyframes not-found-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .not-found-enter { animation: none !important; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8ccc2_1px,transparent_1px),linear-gradient(90deg,#d8ccc2_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-base font-black tracking-[-0.06em] sm:text-xl"
            aria-label="Kas XI PPLG 2 beranda"
          >
            <span className="grid h-9 w-10 -rotate-3 place-items-center border-[3px] border-[#241a1a] bg-[#550000] text-sm text-[#f7f1e8] shadow-[4px_4px_0_#241a1a]">
              XI
            </span>
            <span>
              Kas XI <b className="text-[#550000]">PPLG 2</b>
            </span>
          </Link>
          <span className="hidden border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-1 text-[9px] font-black tracking-wider sm:inline-block">
            2026 / 2027
          </span>
        </header>

        <section
          className="not-found-enter relative grid flex-1 place-items-center py-14 sm:py-20 [animation:not-found-enter_500ms_ease-out_both]"
          aria-labelledby="not-found-title"
        >
          <div
            className="absolute left-0 top-1/4 hidden h-14 w-14 -rotate-12 border-[3px] border-[#241a1a] bg-[#ead6d1] shadow-[5px_5px_0_#241a1a] sm:block"
            aria-hidden="true"
          />
          <div
            className="absolute right-2 top-1/3 hidden h-10 w-24 rotate-6 border-[3px] border-[#241a1a] bg-[#550000] shadow-[5px_5px_0_#241a1a] sm:block"
            aria-hidden="true"
          />

          <div className="w-full max-w-[580px] rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 text-center shadow-[8px_8px_0_#241a1a] sm:p-10 sm:shadow-[11px_11px_0_#241a1a]">
            <div className="mx-auto mb-7 flex max-w-[320px] items-center justify-center gap-3 border-b-2 border-dashed border-[#d8ccc2] pb-5">
              <span className="grid h-10 w-10 place-items-center border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
                <RotateCcw size={19} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#550000]">
                Rute tidak tersedia
              </p>
            </div>

            <p className="font-mono text-xs font-black uppercase tracking-[0.14em] text-[#550000]">
              Error 404
            </p>
            <h1
              id="not-found-title"
              className="mt-3 text-[5.5rem] font-black leading-[0.8] tracking-[-0.1em] text-[#550000] sm:text-[9rem]"
            >
              404
            </h1>
            <h2 className="mt-7 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
              Halaman tidak ditemukan
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6f6262] sm:text-base">
              Halaman yang kamu cari nggak ada atau mungkin sudah dipindahkan.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-5 text-sm font-black text-[#fffaf2] shadow-[5px_5px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
              >
                <Home size={18} strokeWidth={2.5} aria-hidden="true" />
                Kembali ke Beranda
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#fffaf2] px-5 text-sm font-black shadow-[5px_5px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]"
              >
                <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
                Kembali
              </button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t-[3px] border-[#241a1a] py-5 text-xs font-bold text-[#6f6262] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-black text-[#241a1a]">
            Kas XI <b className="text-[#550000]">PPLG 2</b>
          </span>
          <span className="font-mono text-[#550000]">{"// route check"}</span>
        </footer>
      </div>
    </main>
  );
};

export default NotFoundPage;
