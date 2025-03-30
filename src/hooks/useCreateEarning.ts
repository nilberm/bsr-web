import { api } from "@/services/api";
import { useState } from "react";

interface CreateEarningData {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: string;
}

export function useCreateEarning() {
  const [loading, setLoading] = useState(false);

  const createEarning = (data: CreateEarningData, onSuccess?: () => void) => {
    setLoading(true);

    api
      .post("/earnings", data)
      .then(() => {
        onSuccess?.();
      })
      .catch((err) => {
        console.error("Erro ao criar ganho:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { createEarning, loading };
}
