"use client";

import { useForm, Controller } from "react-hook-form";
import { useCreateExpense } from "@/hooks/Expenses/useCreateExpense";
import { toast } from "react-toastify";
import { CategorySelectModal } from "@/components/shared/CategorySelectModal";
import { AccountSelectModal } from "@/components/shared/AccountSelectModal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type ExpenseFormInputs = {
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
  date?: Date;
};

interface ExpenseFormProps {
  onSuccess: () => void;
}

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ExpenseFormInputs>();

  const { createExpense, loading } = useCreateExpense(() => {
    toast.success("Expense successfully added!");
    reset();
    onSuccess();
  });

  const onSubmit = (data: ExpenseFormInputs) => {
    const payload = {
      ...data,
      date: data.date ? data.date.toISOString() : undefined,
    };

    createExpense(payload);
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
        <label className="block mb-1">Account</label>
        <Controller
          control={control}
          name="accountId"
          rules={{ required: true }}
          render={({ field }) => (
            <AccountSelectModal value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.accountId && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: true }}
          render={({ field }) => (
            <CategorySelectModal
              type="expense"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.categoryId && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label className="block mb-1">Date (optional)</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPPp")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                onMouseDown={(e) => e.stopPropagation()}
                className="w-auto p-0 z-[10000]"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  showOutsideDays={false}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
