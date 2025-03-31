/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface AccountFormValues {
  name: string;
  balance: number;
  type: string;
}

export function useCreateAccount(onCancel: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createAccount, isPending: loading } = useMutation({
    mutationFn: (data: AccountFormValues) => {
      const request = {
        name: data.name,
        balance: Number(data.balance),
        type: data.type,
      };

      return api.post("accounts", request);
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      onCancel();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the account. Please try again"
      );
    },
  });

  return { createAccount, loading };
}
