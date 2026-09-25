"use client";

import { Info } from "lucide-react";

const Note = () => {
  return (
    <aside className="mt-10 flex items-start gap-4 rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-5 shadow-[5px_5px_0_#241a1a]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
        <Info size={21} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-black tracking-tight">Tentang Kas</h2>
        <p className="mt-1 text-sm leading-relaxed text-[#6f6262]">
          Kas kelas digunakan untuk kebutuhan bersama XI PPLG 2.
        </p>
        <p className="mt-2 text-xs font-bold text-[#550000]">
          Catatan penting: jangan lupa bayar uang kas, nanti dicambuk Riki
          (katanya).
        </p>
      </div>
    </aside>
  );
};

export default Note;
