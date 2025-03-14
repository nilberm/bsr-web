"use client";

import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface userProps {
  name: string;
  photoUrl: string;
}

interface HeaderProps {
  pageName: string;
  backBtn: boolean;
  actionBtn?: React.JSX.Element;
  user?: userProps;
}
export default function Header({ pageName, actionBtn, backBtn }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-green-500 w-full h-40 flex items-center justify-between px-12">
      <div className="flex items-center gap-4 text-zinc-50">
        {backBtn && (
          <button
            className="p-2 rounded-full text-4xl transition-all hover:bg-green-700"
            onClick={() => router.back()}
          >
            <FaAngleLeft />
          </button>
        )}

        {pageName === "Home" ? "" : <h2 className="text-3xl">{pageName}</h2>}
      </div>

      <div>{actionBtn && actionBtn}</div>
    </header>
  );
}