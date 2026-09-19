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
      className={`h-12 w-full rounded-md border-[3px] border-[#171416] bg-white px-3 text-sm outline-none focus:border-[#7a1f3d] focus:shadow-[4px_4px_0_#7a1f3d] ${error ? "border-[#59142e] bg-[#fff2f4]" : ""}`}
    >
      {children}
    </select>
    {error && (
      <p className="mt-1.5 text-xs font-bold text-[#59142e]">! {error}</p>
    )}
  </div>
);
export default SelectField;
