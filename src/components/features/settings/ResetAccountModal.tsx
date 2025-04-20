"use client";

import Modal from "@/components/ui/Modal";
import { useResetUserData } from "@/hooks/Settings/useResetUserData";
import { useState } from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
}

const CONFIRM_TEXT = "delete my data";

export default function ResetAccountModal({ open, onCancel }: Props) {
  const [input, setInput] = useState("");
  const { reset, loading } = useResetUserData(onCancel);

  const isConfirmed = input.trim().toLowerCase() === CONFIRM_TEXT;

  return (
    <Modal open={open} onCancel={onCancel} width="w-[32rem] p-4">
      <div className="space-y-4">
        <p className="text-sm text-zinc-700">
          This action will permanently delete all your accounts, cards, expenses, and earnings.
          <br />
          To confirm, type <strong>{CONFIRM_TEXT}</strong> below.
        </p>

        <input
          type="text"
          placeholder={`Type "${CONFIRM_TEXT}" to confirm`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-zinc-300 rounded p-2 text-sm"
        />

        <button
          disabled={!isConfirmed || loading}
          onClick={reset}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset My Account"}
        </button>
      </div>
    </Modal>
  );
}
