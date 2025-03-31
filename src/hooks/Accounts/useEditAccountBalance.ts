import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "react-toastify";

export function useEditAccountBalance(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: editBalance, isPending: loading } = useMutation({
    mutationFn: ({ accountId, balance }: { accountId: string; balance: number }) => {
      return api.patch(`/accounts/${accountId}/edit-balance`, { balance });
    },
    onSuccess: () => {
      toast.success("Balance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("Error updating balance", error);
    },
  });

  return { editBalance, loading };
}
