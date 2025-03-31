"use client";

import { Card, useCards } from "@/hooks/Cards/useCards";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import ModalCardCreation from "../ModalCardCreation";
import { useBalanceVisibility } from "@/context/BalanceVisibilityContext";

export default function CardList() {
  const router = useRouter();
  const { cards, error, loading, refetch } = useCards();
  const { showBalance } = useBalanceVisibility();
  const [showModal, setShowModal] = useState(false);

  const today = new Date().getDate();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col gap-3 w-full bg-zinc-50 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <div className="flex flex-col pl-2 border-l-4 border-blue-500">
          <span className="text-sm font-medium text-slate-700">
            Credit Cards
          </span>
        </div>
      </div>

      {cards.length === 0 ? (
        <>
          <p className="text-center text-gray-600">
            No cards available. Add a new card to get started.
          </p>

          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-blue-300 text-blue-950 font-semibold w-full py-1 rounded-sm transition-all hover:bg-blue-500 cursor-pointer"
            >
              Add Card
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {cards.map((card: Card, index: number) => {
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
                <div key={card.id} className="w-full">
                  <p className="text-sm font-semibold text-zinc-900">
                    {card.name}
                  </p>

                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-300 p-2 rounded-full">
                        <FaCreditCard />
                      </div>
                      <div className="text-slate-700 font-semibold">
                        Limit:{" "}
                        {showBalance
                          ? `R$ ${parseFloat(card.limit).toFixed(2)}`
                          : "•••••"}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p className={`${highlightColor}`}>
                        {isClosed
                          ? `Due: ${card.dueDay}`
                          : `Closing: ${card.closingDay}`}
                      </p>
                    </div>
                  </div>

                  {index !== cards.length - 1 && (
                    <hr className="border-t border-gray-300 my-2" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => router.push("/home/cards")}
              className="bg-green-300 text-green-950 font-semibold w-full py-1 rounded-sm transition-all hover:bg-green-500 cursor-pointer"
            >
              Manage cards
            </button>
          </div>
        </>
      )}

      <ModalCardCreation
        open={showModal}
        onCancel={() => setShowModal(false)}
        refetch={refetch}
      />
    </section>
  );
}
