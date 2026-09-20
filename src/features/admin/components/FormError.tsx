"use client";

const FormError = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-1.5 text-xs font-bold text-[#3d0000]">! {message}</p>
  ) : null;

export default FormError;
