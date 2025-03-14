"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";

import logoImage from "@/assets/logo/logo_full.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "@/services/api";
export default function Home() {
  const router = useRouter();

  const isValidToken = async (token: string) => {
    const request = {
      access_token: token,
    };

    await api
      .post("validate-token", request)
      .then((res) => {
        if (res.data?.valid) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      isValidToken(token);
    } else {
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <main className="bg-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-zinc-50 rounded-xl p-8 animate-showImageSlow">
        <Image src={logoImage} alt="logo" />
      </div>
    </main>
  );
}
