import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";

export function useEditAccountBalance(refetch?: () => void) {
  const [loading, setLoading] = useState(false);

  const editBalance = (
    accountId: string,
    balance: number,
    onSuccess?: () => void
  ) => {
    setLoading(true);
    api
      .patch(`/accounts/${accountId}/edit-balance`, { balance })
      .then(() => {
        toast.success("Balance updated successfully");

        if (refetch) refetch();
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        console.error("Error updating balance", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { editBalance, loading };
}
