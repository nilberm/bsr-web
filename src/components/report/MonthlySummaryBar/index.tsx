"use client";

import { useState } from "react";
import UnpaidExpensesModal from "../UnpaidExpensesModal";

interface MonthlyReportResponse {
  totalEarnings: number;
  totalExpenses: number;
  balance: number;
  transactions: {
    id: string;
    type: "expense" | "earning";
    isPaid?: boolean;
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
  }[];
}

export default function MonthlySummaryBar({
  data,
}: {
  data: MonthlyReportResponse;
}) {
  const { totalEarnings, totalExpenses, balance, transactions } = data;

  const formatted = (value: number) =>
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const balanceColor = balance >= 0 ? "text-green-500" : "text-red-500";

  const unpaidExpenses = transactions.filter(
    (tx) => tx.type === "expense" && !tx.isPaid
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full bg-white border-t border-zinc-200 rounded-t-md shadow-md">
      <div className="flex justify-around items-center py-4 text-sm">
        <div className="flex flex-col items-center">
          <p className="text-green-500 font-semibold">
            {formatted(totalEarnings)}
          </p>
          <span className="text-zinc-600 text-xs">earning</span>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-red-500 font-semibold">
            {formatted(totalExpenses)}
          </p>
          <span className="text-zinc-600 text-xs">expenses</span>
        </div>

        <div className="flex flex-col items-center">
          <p className={`${balanceColor} font-semibold`}>
            {formatted(balance)}
          </p>
          <span className="text-zinc-600 text-xs">balance</span>
        </div>
      </div>

      {unpaidExpenses.length > 0 && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Mark all as paid
          </button>
        </div>
      )}

      {unpaidExpenses.length !== 0 && (
        <UnpaidExpensesModal
          open={showModal}
          onCancel={() => setShowModal(false)}
          expenses={unpaidExpenses}
        />
      )}
    </div>
  );
}
