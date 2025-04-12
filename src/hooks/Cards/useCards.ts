import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export interface Card {
  id: string;
  name: string;
  limit: string;
  currentLimit: string;
  closingDay: number;
  dueDay: number;
  createdAt: string;
  updatedAt: string;
}

export const useCards = () => {
  const {
    data: cards = [],
    isLoading: loading,
    isError,
    refetch,
  } = useQuery<Card[]>({
    queryKey: ["cards"],
    queryFn: () =>
      api
        .get<Card[]>("/cards")
        .then((res) => res.data)
        .catch(() => {
          throw new Error("Error fetching cards");
        }),
  });

  return {
    cards,
    loading,
    error: isError ? "Error fetching cards" : null,
    refetch,
  };
};
