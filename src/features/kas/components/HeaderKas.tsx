"use client";

const HeaderKas = () => {
  return (
    <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#550000]">
          XI PPLG 2 / Member Area
        </p>
        <h1 className="max-w-2xl text-[2.9rem] font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-7xl">
          Jangan lupa
          <br />
          <span className="text-[#550000]">bayar kas.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#6f6262] sm:text-lg">
          Cek jadwal dan nominal pembayaran kas kelas kamu di sini.
        </p>
      </div>
      <span className="w-fit -rotate-2 border-2 border-[#241a1a] bg-[#fffaf2] px-3 py-2 font-mono text-xs font-bold shadow-[4px_4px_0_#241a1a]">
        // CASH REMINDER
      </span>
    </header>
  );
};

export default HeaderKas;
