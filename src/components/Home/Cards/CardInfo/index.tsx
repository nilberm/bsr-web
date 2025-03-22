"use client";

import { Card } from "@/hooks/useCards";
import { FaCreditCard } from "react-icons/fa6";

interface CardInfoProps {
  card: Card;
}

export default function CardInfo({ card }: CardInfoProps) {
  const today = new Date().getDate();

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
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow">
      <p className="text-sm font-semibold text-zinc-900">{card.name}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 p-2 rounded-full">
            <FaCreditCard />
          </div>
          <div className="text-slate-700 font-semibold">
            Limit: R$ ${parseFloat(card.limit).toFixed(2)}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p className={`${highlightColor}`}>
            {isClosed ? `Due: ${card.dueDay}` : `Closing: ${card.closingDay}`}
          </p>
        </div>
      </div>
    </div>
  );
}
