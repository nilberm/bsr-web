"use client";

import Image from "next/image";
import logoImage from "@/assets/logo/logo_full.svg";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  useAuth();

  return (
    <main className="bg-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-zinc-50 rounded-xl p-8 animate-showImageSlow">
        <Image src={logoImage} alt="logo" />
      </div>
    </main>
  );
}
