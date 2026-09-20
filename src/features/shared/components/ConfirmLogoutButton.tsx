"use client";

import { LogOut, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/service/AuthService";

type ConfirmLogoutButtonProps = {
  className: string;
};

// Menampilkan tombol keluar dengan konfirmasi sebelum sesi diakhiri.
const ConfirmLogoutButton = ({ className }: ConfirmLogoutButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Membuka modal dan membersihkan pesan error sebelumnya.
  const openModal = () => {
    setErrorMessage("");
    setIsOpen(true);
  };

  // Menutup modal selama proses logout belum berjalan.
  const closeModal = () => {
    if (!isLoggingOut) setIsOpen(false);
  };

  // Mengakhiri sesi lalu mengarahkan user kembali ke halaman login.
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setErrorMessage("");

    const result = await AuthService.logout();
    if (!result.success) {
      setErrorMessage(result.error?.message ?? "Gagal keluar dari akun.");
      setIsLoggingOut(false);
      return;
    }

    router.replace("/login");
  };

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label="Keluar dari akun"
        onClick={openModal}
      >
        <LogOut size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Keluar</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#241a1a]/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
        >
          <div className="w-full max-w-md rounded-xl border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[9px_9px_0_#241a1a] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#550000]">
                  Konfirmasi akun
                </p>
                <h2
                  id="logout-dialog-title"
                  className="text-3xl font-black tracking-[-0.07em]"
                >
                  Yakin ingin keluar?
                </h2>
                <p className="mt-2 text-sm text-[#6f6262]">
                  Sesi kamu akan diakhiri dan kamu perlu login lagi untuk masuk.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isLoggingOut}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-[#241a1a] bg-[#ead6d1] text-[#550000] shadow-[3px_3px_0_#241a1a] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Tutup konfirmasi keluar"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {errorMessage && (
              <p
                className="mt-5 border-2 border-[#3d0000] bg-[#fff2f4] p-3 text-xs font-bold text-[#3d0000]"
                role="alert"
              >
                ! {errorMessage}
              </p>
            )}

            <div className="mt-7 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={isLoggingOut}
                className="min-h-11 border-2 border-[#241a1a] bg-[#fffaf2] px-4 text-sm font-black shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Tidak
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="min-h-11 border-2 border-[#241a1a] bg-[#550000] px-4 text-sm font-black text-[#fffaf2] shadow-[3px_3px_0_#241a1a] transition active:translate-x-0.75 active:translate-y-0.75 active:shadow-none disabled:cursor-wait disabled:opacity-70"
              >
                {isLoggingOut ? "Keluar..." : "Iya, keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmLogoutButton;
