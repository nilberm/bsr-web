/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useState } from "react";

interface CreateCardInputs {
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
}

export function useCreateCard(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();
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

  const { mutate: createCard, isPending: loading } = useMutation({
    mutationFn: (data: CreateCardInputs) => {
      const request = {
        name: data.name,
        limit: Number(String(data.limit).replace(/\D/g, "")),
        closingDay: Number(data.closingDay),
        dueDay: Number(data.dueDay),
      };

      return api.post("cards", request);
    },
    onSuccess: (_, variables) => {
      toast.success(`Card ${variables.name} has been created`);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while creating the card. Please try again"
      );
    },
  });

  return { createCard, loading, displayValue, handleChange };
}
