"use client";

import { Card } from "@/hooks/Cards/useCards";
import { FaCreditCard } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CardInfoProps {
  card: Card;
}

export default function CardInfo({ card }: CardInfoProps) {
  const today = new Date().getDate();
  const router = useRouter();

  let isClosed = false;
  let highlightColor = "text-yellow-500";

  if (today > card.closingDay) {
    isClosed = true;
    highlightColor = "text-red-500";
  }

  if (today > card.dueDay) {
    isClosed = false;
    highlightColor = "text-yellow-500";
  }

  return (
    <div className="relative flex flex-col gap-4 p-4 bg-white rounded-md shadow">
      <button
        onClick={() => router.push(`/home/cards/${card.id}`)}
        className="absolute top-2 right-2 text-gray-700 border border-gray-300 px-3 py-1 text-sm rounded hover:bg-black hover:text-white transition-colors"
      >
        Edit
      </button>

      <h3 className="text-lg font-semibold text-zinc-900">{card.name}</h3>

      <div className="flex items-center gap-2">
        <div className="bg-gray-300 p-2 rounded-full">
          <FaCreditCard />
        </div>
        <div className="text-slate-700 font-semibold">
          Limit: R$ ${parseFloat(card.limit).toFixed(2)}
        </div>
      </div>

      <p className={`text-sm text-gray-600 ${highlightColor}`}>
        {isClosed ? `Due: ${card.dueDay}` : `Closing: ${card.closingDay}`}
      </p>
    </div>
  );
}
