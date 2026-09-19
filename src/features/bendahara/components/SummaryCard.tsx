"use client";
type SummaryCardProps = { label: string; value: string; accent?: boolean };

const SummaryCard = ({ label, value, accent }: SummaryCardProps) => (
  <article className="rounded-lg border-[3px] border-[#171416] bg-[#fffdf8] p-4 shadow-[5px_5px_0_#171416]">
    <div
      className={`mb-6 h-2 w-12 ${accent ? "bg-[#7a1f3d]" : "bg-[#e6c1cc]"}`}
      aria-hidden="true"
    />
    <p className="text-xs font-bold uppercase tracking-wide text-[#766d6e]">
      {label}
    </p>
    <p
      className={`mt-2 text-3xl font-black tracking-[-0.06em] ${accent ? "text-[#7a1f3d]" : "text-[#171416]"}`}
    >
      {value}
    </p>
  </article>
);
export default SummaryCard;
