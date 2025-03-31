"use client";

import { useForm } from "react-hook-form";
import { useCreateCard } from "@/hooks/Cards/useCreateCard";
import Modal from "@/components/Modal";

interface Inputs {
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
}

interface ModalCardCreationProps {
  open: boolean;
  onCancel: () => void;
  refetch: () => void;
}

export default function ModalCardCreation({
  open,
  onCancel,
  refetch,
}: ModalCardCreationProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { createCard, loading, displayValue, handleChange } = useCreateCard(() => {
    refetch();
    onCancel();
  });

  const onSubmit = (data: Inputs) => {
    createCard(data);
  };

  return (
    <Modal open={open} onCancel={onCancel}>
      <div className="p-4">
        <h2 className="text-2xl font-medium text-center">Create Credit Card</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Card Name</label>
            <input
              {...register("name", {
                required: "Card name is required",
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Credit Limit</label>
            <input
              type="text"
              {...register("limit", {
                required: "Credit limit is required",
                min: { value: 1, message: "Minimum value is $1" },
              })}
              value={displayValue}
              onChange={(e) => handleChange(e, setValue)}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.limit && (
              <p className="text-red-500 text-sm">{errors.limit.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Closing Day</label>
            <input
              type="number"
              {...register("closingDay", {
                required: "Closing day is required",
                min: { value: 1, message: "Minimum day is 1" },
                max: { value: 31, message: "Maximum day is 31" },
              })}
              min={1}
              max={31}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  target.value = Math.max(
                    1,
                    Math.min(31, Number(target.value))
                  ).toString();
                }
              }}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.closingDay && (
              <p className="text-red-500 text-sm">
                {errors.closingDay.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Due Day</label>
            <input
              type="number"
              {...register("dueDay", {
                required: "Due day is required",
                min: { value: 1, message: "Minimum day is 1" },
                max: { value: 31, message: "Maximum day is 31" },
              })}
              min={1}
              max={31}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  target.value = Math.max(
                    1,
                    Math.min(31, Number(target.value))
                  ).toString();
                }
              }}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.dueDay && (
              <p className="text-red-500 text-sm">{errors.dueDay.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
