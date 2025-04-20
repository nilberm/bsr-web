"use client";

import { useRouter } from "next/navigation";
import ResetAccountModal from "./ResetAccountModal";
import { useState } from "react";

export default function DataActions() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-md shadow-md p-6 mx-auto w-full flex flex-col gap-4 items-center">
      <button
        onClick={() => router.push("/settings/categories")}
        className="w-full bg-zinc-100 text-zinc-800 py-2 rounded hover:bg-zinc-200 transition max-w-[300px]"
      >
        Manage Categories
      </button>

      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition max-w-[300px]"
      >
        Reset Account
      </button>

      <ResetAccountModal
        open={showModal}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
