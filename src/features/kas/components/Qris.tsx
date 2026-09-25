"use client";
const Qris = () => {
  const pattern = [
    "111111100101101111111",
    "100000101110101000001",
    "101110100010101011101",
    "101110101111101011101",
    "101110100101101011101",
    "100000101010101000001",
    "111111101010101111111",
    "000000001101100000000",
    "101101111001011011101",
    "010011001110100110010",
    "111010111011111000111",
    "001101000110001101100",
    "111111101101110101011",
    "100000101011011100101",
    "101110101110101110111",
    "101110100011100011001",
    "101110101101011101101",
    "100000101100110010011",
    "111111101011101111111",
  ];

  return (
    <div className="border-[3px] border-[#241a1a] bg-white p-3 shadow-[5px_5px_0_#241a1a]">
      <div className="grid aspect-square w-full grid-cols-[repeat(21,1fr)] gap-[2px] bg-white">
        {pattern.flatMap((row, rowIndex) =>
          [...row].map((cell, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              className={cell === "1" ? "bg-[#241a1a]" : "bg-white"}
            />
          )),
        )}
      </div>
      <p className="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-wider text-[#6f6262]">
        Belum bisa digunakan
      </p>
    </div>
  );
};
export default Qris;
