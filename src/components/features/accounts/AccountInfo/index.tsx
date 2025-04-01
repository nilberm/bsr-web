"use client";

import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaPen, FaWallet } from "react-icons/fa6";
import ModalAccountEditBalance from "../ModalAccountEditBalance";

interface AccountProps {
  id: string;
  name: string;
  balance: string;
}

interface AccountInfoProps {
  account: AccountProps;
  refetch: () => void;
}

export default function AccountInfo({ account, refetch }: AccountInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <Link href={`/home/accounts/${account.id}`}>
          <button
            type="button"
            className="text-2xl p-2 rounded-full transition-all hover:bg-gray-300"
          >
            <FaAngleRight />
          </button>
        </Link>
      </div>

      {/* Account Balance */}
      <div className="flex justify-between items-center py-2">
        <div className="font-bold">
          <p>
            Current balance:{" "}
            <span className="text-blue-600">{account.balance}</span>
          </p>
        </div>

        <button
          type="button"
          className="text-lg p-3 rounded-full transition-all hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPen />
        </button>
      </div>

      {/* Modal for Editing Balance */}
      <ModalAccountEditBalance
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        accountId={account.id}
      />
    </section>
  );
}
