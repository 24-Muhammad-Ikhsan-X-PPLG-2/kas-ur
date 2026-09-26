"use client";

const DekorasiPage = () => {
  return (
    <>
      <div className="absolute left-[4%] top-[13%] hidden rotate-[-4deg] border-2 border-[#241a1a] bg-[#241a1a] p-3 font-mono text-[10px] text-[#d6e7b8] shadow-[5px_5px_0_#241a1a] lg:grid">
        <span className="text-[#d99c92]">&gt; status kas</span>
        <b>all systems okay_</b>
      </div>
      <div className="absolute right-[9%] top-[17%] hidden rotate-6 border-2 border-[#241a1a] bg-[#fffaf2] px-3 py-2 text-[11px] leading-tight text-[#550000] shadow-[5px_5px_0_#241a1a] lg:block">
        Jangan lupa
        <br />
        <strong className="text-sm">bayar kas.</strong>
      </div>
      <div className="absolute bottom-[14%] left-[11%] hidden rotate-3 border-2 border-[#241a1a] bg-[#fffaf2] px-2.5 py-2 font-mono text-[10px] text-[#6f6262] shadow-[4px_4px_0_#241a1a] lg:block">
        &#123; kas: <b className="text-[#3f6b4a]">active</b> &#125;
      </div>
      <div className="absolute bottom-[13%] right-[12%] hidden h-[70px] w-[108px] rotate-[-5deg] border-2 border-[#241a1a] bg-[#e7d0cc] px-2 pt-4 shadow-[4px_4px_0_#241a1a] lg:block">
        <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full border border-[#241a1a] bg-[#550000]" />
        <span className="absolute left-5 top-2 h-1.5 w-1.5 rounded-full border border-[#241a1a] bg-[#550000]" />
        <span className="absolute left-8 top-2 h-1.5 w-1.5 rounded-full border border-[#241a1a] bg-[#550000]" />
        <span className="font-mono text-[9px] font-bold">classroom.exe</span>
      </div>
    </>
  );
};

export default DekorasiPage;
