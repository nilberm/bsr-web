"use client";

import Header from "@/components/Header";
import AccountInfo from "@/components/Home/Accounts/AccountInfo";
import ModalAccountCreation from "@/components/Home/Accounts/ModalAccountCreation";
import { useAccounts } from "@/hooks/Accounts/useAccounts";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function Accounts() {
  const { accounts, loading, error, refetch } = useAccounts();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <Header
        backBtn={true}
        pageName="Accounts"
        actionBtn={
          <button
            type="button"
            onClick={() => setModalVisible(true)}
            className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-110"
          >
            <FaPlus />
          </button>
        }
      />

      <div className="flex flex-col w-full p-8">
        {loading ? (
          <p>Loading accounts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <AccountInfo
                  key={account.id}
                  account={account}
                  refetch={refetch}
                />
              ))
            ) : (
              <p className="text-gray-500">No accounts found</p>
            )}

            <ModalAccountCreation
              open={isModalVisible}
              onCancel={() => setModalVisible(false)}
              refetch={refetch}
            />
          </div>
        )}
      </div>
    </div>
  );
}
