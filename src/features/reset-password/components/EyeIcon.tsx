"use client";
import { Eye, EyeClosed } from "lucide-react";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  return visible ? <Eye size={22} /> : <EyeClosed size={22} />;
};

export default EyeIcon;
