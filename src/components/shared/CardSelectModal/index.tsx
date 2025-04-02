"use client";

import React, { useState } from "react";

import { useCards, Card } from "@/hooks/Cards/useCards";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface CardSelectModalProps {
  value?: string;
  onChange: (cardId: string) => void;
}

export const CardSelectModal: React.FC<CardSelectModalProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const { cards, loading } = useCards();

  const selectedCard = cards.find((card) => card.id === value);

  const handleSelect = (card: Card) => {
    onChange(card.id);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} type="button">
        {selectedCard ? selectedCard.name : "Select card"}
      </Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width="w-full max-w-md"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose a card</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
              {cards.map((card) => (
                <Button
                  key={card.id}
                  variant={card.id === value ? "default" : "outline"}
                  className="w-full justify-between"
                  type="button"
                  onClick={() => handleSelect(card)}
                >
                  <div className="flex flex-col text-left">
                    <span>{card.name}</span>
                    <span className="text-sm text-gray-500">
                      Limit: R$ {parseFloat(card.limit).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div>Closing: {card.closingDay}</div>
                    <div>Due: {card.dueDay}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
