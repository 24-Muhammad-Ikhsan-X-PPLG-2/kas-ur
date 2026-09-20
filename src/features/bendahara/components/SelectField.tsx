"use client";

import { ReactNode, SelectHTMLAttributes } from "react";

const SelectField = ({
  label,
  error,
  children,
  ...props
}: {
  label: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) => (
  <div>
    <label htmlFor={props.id} className="mb-2 block text-sm font-extrabold">
      {label}
    </label>
    <select
      {...props}
      className={`h-12 w-full rounded-md border-[3px] border-[#241a1a] bg-white px-3 text-sm outline-none focus:border-[#550000] focus:shadow-[4px_4px_0_#550000] ${error ? "border-[#3d0000] bg-[#fff2f4]" : ""}`}
    >
      {children}
    </select>
    {error && (
      <p className="mt-1.5 text-xs font-bold text-[#3d0000]">! {error}</p>
    )}
  </div>
);
export default SelectField;
