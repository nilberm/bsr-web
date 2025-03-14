"use client";

import { useRouter } from "next/navigation";

export default function FinishedRegistration() {
  const router = useRouter();
  return (
    <main className="w-full md:w-[55%] h-screen p-4 md:p-8 flex justify-center items-center flex-col gap-4 md:gap-8">
      <h1 className="text-xl md:text-2xl font-bold">
        Registration completed successfully
      </h1>
      <button
        type="button"
        onClick={() => router.push("/home")}
        className="bg-green-500 text-blue-950 font-bold py-2 md:py-3 w-full md:w-[30%] rounded-md flex justify-center items-center gap-2 md:gap-3 hover:bg-green-700 transition-all duration-100 ease-in-out"
      >
        Enter
      </button>
    </main>
  );
}
