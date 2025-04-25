import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateEarningData {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: string;
}

export function useCreateEarning(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createEarning, isPending: loading } = useMutation({
    mutationFn: (data: CreateEarningData) => api.post("/earnings", data),
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
      console.error("Error while creating earning:", error);
    },
  });

  return { createEarning, loading };
}
