"use client";

import { LoaderCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Modal from "@/features/admin/components/Modal";
import { Member } from "../types";
import { supabase } from "@/supabase/client";
import { formatTime, getBillingStatus } from "@/utils/client";

type Props = {
  member: Member;
  onClose: () => void;
};

type UnpaidPeriod = {
  period_id: number;
  amount: number;
  start_date: string;
  end_date: string;
};

function getLabel(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = end.toLocaleDateString("id-ID", {
    month: "long",
  });

  return `${start.getDate()}-${end.getDate()} ${month} ${end.getFullYear()}`;
}

const ModalMemberPayment: FC<Props> = ({ member, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [unpaidPeriods, setUnpaidPeriods] = useState<UnpaidPeriod[]>([]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    (async () => {
      const { data } = await supabase.rpc("get_unpaid_periods", {
        p_member_id: member.id,
      });
      if (mounted) {
        setUnpaidPeriods(data);
        setIsLoading(false);
      }
      return () => {
        mounted = false;
      };
    })();
  }, [member.id]);

  return (
    <Modal
      title={`Tunggakan ${member.name}`}
      description="Daftar periode kas yang belum dibayar oleh anggota ini."
      onClose={onClose}
    >
      {isLoading ? (
        <div
          className="flex min-h-40 items-center justify-center gap-3 text-sm font-bold text-[#6f6262]"
          role="status"
          aria-live="polite"
        >
          <LoaderCircle
            size={20}
            className="animate-spin text-[#550000]"
            aria-hidden="true"
          />
          Memuat data tunggakan...
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border-[3px] border-[#241a1a]">
          <table className="w-full border-collapse text-left">
            <thead className="border-b-[3px] border-[#241a1a] bg-[#ead6d1] text-[10px] font-black uppercase tracking-wide">
              <tr>
                <th className="w-16 px-4 py-3" scope="col">
                  No
                </th>
                <th className="px-4 py-3" scope="col">
                  Periode / Minggu
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {unpaidPeriods.map((period, index) => (
                <tr
                  key={period.period_id}
                  className="border-b-2 border-[#ddd0c7] last:border-b-0"
                >
                  <td className="px-4 py-3 text-[#6f6262]">{index + 1}</td>
                  <th className="px-4 py-3 font-black" scope="row">
                    {getLabel(period.start_date, period.end_date)}
                  </th>
                  <td>
                    {getBillingStatus(period.start_date, period.end_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};

export default ModalMemberPayment;
