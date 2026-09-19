"use client";

import { FC, useState } from "react";
import { Member } from "../types";
import ModalMemberPayment from "./ModalMemberPayment";

type Props = {
  member: Member[];
};

const MemberPaymentStatus: FC<Props> = ({ member }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <section className="mt-12" aria-labelledby="status-heading">
      <div className="mb-5">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#7a1f3d]">
          Class check
        </p>
        <h2
          id="status-heading"
          className="text-3xl font-black tracking-[-0.06em]"
        >
          Status Anggota
        </h2>
      </div>
      <div className="overflow-hidden rounded-lg border-[3px] border-[#171416] bg-[#fffdf8] shadow-[6px_6px_0_#171416]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-lg border-collapse text-left">
            <thead className="border-b-[3px] border-[#171416] bg-[#e6c1cc] text-[10px] font-black uppercase tracking-wide">
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
              {member.map((member, index) => (
                <tr
                  key={member.id}
                  className="border-b-2 border-[#ded5ca] bg-[#fffdf8] last:border-b-0"
                >
                  <td className="px-5 py-4 text-[#766d6e]">{index + 1}</td>
                  <th className="px-5 py-4 font-black" scope="row">
                    {member.name}
                  </th>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="rounded bg-[#7a1f3d] px-4 py-1 font-semibold text-white transition duration-200 hover:shadow-[3px_3px_0_#171416] focus-visible:outline-3 focus-visible:outline-[#171416]"
                    >
                      Cek
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
