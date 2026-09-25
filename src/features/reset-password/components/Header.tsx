"use client";

import Link from "next/link";

const Header = () => {
  return (
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
  );
};

export default Header;
