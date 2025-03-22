import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface CreateCardInputs {
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
}

export function useCreateCard() {
  const [loading, setLoading] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (
      name: "name" | "limit" | "closingDay" | "dueDay",
      value: number
    ) => void
  ) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setDisplayValue("");
      setValue("limit", 0);
      return;
    }

    const formattedValue = `$${Number(rawValue).toLocaleString("en-US")}`;
    setDisplayValue(formattedValue);
    setValue("limit", Number(rawValue));
  };

  const createCard = async (data: CreateCardInputs, onSuccess: () => void) => {
    setLoading(true);

    const request = {
      name: data.name,
      limit: Number(String(data.limit).replace(/\D/g, "")),
      closingDay: Number(data.closingDay),
      dueDay: Number(data.dueDay),
    };

    await api
      .post("cards", request)
      .then(() => {
        toast.success(`Card ${data.name} has been created`);
        onSuccess();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "An error occurred while creating the card. Please try again"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { createCard, loading, displayValue, handleChange };
}
