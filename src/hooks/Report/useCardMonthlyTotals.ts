/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function useCardMonthlyTotals(
  cardIds: string[],
  month: number,
  year: number
) {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cardIds.length || !month || !year) return;

    setLoading(true);
    setError(null);

    const promises = cardIds.map((cardId) =>
      api
        .get("/report/card-expenses", {
          params: { cardId, month, year },
        })
        .then((res) => ({ cardId, total: res.data.total }))
        .catch(() => ({ cardId, total: 0 }))
    );

    Promise.all(promises)
      .then((results) => {
        const map: Record<string, number> = {};
        results.forEach(({ cardId, total }) => {
          map[cardId] = total;
        });
        setTotals(map);
      })
      .catch(() => {
        setError("Failed to fetch card expenses");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify(cardIds), month, year]);

  return { totals, loading, error };
}
