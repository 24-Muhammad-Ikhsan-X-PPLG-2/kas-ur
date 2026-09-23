"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

const useForm = () => {
  const router = useRouter();
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  // Mengarahkan anggota ke halaman kas berdasarkan ID, bukan nama.
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMemberId || isNavigating) return;

    setIsNavigating(true);
    router.push(`/kas/${encodeURIComponent(selectedMemberId)}`);
  };
  return {
    handleSubmit,
    setSelectedMemberId,
    selectedMemberId,
    isNavigating,
  };
};

export default useForm;
