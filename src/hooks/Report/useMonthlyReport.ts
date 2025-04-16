import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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

type MonthlyReportResponse = {
  totalEarnings: number;
  totalExpenses: number;
  balance: number;
  transactions: Transaction[];
};

export function useMonthlyReport(month: number, year: number) {
  return useQuery<MonthlyReportResponse>({
    queryKey: ["monthly-report", month, year],
    queryFn: () =>
      api
        .get("/report/monthly", {
          params: { month, year },
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(
            err?.response?.data?.message || "Failed to fetch monthly report"
          );
        }),
    enabled: !!month && !!year,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });
}

