import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

type CardExpense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: {
    id: string;
    name: string;
  };
  installmentInfo?: string;
  isPaid?: boolean;
};

type CardExpensesReportResponse = {
  total: number;
  expenses: CardExpense[];
};

export function useCardExpensesReport(
  cardId: string,
  month: number,
  year: number
) {
  return useQuery<CardExpensesReportResponse>({
    queryKey: ["card-expenses-report", cardId, month, year],
    queryFn: () =>
      api
        .get("/report/card-expenses", {
          params: { cardId, month, year },
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(
            err?.response?.data?.message ||
              "Failed to fetch card expenses report"
          );
        }),
    enabled: !!cardId && !!month && !!year,
  });
}
