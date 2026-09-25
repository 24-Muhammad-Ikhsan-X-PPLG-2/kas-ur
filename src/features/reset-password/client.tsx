"use client";

import Link from "next/link";
import CheckingSession from "./components/CheckingSession";
import SessionNotValid from "./components/SessionNotValid";
import SuccessForm from "./components/SuccessForm";
import Form from "./components/Form";
import useCheckSession from "./hooks/useCheckSession";
import { useState } from "react";
import Header from "./components/Header";
import BgHiasan from "./components/BgHiasan";

const ResetPasswordClient = () => {
  const { isCheckingSession, isSessionValid, setIsSessionValid } =
    useCheckSession();
  const [isSuccess, setIsSuccess] = useState(false);

  if (isCheckingSession) {
    return <CheckingSession />;
  }

  if (!isSessionValid && !isSuccess) {
    return <SessionNotValid />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e8] px-5 py-6 text-[#241a1a] sm:px-10 sm:py-8 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(#d8ccc2_1px,transparent_1px),linear-gradient(90deg,#d8ccc2_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <Header />

      <section
        className="relative z-10 mx-auto grid min-h-[calc(100vh-132px)] max-w-6xl place-items-center py-10 sm:py-14"
        aria-label="Reset password Kas XI PPLG 2"
      >
        <BgHiasan />

        <div className="w-full max-w-[470px] rounded-[14px] border-[3px] border-[#241a1a] bg-[#fffaf2] p-6 shadow-[8px_8px_0_#241a1a] sm:p-9 sm:shadow-[11px_11px_0_#241a1a]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-[#ddd0c7] pb-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#6f6262]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#241a1a] bg-[#709663]" />{" "}
            keamanan akun
          </div>

          {isSuccess ? (
            <SuccessForm />
          ) : (
            <Form
              setIsSuccess={setIsSuccess}
              setIsSessionValid={setIsSessionValid}
            />
          )}
        </div>
      </section>

      <p className="relative z-10 -mt-5 text-center text-xs text-[#8b7b76]">
        Dibuat untuk kita, dikelola bersama.
      </p>
    </main>
  );
};

export default ResetPasswordClient;
