import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

interface CreateExpenseData {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: string;
}

export function useCreateExpense(onSuccessCallback?: () => void) {
  const { mutate: createExpense, isPending: loading } = useMutation({
    mutationFn: (data: CreateExpenseData) => api.post("/expenses", data),
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error while creating expense:", error);
    },
  });

  return { createExpense, loading };
}
