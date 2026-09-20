"use client";

import {
  CalendarDays,
  Clock3,
  Info,
  LogOut,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useRouter } from "next/navigation";

type PaymentScheduleItem = {
  id: number;
  period: string;
  amount: string;
  status: "Sudah lunas" | "Belum lunas";
};

type NextPayment = {
  amount: string;
  dueDate: string;
  period: string;
};

type KasClientProps = {
  username: string;
  weeklyAmount: string;
  nextPayment: NextPayment | null;
  paymentSchedule: PaymentScheduleItem[];
};

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
    <div className="border-[3px] border-[#241a1a] bg-white p-3 shadow-[5px_5px_0_#241a1a]">
      <div className="grid aspect-square w-full grid-cols-[repeat(21,1fr)] gap-[2px] bg-white">
        {pattern.flatMap((row, rowIndex) =>
          [...row].map((cell, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              className={cell === "1" ? "bg-[#241a1a]" : "bg-white"}
            />
          )),
        )}
      </div>
      <p className="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-wider text-[#6f6262]">
        placeholder only
      </p>
    </div>
  );
};

type ScheduleItemProps = {
  period: string;
  amount: string;
  status: PaymentScheduleItem["status"];
};

// Menampilkan satu periode beserta status pembayaran aktualnya.
const ScheduleItem = ({ period, amount, status }: ScheduleItemProps) => {
  const isPaid = status === "Sudah lunas";
  const statusClassName = isPaid
    ? "border-[#3f6b4a] text-[#3f6b4a]"
    : "border-[#550000] text-[#550000]";

  return (
    <article className="rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-4 shadow-[5px_5px_0_#241a1a]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
          <CalendarDays size={18} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span
          className={`border-2 px-2 py-1 text-[10px] font-black uppercase tracking-wide ${statusClassName}`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm font-extrabold">{period}</p>
      <p className="mt-2 text-xl font-black tracking-tight text-[#550000]">
        {amount}
      </p>
    </article>
  );
};

const KasClient = ({
  username,
  weeklyAmount,
  nextPayment,
  paymentSchedule,
}: KasClientProps) => {
  const router = useRouter();
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#241a1a]">
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
              2026 / 2027
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <UserRound size={19} strokeWidth={2.5} aria-hidden="true" />
              <span>{username}</span>
            </div>
            <button
              type="button"
              className="flex min-h-10 items-center gap-2 rounded-md border-2 border-[#241a1a] bg-[#fffaf2] px-3 text-xs font-black shadow-[3px_3px_0_#241a1a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#550000]"
              aria-label="Keluar dari akun"
              onClick={() => router.push("/")}
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

        <section
          className="relative overflow-hidden rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-8 lg:p-10"
          aria-labelledby="next-payment-heading"
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rotate-12 border-[3px] border-[#241a1a] bg-[#550000] sm:h-36 sm:w-36"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <p
                  className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#6f6262]"
                  id="next-payment-heading"
                >
                  {nextPayment ? "Pembayaran berikutnya" : "Status pembayaran"}
                </p>
                <span className="bg-[#550000] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#fffaf2]">
                  {nextPayment ? "Belum lunas" : "Semua lunas"}
                </span>
              </div>
              <p className="text-[4rem] font-black leading-none tracking-[-0.09em] text-[#550000] sm:text-7xl">
                {nextPayment?.amount ?? "Lunas"}
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold sm:gap-7">
                {nextPayment && (
                  <span className="flex items-center gap-2">
                    <CalendarDays size={18} aria-hidden="true" />
                    {nextPayment.period}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <WalletCards size={18} aria-hidden="true" /> Kas kelas
                </span>
              </div>
            </div>
            <div className="max-w-[240px] border-l-4 border-[#550000] pl-4 sm:mt-12">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                <Clock3 size={16} aria-hidden="true" /> Batas pembayaran
              </p>
              <p className="mt-2 text-lg font-black">
                {nextPayment?.dueDate ?? "Tidak ada tunggakan"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#6f6262]">
                Yuk, jangan sampai lupa bayar kas minggu ini.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="schedule-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
                Payment check
              </p>
              <h2
                id="schedule-heading"
                className="text-3xl font-black tracking-[-0.06em] sm:text-4xl"
              >
                Jadwal Pembayaran
              </h2>
            </div>
            <span className="hidden font-mono text-xs text-[#6f6262] sm:block">
              {paymentSchedule.length} periode
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {paymentSchedule.map((item) => (
              <ScheduleItem key={item.period} {...item} />
            ))}
          </div>
        </section>

        <section
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
        </section>

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
      </div>

      <footer className="border-t-[3px] border-[#241a1a] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 text-xs font-bold text-[#6f6262] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-black text-[#241a1a]">
            Kas XI <b className="text-[#550000]">PPLG 2</b>
          </span>
          <span>© 2026 XI PPLG 2</span>
          <span className="font-mono text-[#550000]">
            // made for XI PPLG 2
          </span>
        </div>
      </footer>
    </main>
  );
};

export default KasClient;
