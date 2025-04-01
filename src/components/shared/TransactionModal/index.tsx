"use client";

import { useState } from "react";
import EarningForm from "./EarningForm";
import ExpenseForm from "./ExpenseForm";
import Modal from "@/components/ui/Modal";

interface TransactionModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function TransactionModal({
  open,
  onCancel,
}: TransactionModalProps) {
  const [selectedTab, setSelectedTab] = useState<"expense" | "earning">(
    "expense"
  );

  const backgroundClass =
    selectedTab === "expense" ? "bg-red-500" : "bg-green-500";

  return (
    <Modal open={open} onCancel={onCancel} width="w-[50rem]">
      <div className={`rounded-t-lg ${backgroundClass} text-white`}>
        <div className="flex justify-around px-6 pt-6 border-b border-white/30">
          <button
            onClick={() => setSelectedTab("expense")}
            className={`text-lg font-semibold pb-2 relative transition-all ${
              selectedTab === "expense"
                ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setSelectedTab("earning")}
            className={`text-lg font-semibold pb-2 relative transition-all ${
              selectedTab === "earning"
                ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            Earning
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-b-lg">
        {selectedTab === "expense" ? (
          <ExpenseForm onSuccess={onCancel}/>
        ) : (
          <EarningForm onSuccess={onCancel} />
        )}
      </div>
    </Modal>
  );
}
