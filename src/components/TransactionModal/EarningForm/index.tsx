"use client";

import { useForm } from "react-hook-form";
import { useCreateEarning } from "@/hooks/useCreateEarning";
import { toast } from "react-toastify";

type EarningFormInputs = {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: string;
};

interface EarningFormProps {
  onSuccess: () => void;
}

export default function EarningForm({ onSuccess }: EarningFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EarningFormInputs>();

  const { createEarning, loading } = useCreateEarning();

  const onSubmit = (data: EarningFormInputs) => {
    createEarning(data, () => {
      toast.success("Earning successfully added!");
      reset();
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Description</label>
        <input
          type="text"
          {...register("description", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.amount && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Account ID</label>
        <input
          type="text"
          {...register("accountId", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.accountId && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Category ID</label>
        <input
          type="text"
          {...register("categoryId", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.categoryId && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Date (optional)</label>
        <input
          type="datetime-local"
          {...register("date")}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Earning"}
      </button>
    </form>
  );
}
