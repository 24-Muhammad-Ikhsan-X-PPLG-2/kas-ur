"use client";

import { LoaderCircle } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase/client";
import { Member, Period } from "../types";
import ModalMemberPayment from "./ModalMemberPayment";

type Props = {
  member: Member[];
  periods: Period[];
};

type PaymentStatus = "paid" | "unpaid";

type PaymentRow = {
  member_id: string;
  period_id: number;
  amount: number;
};

// Menentukan status lunas berdasarkan nominal pembayaran dan nominal periode.
const getPaymentStatus = (
  payment: PaymentRow | undefined,
  period: Period,
): PaymentStatus => {
  const paidAmount = Number(payment?.amount ?? 0);
  const requiredAmount = Number(period.amount.replace(/[^0-9]/g, ""));

  return paidAmount >= requiredAmount ? "paid" : "unpaid";
};

const MemberPaymentStatus: FC<Props> = ({ member, periods }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedPeriodId, setSelectedPeriodId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | PaymentStatus>(
    "all",
  );
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Mengambil pembayaran terbaru langsung dari database.
  useEffect(() => {
    let isMounted = true;

    const loadPayments = async () => {
      setIsLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("cash_payments")
        .select("member_id, period_id, amount");

      if (!isMounted) return;

      if (error) {
        setErrorMessage("Data pembayaran gagal dimuat.");
        setPayments([]);
      } else {
        setPayments((data ?? []) as PaymentRow[]);
      }
      setIsLoading(false);
    };

    loadPayments();
    return () => {
      isMounted = false;
    };
  }, []);

  const paymentByMemberAndPeriod = useMemo(
    () =>
      new Map(
        payments.map((payment) => [
          `${String(payment.member_id)}:${Number(payment.period_id)}`,
          payment,
        ]),
      ),
    [payments],
  );

  const visibleMembers = useMemo(() => {
    const selectedPeriod = periods.find(
      (period) => String(period.id) === selectedPeriodId,
    );

    return member.filter((item) => {
      if (!selectedPeriod) {
        if (selectedStatus === "all") return true;

        const hasUnpaidPeriod = periods.some((period) => {
          const payment = paymentByMemberAndPeriod.get(
            `${String(item.id)}:${period.id}`,
          );
          return getPaymentStatus(payment, period) === "unpaid";
        });

        return (selectedStatus === "unpaid") === hasUnpaidPeriod;
      }

      const payment = paymentByMemberAndPeriod.get(
        `${String(item.id)}:${selectedPeriod.id}`,
      );
      const status = getPaymentStatus(payment, selectedPeriod);

      return selectedStatus === "all" || status === selectedStatus;
    });
  }, [
    member,
    periods,
    paymentByMemberAndPeriod,
    selectedPeriodId,
    selectedStatus,
  ]);

  return (
    <section className="mt-12" aria-labelledby="status-heading">
      <div className="mb-5">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#550000]">
          Class check
        </p>
        <h2
          id="status-heading"
          className="text-3xl font-black tracking-[-0.06em]"
        >
          Status Anggota
        </h2>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-extrabold">
          Periode
          <select
            value={selectedPeriodId}
            onChange={(event) => setSelectedPeriodId(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000]"
          >
            <option value="all">Semua periode</option>
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-extrabold">
          Status pembayaran
          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as "all" | PaymentStatus)
            }
            className="mt-2 h-11 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000]"
          >
            <option value="all">Semua status</option>
            <option value="paid">Sudah bayar</option>
            <option value="unpaid">Belum bayar</option>
          </select>
        </label>
      </div>
      <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] shadow-[6px_6px_0_#241a1a]">
        {isLoading ? (
          <div className="flex min-h-32 items-center justify-center gap-2 text-sm font-bold text-[#6f6262]">
            <LoaderCircle size={18} className="animate-spin text-[#550000]" />
            Memuat status pembayaran...
          </div>
        ) : errorMessage ? (
          <p className="p-5 text-sm font-bold text-[#3d0000]" role="alert">
            ! {errorMessage}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-lg border-collapse text-left">
              <thead className="border-b-[3px] border-[#241a1a] bg-[#ead6d1] text-[10px] font-black uppercase tracking-wide">
                <tr>
                  <th className="w-16 px-5 py-3" scope="col">
                    No
                  </th>
                  <th className="px-5 py-3" scope="col">
                    Anggota
                  </th>
                  <th className="px-5 py-3 text-right" scope="col">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className="border-b-2 border-[#ddd0c7] bg-[#fffaf2] last:border-b-0"
                  >
                    <td className="px-5 py-4 text-[#6f6262]">{index + 1}</td>
                    <th className="px-5 py-4 font-black" scope="row">
                      {member.name}
                    </th>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        className="rounded bg-[#550000] px-4 py-1 font-semibold text-white transition duration-200 hover:shadow-[3px_3px_0_#241a1a] focus-visible:outline-3 focus-visible:outline-[#241a1a]"
                      >
                        Cek
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleMembers.length === 0 && (
              <p className="p-5 text-center text-sm text-[#6f6262]">
                Tidak ada anggota yang sesuai filter.
              </p>
            )}
          </div>
        )}
      </div>
      {selectedMember && (
        <ModalMemberPayment
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
};
export default MemberPaymentStatus;
