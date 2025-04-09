"use client";

import Header from "@/components/shared/Header";
import MonthSlider from "@/components/report/MonthSlider";
import TransactionList from "@/components/report/TransactionList";
import { useState } from "react";
import { useMonthlyReport } from "@/hooks/Report/useMonthlyReport";

export default function Report() {
  const currentYear = new Date().getFullYear();
  const initialMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] =
    useState(initialMonthIndex);
  const selectedMonth = selectedMonthIndex + 1;

  const { data, isLoading, error } = useMonthlyReport(
    selectedMonth,
    currentYear
  );

  return (
    <main className="flex flex-col w-full">
      <Header backBtn={false} pageName="Report" />
      <MonthSlider onChange={(index) => setSelectedMonthIndex(index)} />

      <div>
        {isLoading && (
          <p className="text-center text-gray-500">Loading transactions...</p>
        )}

        {error && (
          <p className="text-center text-red-600">Failed to load report.</p>
        )}

        {!isLoading && data && data.transactions.length === 0 && (
          <p className="text-center text-gray-500">
            No transactions for this month.
          </p>
        )}

        {data && data.transactions.length > 0 && (
          <TransactionList transactions={data.transactions} />
        )}
      </div>
    </main>
  );
}
