import { useState, useEffect } from "react";
import { api } from "@/services/api";

export interface Account {
  id: string;
  name: string;
  initialBalance: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Account[]>("/accounts");

      const sortedAccounts = response.data.sort((a, b) => {
        return b.isDefault ? 1 : -1;
      });

      setAccounts(sortedAccounts);

      const total = sortedAccounts.reduce((sum, account) => {
        return sum + parseFloat(account.initialBalance);
      }, 0);

      setTotalBalance(total);
    } catch (err) {
      setError("Error fetching accounts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, totalBalance, loading, error, refetch: fetchAccounts };
};
