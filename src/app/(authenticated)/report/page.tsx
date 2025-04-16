"use client";

import Header from "@/components/shared/Header";
import MonthSlider from "@/components/report/MonthSlider";
import TransactionList from "@/components/report/TransactionList";
import { useState } from "react";
import { useMonthlyReport } from "@/hooks/Report/useMonthlyReport";
import MonthlySummaryBar from "@/components/report/MonthlySummaryBar";

export default function Report() {
  const currentYear = new Date().getFullYear();
  const initialMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] =
    useState(initialMonthIndex);
  const selectedMonth = selectedMonthIndex;

  const { data, isLoading, error } = useMonthlyReport(
    selectedMonth,
    currentYear
  );

  return (
    <main className="flex flex-col h-screen w-full">
      <Header backBtn={false} pageName="Report" />
      <MonthSlider onChange={(index) => setSelectedMonthIndex(index)} />

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <p className="text-center text-gray-500 mt-4">
            Loading transactions...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-4">
            Failed to load report.
          </p>
        )}

        {!isLoading && data && data.transactions.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No transactions for this month.
          </p>
        )}

        {data && data.transactions.length > 0 && (
          <TransactionList transactions={data.transactions} />
        )}
      </div>

      {data && (
        <MonthlySummaryBar
          data={data}
        />
      )}
    </main>
  );
}
