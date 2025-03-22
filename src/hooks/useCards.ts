import { api } from "@/services/api";
import { useEffect, useState } from "react";

export interface Card {
  id: string;
  name: string;
  limit: string;
  closingDay: number;
  dueDay: number;
  createdAt: string;
  updatedAt: string;
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    api
      .get("/cards")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        setError("Error fetching cards");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return { cards, loading, error, refetch: fetchCards };
};
