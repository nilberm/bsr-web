"use client";

import { useAccounts, Account } from "@/hooks/useAccounts";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaWallet } from "react-icons/fa6";
import { useBalanceVisibility } from "@/context/BalanceVisibilityContext";

export default function AccountsBank() {
  const router = useRouter();
  const { showBalance, toggleBalance } = useBalanceVisibility();
  const { accounts, totalBalance, loading, error } = useAccounts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col gap-3 w-full bg-zinc-50 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <div className="flex flex-col pl-2 border-l-4 border-green-500">
          <span className="text-sm font-medium text-slate-700">
            Overall Balance
          </span>
          <span className="text-2xl font-medium text-zinc-900">
            {showBalance ? `R$ ${totalBalance.toFixed(2)}` : "•••••"}
          </span>
        </div>

        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => toggleBalance()}
        >
          {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {accounts.map((account: Account, index: number) => (
          <div key={account.id} className="w-full">
            <p className="text-sm font-semibold text-zinc-900">{account.name}</p>

            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 p-2 rounded-full">
                  <FaWallet />
                </div>
                <div className="text-slate-700 font-semibold">
                  {account.isDefault ? "Default Account" : "Account"}
                </div>
              </div>

              <span className="text-blue-600 font-bold text-xl">
                {showBalance ? `R$ ${parseFloat(account.initialBalance).toFixed(2)}` : "•••••"}
              </span>
            </div>

            {index !== accounts.length - 1 && (
              <hr className="border-t border-gray-300 my-2" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          onClick={() => router.push("/home/accounts")}
          className="bg-green-300 text-green-950 font-semibold w-full py-1 rounded-sm transition-all hover:bg-green-500 cursor-pointer"
        >
          Manage accounts
        </button>
      </div>
    </section>
  );
}
