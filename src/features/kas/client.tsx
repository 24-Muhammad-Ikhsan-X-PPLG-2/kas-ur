"use client";

import { KasClientProps } from "./type";
import Navbar from "./components/Navbar";
import HeaderKas from "./components/HeaderKas";
import SectionNextpayment from "./components/SectionNextpayment";
import SectionPaymentCheck from "./components/SectionPaymentCheck";
import SectionQris from "./components/SectionQris";
import Note from "./components/Note";
import Footer from "./components/Footer";

const KasClient = ({
  username,
  nextPayment,
  paymentSchedule,
}: KasClientProps) => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#241a1a]">
      <Navbar username={username} />

      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <HeaderKas />

        <SectionNextpayment nextPayment={nextPayment} />

        <SectionPaymentCheck paymentSchedule={paymentSchedule} />

        <SectionQris />

        <Note />
      </div>

      <Footer />
    </main>
  );
};

export default KasClient;
