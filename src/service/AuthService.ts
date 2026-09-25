"use client";
import { supabase } from "@/supabase/client";

class AuthService {
  static async login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        error,
        success: false,
      };
    }
    return {
      error: null,
      success: true,
    };
  }

  static async resetPassword(email: string) {
    const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      return {
        error,
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  }

  static async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return {
        error,
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return {
        error,
        success: false,
      };
    }
    return {
      error: null,
      success: true,
    };
  }
}

export default AuthService;
