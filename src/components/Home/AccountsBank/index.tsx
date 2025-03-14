"use client";

import { FaEyeSlash, FaWallet } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function AccountsBank() {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-3 w-full bg-zinc-50 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      {/* Overall Balance */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <div className="flex flex-col pl-2 border-l-4 border-green-500">
          <span className="text-sm font-medium text-slate-700">
            overal balance
          </span>
          <span className="text-2xl font-medium text-zinc-900">R$ 0,00</span>
        </div>

        <div>
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <FaEyeSlash />
          </button>
        </div>
      </div>

      {/* My Accounts */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-zinc-900">My accounts</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 p-2 rounded-full">
              <FaWallet />
            </div>
            <div className="text-slate-700 font-semibold">Initial Account</div>
          </div>

          <span className="text-blue-600 font-bold text-xl">R$ 0,00</span>
        </div>
      </div>

      {/* Manage Accounts */}
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          onClick={() => router.push("/home/accounts")}
          className="bg-green-300 text-green-950 font-semibold w-full py-1 rounded-sm transition-all hover:bg-green-500"
        >
          Manage accounts
        </button>
      </div>
    </section>
  );
}
