import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface AccountFormValues {
  name: string;
  balance: number;
  type: string;
}

export function useCreateAccount(refetch?: () => void) {
  const [loading, setLoading] = useState(false);

  const createAccount = (data: AccountFormValues, onCancel: () => void) => {
    setLoading(true);

    const request = {
      name: data.name,
      balance: Number(data.balance),
      type: data.type,
    };

    api
      .post("accounts", request)
      .then(() => {
        toast.success("Account created successfully");
        onCancel();
        if (refetch) {
          refetch();
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "An error occurred while creating the account. Please try again"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { createAccount, loading };
}
