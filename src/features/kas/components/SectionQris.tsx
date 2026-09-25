"use client";

const SectionQris = () => {
  return (
    <>
      <section
        className="mt-16 overflow-hidden rounded-xl border-[3px] border-[#241a1a] bg-[#550000] text-[#fffaf2] shadow-[8px_8px_0_#241a1a]"
        aria-labelledby="announcement-heading"
      >
        <div className="grid gap-6 p-6 sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.13em] text-[#e7b8b0]">
              Papan pengumuman
            </p>
            <h2
              id="announcement-heading"
              className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
            >
              Pembayaran via QRIS belum tersedia
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#f5ded9] sm:text-base">
              Fitur pembayaran kas menggunakan QRIS masih belum bisa digunakan.
              Developer sedang sibuk mempersiapkan ujian tengah semester.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-xl border-[3px] border-[#241a1a] bg-[#ead8d4] p-5 text-[#241a1a] shadow-[4px_4px_0_#241a1a]">
            <div className="mb-3 flex items-center gap-2 font-mono text-sm font-black">
              <span className="grid h-7 w-7 place-items-center border-2 border-[#241a1a] bg-[#fffaf2] text-xs">
                !
              </span>
              Status fitur
            </div>
            <p className="text-2xl font-black tracking-[-0.06em]">
              Dalam pengembangan
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#6f6262]">
              QRIS akan segera tersedia setelah bendahara mendapatkan KTP.
            </p>
          </div>
        </div>
      </section>
      {/* <section
          className="mt-16 grid overflow-hidden rounded-xl border-[3px] border-[#241a1a] bg-[#550000] text-[#fffaf2] shadow-[8px_8px_0_#241a1a] md:grid-cols-[1fr_0.75fr]"
          aria-labelledby="qris-heading"
        >
          <div className="p-6 sm:p-9 lg:p-10">
            <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.13em] text-[#e7b8b0]">
              Scan &amp; pay
            </p>
            <h2
              id="qris-heading"
              className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
            >
              Bayar Kas via QRIS
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f5ded9]">
              Scan QRIS berikut menggunakan aplikasi pembayaran kamu.
            </p>
            <p className="mt-8 text-2xl font-black">
              {weeklyAmount}{" "}
              <span className="text-sm font-bold text-[#e7b8b0]">/ minggu</span>
            </p>
            <p className="mt-1 text-sm font-bold">Kas XI PPLG 2</p>
            <ol className="mt-8 grid gap-3 text-sm font-bold">
              <li>01. Buka aplikasi pembayaran</li>
              <li>02. Scan QRIS</li>
              <li>03. Selesaikan pembayaran</li>
            </ol>
          </div>
          <div className="flex flex-col items-center justify-center border-t-[3px] border-[#241a1a] bg-[#ead8d4] p-6 text-[#241a1a] md:border-l-[3px] md:border-t-0">
            <div className="mb-3 flex items-center gap-2 font-mono text-sm font-black">
              <span className="grid h-7 w-7 place-items-center border-2 border-[#241a1a] bg-[#fffaf2] text-xs">
                Q
              </span>{" "}
              QRIS
            </div>
            <div className="w-full max-w-[220px]">
              <QrPlaceholder />
            </div>
            <p className="mt-4 text-center text-[10px] font-bold text-[#6f6262]">
              QRIS hanya placeholder untuk tampilan.
            </p>
          </div>
        </section> */}
    </>
  );
};

export default SectionQris;
