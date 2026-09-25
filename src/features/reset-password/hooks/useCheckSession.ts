"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";

const useCheckSession = () => {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);
  useEffect(() => {
    const checkRecoverySession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          setIsSessionValid(false);
          return;
        }

        setIsSessionValid(true);
      } catch (error) {
        console.error(error);
        setIsSessionValid(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkRecoverySession();
  }, []);
  return {
    // state
    isCheckingSession,
    isSessionValid,
    // function
    setIsSessionValid,
  };
};

export default useCheckSession;
