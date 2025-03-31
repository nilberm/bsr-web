import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

interface CreateEarningData {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: string;
}

export function useCreateEarning(onSuccessCallback?: () => void) {
  const { mutate: createEarning, isPending: loading } = useMutation({
    mutationFn: (data: CreateEarningData) => api.post("/earnings", data),
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Erro ao criar ganho:", error);
    },
  });

  return { createEarning, loading };
}
