"use client";

const BendaharaHeader = () => (
  <header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
    <div>
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#7a1f3d]">
        XI PPLG 2 / Bendahara
      </p>
      <h1 className="text-[2.9rem] font-black leading-[.92] tracking-[-.08em] sm:text-6xl">
        Catat pembayaran
        <br />
        <span className="text-[#7a1f3d]">kas.</span>
      </h1>
      <p className="mt-5 max-w-lg text-base text-[#766d6e] sm:text-lg">
        Kelola pembayaran kas anggota kelas dengan mudah dan rapi.
      </p>
    </div>
    <span className="w-fit -rotate-2 border-2 border-[#171416] bg-[#171416] px-3 py-2 font-mono text-xs font-bold text-[#bce2a7] shadow-[4px_4px_0_#171416]">
      // CASH MANAGEMENT
    </span>
  </header>
);

export default BendaharaHeader;
