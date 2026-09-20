"use client";
type SummaryCardProps = { label: string; value: string; accent?: boolean };

const SummaryCard = ({ label, value, accent }: SummaryCardProps) => (
  <article className="rounded-lg border-[3px] border-[#241a1a] bg-[#fffaf2] p-4 shadow-[5px_5px_0_#241a1a]">
    <div
      className={`mb-6 h-2 w-12 ${accent ? "bg-[#550000]" : "bg-[#ead6d1]"}`}
      aria-hidden="true"
    />
    <p className="text-xs font-bold uppercase tracking-wide text-[#6f6262]">
      {label}
    </p>
    <p
      className={`mt-2 text-3xl font-black tracking-[-0.06em] ${accent ? "text-[#550000]" : "text-[#241a1a]"}`}
    >
      {value}
    </p>
  </article>
);
export default SummaryCard;
