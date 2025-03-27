import { useState, useEffect } from "react";
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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = () => {
    setLoading(true);
    setError(null);

    api
      .get<Account[]>("/accounts")
      .then((response) => {
        const sortedAccounts = response.data.sort((a, b) =>
          b.isDefault ? 1 : -1
        );
        setAccounts(sortedAccounts);

        const total = sortedAccounts.reduce(
          (sum, account) => sum + parseFloat(account.balance),
          0
        );
        setTotalBalance(total);
      })
      .catch((err) => {
        setError("Error fetching accounts");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, totalBalance, loading, error, refetch: fetchAccounts };
};
