"use client";

import { supabase } from "@/supabase/client";
import { toast } from "react-toastify";

const TestPage = () => {
  const handleClick = async () => {
    const toastId = toast.loading("Wait...");
    const { error } = await supabase.auth.signUp({
      email: "ikhsanm181209@gmail.com",
      password: "ikhsan123",
      options: {
        data: {
          email: "ikhsanm181209@gmail.com",
          username: "ikhsanytc",
          role: "admin",
        },
      },
    });
    if (error) {
      console.error(error);
      toast.update(toastId, {
        render: error.message,
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
      return;
    }
    toast.update(toastId, {
      render: "Success",
      autoClose: 3000,
      isLoading: false,
      type: "success",
    });
  };
  return (
    <div>
      <button onClick={handleClick}>click plis</button>
    </div>
  );
};

export default TestPage;
