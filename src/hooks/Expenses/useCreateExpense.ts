import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateExpenseData {
  description: string;
  amount: number;
  accountId?: string;
  cardId?: string;
  categoryId: string;
  date?: string;
  type: "fixed" | "installments";
  installments?: number;
  recurrence?: "one-time" | "monthly";
}

export function useCreateExpense(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createExpense, isPending: loading } = useMutation({
    mutationFn: (data: CreateExpenseData) => api.post("/expenses", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });

      const date = variables.date ? new Date(variables.date) : new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      queryClient.invalidateQueries({ queryKey: ["monthly-report", month, year] });

      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error while creating expense:", error);
    },
  });

  return { createExpense, loading };
}
