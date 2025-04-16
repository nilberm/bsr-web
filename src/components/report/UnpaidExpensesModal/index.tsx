"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { format } from "date-fns";
import { useMarkExpensesAsPaid } from "@/hooks/Expenses/useMarkExpensesAsPaid";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: {
    id: string;
    name: string;
  };
  account?: {
    id: string;
    name: string;
  };
  card?: {
    id: string;
    name: string;
  };
  installmentInfo?: string;
};

interface Props {
  open: boolean;
  onCancel: () => void;
  expenses: Expense[];
}

export default function UnpaidExpensesModal({
  open,
  onCancel,
  expenses,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const { markAsPaid, loading } = useMarkExpensesAsPaid(onCancel);

  useEffect(() => {
    if (open) {
      setSelected(expenses.map((e) => e.id));
    }
  }, [open, expenses]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (selected.length > 0) {
      markAsPaid(selected);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} width="w-[32rem]">
      <div className="max-h-[400px] overflow-y-auto space-y-4 mt-4 px-4">
        {expenses.map((expense) => (
          <label
            key={expense.id}
            className="flex justify-between items-start gap-2 border-b pb-2 cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selected.includes(expense.id)}
                onChange={() => toggleSelection(expense.id)}
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-zinc-800">
                  {expense.description}
                </span>
                <span className="text-xs text-zinc-500">
                  {expense.category.name} •{" "}
                  {expense.account?.name || expense.card?.name || "N/A"}
                </span>
                <span className="text-xs text-zinc-400">
                  {format(new Date(expense.date), "PPP")}
                </span>
              </div>
            </div>

            <p className="text-red-500 font-semibold text-sm">
              R$ {expense.amount.toFixed(2)}
            </p>
          </label>
        ))}
      </div>

      <div className="px-4 pt-4 pb-5">
        <button
          disabled={loading || selected.length === 0}
          onClick={handleConfirm}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Marking..." : "Mark selected as paid"}
        </button>
      </div>
    </Modal>
  );
}
