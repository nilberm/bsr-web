// Sidebar.tsx
"use client";

import Image from "next/image";
import logo from "@/assets/logo/logo_full.svg";
import Link from "next/link";
import {
  FaDollarSign,
  FaGear,
  FaHouse,
  FaPlus,
  FaSquarePollHorizontal,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TransactionModal from "../TransactionModal";

export default function Sidebar() {
  const pathname = usePathname();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  return (
    <>
      <aside className="bg-zinc-50 shadow-[4px_1px_4px_0px_rgba(0,0,0,0.25)] flex flex-col p-8 px-6 justify-between gap-4 w-70 z-50">
        <div className="h-[6%]">
          <Image src={logo} alt="logo" className="w-full" />
        </div>

        <div className="h-[90%] flex flex-col gap-4">
          <h4 className="font-semibold text-gray-500">Menu</h4>
          <nav>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/home"
                  className={`flex items-center gap-4 text-xl font-semibold p-2 px-3 rounded-lg transition-all ${
                    pathname.split("/")[1] === "home"
                      ? "text-zinc-50 bg-green-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      : ""
                  }`}
                >
                  <FaHouse /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className={`flex items-center gap-4 text-xl font-semibold p-2 px-3 rounded-lg transition-all ${
                    pathname.split("/")[1] === "report"
                      ? "text-zinc-50 bg-green-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      : ""
                  }`}
                >
                  <FaSquarePollHorizontal /> <span>Report</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/expense-limit"
                  className={`flex items-center gap-4 text-xl font-semibold p-2 px-3 rounded-lg transition-all ${
                    pathname.split("/")[1] === "expense-limit"
                      ? "text-zinc-50 bg-green-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      : ""
                  }`}
                >
                  <FaDollarSign /> <span>Expense Limit</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`flex items-center gap-4 text-xl font-semibold p-2 px-3 rounded-lg transition-all ${
                    pathname.split("/")[1] === "settings"
                      ? "text-zinc-50 bg-green-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      : ""
                  }`}
                >
                  <FaGear /> <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <button
          className="h-[4%] w-full flex justify-center items-center bg-green-500 text-zinc-50 py-5 rounded-md transition-all hover:-translate-y-1 hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-none"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <FaPlus />
        </button>
      </aside>

      <TransactionModal
        open={isTransactionModalOpen}
        onCancel={() => setIsTransactionModalOpen(false)}
      />
    </>
  );
}
