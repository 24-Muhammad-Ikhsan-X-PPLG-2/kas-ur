"use client";
import { supabase } from "@/supabase/client";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <nav className="border-b-[3px] border-[#171416] bg-[#f8f2e8] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
        <a
          href="/"
          className="flex items-center gap-3 text-base font-black tracking-[-0.06em] sm:text-xl"
          aria-label="Kas XI PPLG 2 beranda"
        >
          <span className="grid h-9 w-10 -rotate-3 place-items-center border-[3px] border-[#171416] bg-[#7a1f3d] text-sm text-[#f8f2e8] shadow-[4px_4px_0_#171416]">
            XI
          </span>
          <span>
            Kas XI <b className="text-[#7a1f3d]">PPLG 2</b>
          </span>
          <span className="hidden border-2 border-[#171416] bg-[#fffdf8] px-2 py-1 text-[9px] font-black tracking-wider sm:inline-block">
            ADMIN
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-2 text-sm font-bold">
            <UserRound size={18} strokeWidth={2.5} aria-hidden="true" />
            Ikhsan
          </span>
          <button
            type="button"
            className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#171416] bg-[#fffdf8] px-3 text-xs font-black shadow-[3px_3px_0_#171416] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
            aria-label="Keluar dari akun"
            onClick={handleLogout}
          >
            <LogOut size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
