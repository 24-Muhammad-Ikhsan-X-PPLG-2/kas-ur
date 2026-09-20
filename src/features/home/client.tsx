"use client";

import { ArrowRight, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  name: string;
};

type HomeClientProps = {
  members: Member[];
  errorMessage?: string;
};

// Menampilkan halaman pemilihan anggota sebelum masuk ke halaman kas.
const HomeClient = ({ members, errorMessage }: HomeClientProps) => {
  const router = useRouter();
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  // Mengarahkan anggota ke halaman kas berdasarkan ID, bukan nama.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMemberId || isNavigating) return;

    setIsNavigating(true);
    router.push(`/kas/${encodeURIComponent(selectedMemberId)}`);
  };

  const hasMembers = members.length > 0;
  const isDisabled =
    !selectedMemberId || Boolean(errorMessage) || !hasMembers || isNavigating;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1e8] text-[#241a1a]">
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
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden border-2 border-[#241a1a] bg-[#fffaf2] px-2 py-1 text-[9px] font-black tracking-wider sm:inline-block">
              2026 / 2027
            </span>
            <a
              href="/login"
              className="border-2 border-[#241a1a] bg-[#fffaf2] px-2.5 py-2 text-[10px] font-black shadow-[3px_3px_0_#241a1a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#241a1a] focus-visible:outline-2 focus-visible:outline-[#550000] sm:px-3 sm:text-xs"
            >
              Login sebagai admin
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <section>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#550000]">
            XI PPLG 2 / Member Area
          </p>
          <h1 className="max-w-xl text-[3.4rem] font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">
            Siapa nama
            <br />
            <span className="text-[#550000]">kamu?</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#6f6262] sm:text-lg">
            Pilih nama kamu untuk melihat informasi dan status pembayaran kas
            kelas.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs font-bold text-[#6f6262]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#241a1a] bg-[#709663]" />
            akses anggota aktif
          </div>
        </section>

        <section
          className="relative rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9 overflow-hidden"
          aria-labelledby="member-picker-heading"
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rotate-12 border-[3px] border-[#241a1a] bg-[#550000] sm:h-32 sm:w-32"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="mb-7 flex items-center gap-3 border-b-2 border-dashed border-[#ddd0c7] pb-5">
              <span className="grid h-11 w-11 place-items-center border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000]">
                <UserRound size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#6f6262]">
                  Member check-in
                </p>
                <p className="mt-1 text-sm font-black">Identifikasi anggota</p>
              </div>
            </div>

            <h2
              id="member-picker-heading"
              className="text-2xl font-black tracking-[-0.05em] sm:text-3xl"
            >
              Siapa nama kamu?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6f6262]">
              Pilih nama yang sesuai dari daftar di bawah.
            </p>

            <form className="mt-7" onSubmit={handleSubmit}>
              <label
                htmlFor="member"
                className="mb-2 block text-sm font-extrabold"
              >
                Nama anggota
              </label>
              <select
                id="member"
                value={selectedMemberId}
                onChange={(event) => setSelectedMemberId(event.target.value)}
                disabled={Boolean(errorMessage) || !hasMembers || isNavigating}
                className="h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm font-bold outline-none transition focus:border-[#550000] focus:shadow-[4px_4px_0_#550000] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">
                  {errorMessage
                    ? "Daftar anggota tidak tersedia"
                    : hasMembers
                      ? "Pilih nama kamu"
                      : "Belum ada anggota"}
                </option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>

              {errorMessage ? (
                <p
                  className="mt-2 text-xs font-bold text-[#3d0000]"
                  role="alert"
                >
                  ! {errorMessage}
                </p>
              ) : (
                <p className="mt-2 text-xs text-[#6f6262]" aria-live="polite">
                  {selectedMemberId
                    ? "Nama dipilih. Lanjut ke halaman kas kamu."
                    : "Pilih nama terlebih dahulu untuk melanjutkan."}
                </p>
              )}

              <button
                type="submit"
                disabled={isDisabled}
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-[3px] border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[5px_5px_0_#241a1a] transition hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0_#241a1a] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isNavigating ? "Membuka halaman kas..." : "Lanjut ke kas"}
                {!isNavigating && <ArrowRight size={18} aria-hidden="true" />}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeClient;
