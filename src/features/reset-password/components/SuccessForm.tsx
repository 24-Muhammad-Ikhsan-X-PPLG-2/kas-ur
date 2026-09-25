"use client";

import Link from "next/link";

const SuccessForm = () => {
  return (
    <>
      <header className="pt-7">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#550000]">
          Selesai
        </p>
        <h1 className="text-[2.5rem] font-black leading-[0.94] tracking-[-0.08em] sm:text-[3rem]">
          Password Berhasil Diubah
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#6f6262]">
          Password akunmu sudah berhasil diperbarui.
        </p>
      </header>

      <div className="mt-7">
        <Link
          href="/"
          className="flex min-h-[55px] w-full items-center justify-center rounded-[7px] border-[3px] border-[#241a1a] bg-[#550000] font-black text-[#fffaf2] shadow-[6px_6px_0_#241a1a] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#241a1a] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#550000]"
        >
          Kembali ke Halaman Beranda
        </Link>
      </div>
    </>
  );
};

export default SuccessForm;
