"use client";

import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import AccountsBank from "@/components/Home/Accounts/AccountsBank";

import userPhoto from "@/assets/home/userPhoto.png";
import { useUser } from "@/hooks/useUser";
import CardList from "@/components/Home/Cards/CardsList";

export default function Home() {
  const { user, loading, error, greeting } = useUser();

  return (
    <div className="flex flex-col w-full">
      <Header
        pageName="Home"
        backBtn={false}
        actionBtn={
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-end">
              {loading ? (
                <span className="text-xl text-slate-100">Loading...</span>
              ) : error ? (
                <span className="text-xl text-red-500">Error</span>
              ) : (
                <>
                  <span className="text-xl text-slate-100">{greeting},</span>
                  <span className="text-2xl font-bold text-zinc-50">
                    {user?.name || "User"}
                  </span>
                </>
              )}
            </div>
            <Image src={userPhoto} alt="User photo" />
          </div>
        }
      />
      <div className="flex flex-col w-full p-8 gap-4">
        <AccountsBank />
        <CardList />
      </div>
    </div>
  );
}
