"use client";

import Header from "@/components/Header";
import CardInfo from "@/components/Home/Cards/CardInfo";
import ModalCardCreation from "@/components/Home/Cards/ModalCardCreation";

import { useCards } from "@/hooks/Cards/useCards";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function CardsPage() {
  const { cards, loading, error, refetch } = useCards();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <Header
        backBtn={true}
        pageName="Cards"
        actionBtn={
          <button
            type="button"
            onClick={() => setModalVisible(true)}
            className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-110"
          >
            <FaPlus />
          </button>
        }
      />

      <div className="flex flex-col w-full p-8">
        {loading ? (
          <p>Loading cards...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cards.length > 0 ? (
              cards.map((card) => <CardInfo key={card.id} card={card} />)
            ) : (
              <p className="text-gray-500">No cards found</p>
            )}
          </div>
        )}
      </div>

      <ModalCardCreation
        open={isModalVisible}
        onCancel={() => setModalVisible(false)}
        refetch={refetch}
      />
    </div>
  );
}
