"use client";

import { FaAngleRight, FaCheck, FaPen, FaWallet } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

import emptyAccountImg from "@/assets/home/emptyAccount.png";
import Modal from "@/components/Modal";
import { useAccounts } from "@/hooks/useAccounts";

interface AccountProps {
  id: string;
  name: string;
  initialBalance: string;
}

interface AccountInfoProps {
  account: AccountProps;
}

export default function AccountInfo({ account }: AccountInfoProps) {
  const [modalBalanceVisible, setModalBalanceVisible] = useState(false);
  const [newBalance, setNewBalance] = useState(
    parseFloat(account.initialBalance)
  );
  const { refetch } = useAccounts();

  const formatMoney = (amount: number) => {
    return `R$ ${amount.toFixed(2)}`;
  };

  const handleUpdateBalance = async () => {
    try {
      await axios.patch(`/accounts/${account.id}`, {
        initialBalance: newBalance,
      });
      setModalBalanceVisible(false);
      refetch();
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <section className="flex flex-col gap-3 w-full bg-zinc-50 p-4 rounded-md shadow">
      {/* Account Info */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 p-4 text-2xl rounded-full">
            <FaWallet />
          </div>
          <div className="text-slate-700 font-semibold text-xl">
            {account.name}
          </div>
        </div>

        <button
          type="button"
          className="text-2xl p-2 rounded-full transition-all hover:bg-gray-300"
        >
          <FaAngleRight />
        </button>
      </div>

      {/* Account Balance */}
      <div className="flex justify-between items-center py-2">
        <div className="font-bold">
          <p>
            Current balance:{" "}
            <span className="text-blue-600">{formatMoney(newBalance)}</span>
          </p>
        </div>

        <button
          type="button"
          className="text-lg p-3 rounded-full transition-all hover:bg-gray-300"
          onClick={() => setModalBalanceVisible(true)}
        >
          <FaPen />
        </button>
      </div>

      {/* Modal for New Balance */}
      <Modal
        open={modalBalanceVisible}
        onCancel={() => setModalBalanceVisible(false)}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
          <form
            className="flex flex-col items-center justify-center w-full h-full gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBalance();
            }}
          >
            <Image src={emptyAccountImg} alt="Icon Account" />
            <span className="font-semibold text-zinc-950 text-lg">
              {account.name}
            </span>
            <span className="text-gray-700 text-lg">
              Set your new account balance
            </span>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(parseFloat(e.target.value))}
              className="p-4 text-center w-full border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="text-3xl p-3 px-6 rounded-full bg-green-500 text-zinc-50 transition-all"
            >
              <FaCheck />
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
}
