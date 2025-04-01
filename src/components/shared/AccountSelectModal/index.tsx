import React, { useState } from "react";

import { useAccounts, Account } from "@/hooks/Accounts/useAccounts";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface AccountSelectModalProps {
  value?: string;
  onChange: (accountId: string) => void;
}

export const AccountSelectModal: React.FC<AccountSelectModalProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const { accounts, loading } = useAccounts();

  const selectedAccount = accounts.find((account) => account.id === value);

  const handleSelect = (account: Account) => {
    onChange(account.id);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} type="button">
        {selectedAccount ? selectedAccount.name : "Select account"}
      </Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width="w-full max-w-md"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose an account</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
              {accounts.map((account) => (
                <Button
                  key={account.id}
                  variant={account.id === value ? "default" : "outline"}
                  className="w-full justify-between"
                  type="button"
                  onClick={() => handleSelect(account)}
                >
                  <span>{account.name}</span>
                  <span className="text-sm text-gray-500">
                    R$ {parseFloat(account.balance).toFixed(2)}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
