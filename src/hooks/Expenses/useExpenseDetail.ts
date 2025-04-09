import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type ExpenseDetailResponse = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "fixed" | "installments";
  recurrence?: "one-time" | "monthly";
  recurrenceGroupId?: string;
  recurrenceEndDate?: string;
  installmentNumber?: number;
  installmentTotal?: number;
  installmentGroupId?: string;
  account?: {
    id: string;
    name: string;
  };
  card?: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export function useExpenseDetail(expenseId: string, enabled: boolean = true) {
  return useQuery<ExpenseDetailResponse>({
    queryKey: ["expense-detail", expenseId],
    queryFn: () =>
      api
        .get(`/expenses/${expenseId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(
            err?.response?.data?.message || "Failed to fetch expense detail"
          );
        }),
    enabled: !!expenseId && enabled,
  });
}
