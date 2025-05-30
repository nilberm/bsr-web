"use client";

import { useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import ExpenseDetailModal from "@/components/shared/ExpenseDetailModal";

type Transaction = {
  id: string;
  type: "expense" | "earning";
  description: string;
  amount: number;
  date: string;
  isPaid: boolean;
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

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  const grouped = transactions.reduce<Record<string, Transaction[]>>(
    (acc, tx) => {
      const date = new Date(tx.date);

      let label: string;
      if (isToday(date)) {
        label = "today";
      } else if (isYesterday(date)) {
        label = "yesterday";
      } else {
        label = format(date, "MM/dd");
      }

      if (!acc[label]) acc[label] = [];
      acc[label].push(tx);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col bg-zinc-50">
      {Object.entries(grouped).map(([dateLabel, group]) => (
        <div key={dateLabel} className="px-4 py-2">
          <p className="text-sm text-slate-700 font-medium mb-2">
            {dateLabel}
          </p>

          <div className="flex flex-col divide-y">
            {group.map((transaction) => {
              const isExpense = transaction.type === "expense";
              const sourceName =
                transaction.account?.name ||
                transaction.card?.name ||
                "Unknown";

              const formattedAmount = `${
                isExpense ? "-" : ""
              }${transaction.amount.toFixed(2).replace(".", ",")}`;

              return (
                <div
                  key={transaction.id}
                  onClick={() =>
                    isExpense ? setSelectedExpenseId(transaction.id) : null
                  }
                  className="flex items-center justify-between py-3 cursor-pointer hover:bg-zinc-100 transition-colors rounded"
                >
                  <div className="flex items-center gap-3">
                    {/* Category icon placeholder */}
                    <div className="w-8 h-8 rounded-full bg-zinc-300" />

                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-zinc-800">
                        {transaction.category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {sourceName}
                        {transaction.installmentInfo
                          ? ` • ${transaction.installmentInfo}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={isExpense ? "text-red-600" : "text-green-600"}
                    >
                      {formattedAmount}
                    </p>
                    <span className="text-xs text-gray-400">{transaction.isPaid ? "paid" : "not paid"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <ExpenseDetailModal
        open={!!selectedExpenseId}
        onClose={() => setSelectedExpenseId(null)}
        expenseId={selectedExpenseId ?? ""}
      />
    </div>
  );
}
