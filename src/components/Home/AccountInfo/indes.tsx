"use client";

import { FaAngleRight, FaCheck, FaPen, FaWallet } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";

import emptyAccountImg from "@/assets/home/emptyAccount.png";
import Modal from "@/components/Modal";

interface AccountProps {
  id: number;
  name: string;
  currentBalance: number;
}
interface AccountInfoProps {
  accounts: AccountProps;
}
export default function AccountInfo({ accounts }: AccountInfoProps) {
  const [modalBalanceVisible, setModalBalanceVisible] = useState(false);

  const formatMoney = (amount: number) => {
    const formattedAmount = (amount / 100).toFixed(2);

    return `R$ ${formattedAmount}`;
  };

  return (
    <section className="flex flex-col gap-3 w-full bg-zinc-50 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      {/* Account Info */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 p-4 text-2xl rounded-full">
            <FaWallet />
          </div>
          <div className="text-slate-700 font-semibold text-xl">
            {accounts.name}
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
            <span className="text-blue-600">
              {formatMoney(accounts.currentBalance)}
            </span>
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
          <form className="flex flex-col items-center justify-center w-full h-full gap-8">
            <Image src={emptyAccountImg} alt="Icon Account" />
            <span className="font-semibold text-zinc-950 text-lg">
              {accounts.name}
            </span>
            <span className="text-gray-700 text-lg">
              Set your new account balance
            </span>
            <input
              type="number"
              defaultValue={accounts.currentBalance / 100}
              id="newAccountBalance"
              className="p-4 text-center w-full border border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="text-3xl p-3 px-6 rounded-full bg-green-500 text-zinc-50 transition-all"
              onClick={() => setModalBalanceVisible(false)}
            >
              <FaCheck />
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
}