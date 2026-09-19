"use client";

import {
  CalendarDays,
  Clock3,
  Info,
  LogOut,
  UserRound,
  WalletCards,
} from "lucide-react";

const paymentInfo = {
  amount: 5000,
  period: "15 – 21 September 2026",
  dueDate: "21 September 2026",
};

const paymentSchedule = [
  { period: "15 – 21 Sep 2026", amount: "Rp5.000" },
  { period: "22 – 28 Sep 2026", amount: "Rp5.000" },
  { period: "29 Sep – 5 Okt 2026", amount: "Rp5.000" },
];

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const QrPlaceholder = () => {
  const pattern = [
    "111111100101101111111",
    "100000101110101000001",
    "101110100010101011101",
    "101110101111101011101",
    "101110100101101011101",
    "100000101010101000001",
    "111111101010101111111",
    "000000001101100000000",
    "101101111001011011101",
    "010011001110100110010",
    "111010111011111000111",
    "001101000110001101100",
    "111111101101110101011",
    "100000101011011100101",
    "101110101110101110111",
    "101110100011100011001",
    "101110101101011101101",
    "100000101100110010011",
    "111111101011101111111",
  ];

  return (
    <div className="border-[3px] border-[#171416] bg-white p-3 shadow-[5px_5px_0_#171416]">
      <div className="grid aspect-square w-full grid-cols-[repeat(21,1fr)] gap-[2px] bg-white">
        {pattern.flatMap((row, rowIndex) =>
          [...row].map((cell, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              className={cell === "1" ? "bg-[#171416]" : "bg-white"}
            />
          )),
        )}
      </div>
      <p className="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-wider text-[#766d6e]">
        placeholder only
      </p>
    </div>
  );
};

type ScheduleItemProps = {
  period: string;
  amount: string;
};

const ScheduleItem = ({ period, amount }: ScheduleItemProps) => (
  <article className="rounded-lg border-[3px] border-[#171416] bg-[#fffdf8] p-4 shadow-[5px_5px_0_#171416]">
    <div className="mb-5 flex items-start justify-between gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#171416] bg-[#e6c1cc] text-[#7a1f3d]">
        <CalendarDays size={18} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="border-2 border-[#7a1f3d] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#7a1f3d]">
        Belum dibayar
      </span>
    </div>
    <p className="text-sm font-extrabold">{period}</p>
    <p className="mt-2 text-xl font-black tracking-tight text-[#7a1f3d]">
      {amount}
    </p>
  </article>
);

const HomeClient = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f2e8] text-[#171416]">
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
              2026 / 2027
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <UserRound size={19} strokeWidth={2.5} aria-hidden="true" />
              <span>Ikhsan</span>
            </div>
            <button
              type="button"
              className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#171416] bg-[#fffdf8] px-3 text-xs font-black shadow-[3px_3px_0_#171416] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#171416] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#7a1f3d]"
              aria-label="Keluar dari akun"
            >
              <LogOut size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#7a1f3d]">
              XI PPLG 2 / Member Area
            </p>
            <h1 className="max-w-2xl text-[2.9rem] font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-7xl">
              Jangan lupa
              <br />
              <span className="text-[#7a1f3d]">bayar kas.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#766d6e] sm:text-lg">
              Cek jadwal dan nominal pembayaran kas kelas kamu di sini.
            </p>
          </div>
          <span className="w-fit -rotate-2 border-2 border-[#171416] bg-[#fffdf8] px-3 py-2 font-mono text-xs font-bold shadow-[4px_4px_0_#171416]">
            // CASH REMINDER
          </span>
        </header>

        <section
          className="relative overflow-hidden rounded-xl border-[3px] border-[#171416] bg-[#fffdf8] p-6 shadow-[8px_8px_0_#171416] sm:p-8 lg:p-10"
          aria-labelledby="next-payment-heading"
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rotate-12 border-[3px] border-[#171416] bg-[#7a1f3d] sm:h-36 sm:w-36"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <p
                  className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#766d6e]"
                  id="next-payment-heading"
                >
                  Baru Bayar
                </p>
                <span className="bg-[#7a1f3d] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#fffaf3]">
                  Rp. 3000
                </span>
              </div>
              <p className="text-[4rem] font-black leading-none tracking-[-0.09em] text-[#7a1f3d] sm:text-7xl">
                {formatAmount(2000)}
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold sm:gap-7">
                {/* <span className="flex items-center gap-2">
                  <CalendarDays size={18} aria-hidden="true" />
                  {paymentInfo.period}
                </span> */}
                <span className="flex items-center gap-2">
                  <WalletCards size={18} aria-hidden="true" />
                  Kas kelas
                </span>
              </div>
            </div>
            <div className="max-w-[240px] border-l-4 border-[#7a1f3d] pl-4 sm:mt-12">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                <Clock3 size={16} aria-hidden="true" /> Batas pembayaran
              </p>
              <p className="mt-2 text-lg font-black">{paymentInfo.dueDate}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#766d6e]">
                Yuk, jangan sampai lupa bayar kas minggu ini.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="schedule-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#7a1f3d]">
                Payment check
              </p>
              <h2
                id="schedule-heading"
                className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
              >
                Jadwal Pembayaran
              </h2>
            </div>
            <span className="hidden font-mono text-xs text-[#766d6e] sm:block">
              03 periode terdekat
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {paymentSchedule.map((item) => (
              <ScheduleItem key={item.period} {...item} />
            ))}
          </div>
        </section>

        <section
          className="mt-16 grid overflow-hidden rounded-xl border-[3px] border-[#171416] bg-[#7a1f3d] text-[#fffaf3] shadow-[8px_8px_0_#171416] md:grid-cols-[1fr_0.75fr]"
          aria-labelledby="qris-heading"
        >
          <div className="p-6 sm:p-9 lg:p-10">
            <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.13em] text-[#f0c1ce]">
              Scan &amp; pay
            </p>
            <h2
              id="qris-heading"
              className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
            >
              Bayar Kas via QRIS
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f5dce2]">
              Scan QRIS berikut menggunakan aplikasi pembayaran kamu.
            </p>
            <p className="mt-8 text-2xl font-black">
              Rp5.000{" "}
              <span className="text-sm font-bold text-[#f0c1ce]">/ minggu</span>
            </p>
            <p className="mt-1 text-sm font-bold">Kas XI PPLG 2</p>
            <ol className="mt-8 grid gap-3 text-sm font-bold">
              <li>01. Buka aplikasi pembayaran</li>
              <li>02. Scan QRIS</li>
              <li>03. Selesaikan pembayaran</li>
            </ol>
          </div>
          <div className="flex flex-col items-center justify-center border-t-[3px] border-[#171416] bg-[#e8cbd2] p-6 text-[#171416] md:border-l-[3px] md:border-t-0">
            <div className="mb-3 flex items-center gap-2 font-mono text-sm font-black">
              <span className="grid h-7 w-7 place-items-center border-2 border-[#171416] bg-[#fffdf8] text-xs">
                Q
              </span>{" "}
              QRIS
            </div>
            <div className="w-full max-w-[220px]">
              <QrPlaceholder />
            </div>
            <p className="mt-4 text-center text-[10px] font-bold text-[#766d6e]">
              QRIS hanya placeholder untuk tampilan.
            </p>
          </div>
        </section>

        <aside className="mt-10 flex items-start gap-4 rounded-lg border-[3px] border-[#171416] bg-[#fffdf8] p-5 shadow-[5px_5px_0_#171416]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-[#171416] bg-[#e6c1cc] text-[#7a1f3d]">
            <Info size={21} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-black tracking-tight">Tentang Kas</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#766d6e]">
              Kas kelas digunakan untuk kebutuhan bersama XI PPLG 2.
            </p>
          </div>
        </aside>
      </div>

      <footer className="border-t-[3px] border-[#171416] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 text-xs font-bold text-[#766d6e] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-black text-[#171416]">
            Kas XI <b className="text-[#7a1f3d]">PPLG 2</b>
          </span>
          <span>© 2026 XI PPLG 2</span>
          <span className="font-mono text-[#7a1f3d]">
            // made for XI PPLG 2
          </span>
        </div>
      </footer>
    </main>
  );
};

export default HomeClient;
