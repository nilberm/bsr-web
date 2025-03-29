"use client";

import Header from "@/components/Header";
import { api } from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface Card {
  id: string;
  name: string;
  limit: string;
  closingDay: number;
  dueDay: number;
}

export default function CardDetailPage() {
  const params = useParams();
  const cardId = params.id;
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    limit: "",
    closingDay: 1,
    dueDay: 1,
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get(`/cards/${cardId}`);
        setCard(res.data);
        setFormValues({
          name: res.data.name,
          limit: res.data.limit,
          closingDay: res.data.closingDay,
          dueDay: res.data.dueDay,
        });
      } catch (err) {
        console.error("Error loading card details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleUpdateField = async (field: string) => {
    try {
      await api.put(`/cards/${cardId}`, {
        [field]: formValues[field as keyof typeof formValues],
      });
      setCard((prev) =>
        prev
          ? { ...prev, [field]: formValues[field as keyof typeof formValues] }
          : prev
      );
      setEditingField(null);
    } catch (error) {
      console.error("Failed to update card field:", error);
    }
  };

  const handleCancel = () => {
    if (!card) return;
    setFormValues({
      name: card.name,
      limit: card.limit,
      closingDay: card.closingDay,
      dueDay: card.dueDay,
    });
    setEditingField(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Card not found
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Header backBtn={true} pageName="Card Details" />

      <div className="rounded-lg flex flex-col w-full p-8">
        <section className="bg-zinc-50 p-6 rounded-md shadow flex flex-col gap-6">
          {/* Card Icon */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <FaCreditCard className="text-2xl text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{card.name}</h2>
          </div>

          {/* Editable Fields */}
          {(["name", "limit", "closingDay", "dueDay"] as const).map((field) => (
            <div key={field} className="flex justify-between items-center">
              <div className="w-full">
                <label className="text-gray-600 text-sm capitalize">
                  {field}
                </label>
                {editingField === field ? (
                  <input
                    type={field === "name" ? "text" : "number"}
                    className="mt-1 p-2 border rounded w-full"
                    value={formValues[field]}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field]:
                          field === "name"
                            ? e.target.value
                            : Number(e.target.value),
                      }))
                    }
                  />
                ) : (
                  <p className="text-lg font-medium text-slate-800 mt-1">
                    {field === "limit"
                      ? `R$ ${parseFloat(formValues[field]).toFixed(2)}`
                      : formValues[field]}
                  </p>
                )}
              </div>
              <div className="ml-4 flex gap-2">
                {editingField === field ? (
                  <>
                    <button
                      onClick={() => handleUpdateField(field)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      <FiSave className="inline mr-1" /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      <RxCross2 className="inline" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingField(field)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
