"use client";
import { UserRound } from "lucide-react";
import ConfirmLogoutButton from "@/features/shared/components/ConfirmLogoutButton";

type NavProps = {
  username: string;
};

const Nav = ({ username }: NavProps) => {
  return (
    <nav className="border-b-[3px] border-[#241a1a] bg-[#f7f1e8] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
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
          <span className="hidden border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-1 text-[9px] font-black tracking-wider sm:inline-block">
            ADMIN
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-2 text-sm font-bold">
            <UserRound size={18} strokeWidth={2.5} aria-hidden="true" />
            {username}
          </span>
          <ConfirmLogoutButton className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#241a1a] bg-[#fffaf2] px-3 text-xs font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-[#550000]" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
