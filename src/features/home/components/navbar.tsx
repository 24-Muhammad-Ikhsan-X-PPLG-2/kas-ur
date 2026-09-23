"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b-[3px] border-[#241a1a] bg-[#f7f1e8] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a
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
        </a>
        <div className="flex items-center gap-2">
          <span className="hidden border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-1 text-[9px] font-black tracking-wider sm:inline-block">
            2026 / 2027
          </span>
          <Link href={"/login"}>
            <button className="border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-2 text-[12px] font-black cursor-pointer tracking-wider sm:inline-block hover:shadow-[4px_4px_0px_#241a1a] transition duration-300">
              Login sebagai admin
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
