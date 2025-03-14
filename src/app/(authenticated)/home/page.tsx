import Header from "@/components/Header";
import React from "react";
import Image from "next/image";

import userPhoto from "@/assets/home/userPhoto.png";
import AccountsBank from "@/components/Home/AccountsBank";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Header
        pageName="Home"
        backBtn={false}
        actionBtn={
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-xl text-slate-100">Good Morning,</span>
              <span className="text-2xl font-bold text-zinc-50">User Name</span>
            </div>
            <Image src={userPhoto} alt="User photo" />
          </div>
        }
      />
      <div className="flex flex-col w-full p-8">
        <AccountsBank />
      </div>
    </div>
  );
}
