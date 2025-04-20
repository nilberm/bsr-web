"use client";

import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPhoto from "@/assets/home/userPhoto.png";

export default function SettingsMenu() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full bg-zinc-50 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="rounded-full w-full flex items-center justify-center">
        <Image src={userPhoto} alt="User photo" />
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={() => router.push("/settings/profile")}
      >
        Edit Profile
      </button>

      <div className="w-full border-t border-zinc-200" />

      <div className="flex flex-col w-full gap-3">
        <button
          className="w-full bg-zinc-100 text-zinc-800 py-2 rounded hover:bg-zinc-200 transition"
          onClick={() => router.push("/settings/preferences")}
        >
          Preferences
        </button>

        <button
          className="w-full bg-zinc-100 text-zinc-800 py-2 rounded hover:bg-zinc-200 transition"
          onClick={() => router.push("/settings/data-management")}
        >
          Data Management
        </button>
      </div>
    </div>
  );
}
