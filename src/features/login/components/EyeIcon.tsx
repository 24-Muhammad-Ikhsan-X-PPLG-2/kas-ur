"use client";

import { Eye, EyeClosed } from "lucide-react";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  if (visible) {
    return <Eye size={24} />;
  }
  return <EyeClosed size={24} />;
};

export default EyeIcon;
