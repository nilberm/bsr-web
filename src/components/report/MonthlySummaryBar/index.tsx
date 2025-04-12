"use client";

interface MonthlySummaryBarProps {
  earnings: number;
  expenses: number;
  balance: number;
}

export default function MonthlySummaryBar({
  earnings,
  expenses,
  balance,
}: MonthlySummaryBarProps) {
  const formatted = (value: number) =>
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const balanceColor = balance >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="w-full bg-white border-t border-zinc-200 rounded-t-md shadow-md">
      <div className="flex justify-around items-center py-4 text-sm">
        <div className="flex flex-col items-center">
          <p className="text-green-500 font-semibold">{formatted(earnings)}</p>
          <span className="text-zinc-600 text-xs">earning</span>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-red-500 font-semibold">{formatted(expenses)}</p>
          <span className="text-zinc-600 text-xs">expenses</span>
        </div>

        <div className="flex flex-col items-center">
          <p className={`${balanceColor} font-semibold`}>
            {formatted(balance)}
          </p>
          <span className="text-zinc-600 text-xs">balance</span>
        </div>
      </div>
    </div>
  );
}
