/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (data: LoginData) => {
    setLoading(true);

    try {
      const response = await api.post("login", data);
      localStorage.setItem("jwtToken", response.data.access_token);
      router.push("/home");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
