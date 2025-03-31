import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

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
      console.error("Error while creating earning:", error);
    },
  });

  return { createEarning, loading };
}
