"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/apis/userApi";

const AuthProvider = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const uid = localStorage.getItem("uid");

        if (!token || !uid) {
          await logoutUser();
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [router]);

  return null; // No UI
};

export default AuthProvider;
