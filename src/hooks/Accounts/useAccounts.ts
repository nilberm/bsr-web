import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export interface Account {
  id: string;
  name: string;
  balance: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useAccounts = () => {
  const {
    data: accounts = [],
    isLoading: loading,
    isError,
    refetch,
  } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: () =>
      api
        .get<Account[]>("/accounts")
        .then((res) =>
          res.data.sort((a, b) => (b.isDefault ? 1 : -1))
        )
        .catch(() => {
          throw new Error("Error fetching accounts");
        }),
  });

  const totalBalance = accounts.reduce(
    (sum, account) => sum + parseFloat(account.balance),
    0
  );

  return {
    accounts,
    totalBalance,
    loading,
    error: isError ? "Error fetching accounts" : null,
    refetch,
  };
};
