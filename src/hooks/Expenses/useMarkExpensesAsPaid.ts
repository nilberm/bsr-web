import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

export function useMarkExpensesAsPaid(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const markAsPaid = (expenseIds: string[]) => {
    setLoading(true);

    api
      .patch("/expenses/pay", { expenseIds })
      .then(() => {
        toast.success("Expenses marked as paid");
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        toast.error("Failed to mark expenses as paid");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { markAsPaid, loading };
}
