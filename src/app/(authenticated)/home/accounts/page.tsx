"use client";

import Header from "@/components/Header";
import AccountInfo from "@/components/Home/Accounts/AccountInfo";
import { useAccounts } from "@/hooks/useAccounts";

export default function Accounts() {
  const { accounts, loading, error } = useAccounts();

  return (
    <div className="flex flex-col w-full">
      <Header backBtn={true} pageName="Accounts" />

      <div className="flex flex-col w-full p-8">
        {loading ? (
          <p>Loading accounts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <AccountInfo key={account.id} account={account} />
              ))
            ) : (
              <p className="text-gray-500">No accounts found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
