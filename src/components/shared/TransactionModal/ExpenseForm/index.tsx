"use client";

import { AccountSelectModal } from "@/components/shared/AccountSelectModal";
import { CategorySelectModal } from "@/components/shared/CategorySelectModal";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateExpense } from "@/hooks/Expenses/useCreateExpense";
import { addMonths, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { CardSelectModal } from "../../CardSelectModal";

type ExpenseFormInputs = {
  description: string;
  amount: number;
  accountId?: string;
  cardId?: string;
  categoryId: string;
  date?: Date;
  type: "fixed" | "installments";
  installments?: number;
  recurrence?: "one-time" | "monthly";
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
    setValue,
  } = useForm<ExpenseFormInputs>({
    defaultValues: {
      type: "fixed",
      recurrence: "one-time",
      amount: 0,
    },
  });

  const type = useWatch({ control, name: "type" });
  const recurrence = useWatch({ control, name: "recurrence" });
  const amount = useWatch({ control, name: "amount" });
  const installments = useWatch({ control, name: "installments" });

  const [monthsCount, setMonthsCount] = useState<number>(3);

  const { createExpense, loading } = useCreateExpense(() => {
    toast.success("Expense successfully added!");
    reset();
    onSuccess();
  });

  const onSubmit = (data: ExpenseFormInputs) => {
    if (!data.accountId && !data.cardId) {
      toast.error("Please select either an account or a card.");
      return;
    }

    const recurrenceEndDate =
      data.type === "fixed" &&
      data.recurrence === "monthly" &&
      data.date &&
      monthsCount > 0
        ? addMonths(new Date(data.date), monthsCount - 1)
        : undefined;

    const payload = {
      ...data,
      date: data.date ? data.date.toISOString() : undefined,
      recurrenceEndDate: recurrenceEndDate
        ? recurrenceEndDate.toISOString()
        : undefined,
    };

    createExpense(payload);
  };

  useEffect(() => {
    if ((amount === 0 || !amount) && type === "installments") {
      setValue("type", "fixed");
    }
  }, [amount, type, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto pb-4">
      <div className="bg-red-500 rounded-b-3xl px-6 pt-4 pb-6 text-white text-left">
        <div className="relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl pl-2">
            R$
          </span>
          <Controller
            control={control}
            name="amount"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="number"
                step="0.01"
                {...field}
                placeholder="0,00"
                className="bg-transparent text-4xl font-semibold text-center outline-none w-full placeholder-white pl-10"
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-4 mt-6 px-4">
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
          <label className="block mb-1">Account (or Card)</label>
          <div className="flex gap-4">
            <Controller
              control={control}
              name="accountId"
              render={({ field }) => (
                <AccountSelectModal
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setValue("cardId", undefined);
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="cardId"
              render={({ field }) => (
                <CardSelectModal
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setValue("accountId", undefined);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Repeat transaction</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="fixed"
                {...register("type", { required: true })}
                checked={type === "fixed"}
              />
              Fixed
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="installments"
                {...register("type", { required: true })}
                checked={type === "installments"}
                disabled={!amount || amount <= 0}
              />
              Installments
            </label>
          </div>

          {(!amount || amount <= 0) && (
            <p className="text-xs text-red-500 mt-1">
              You need to enter an amount before selecting installments.
            </p>
          )}
        </div>

        {type === "installments" && amount > 0 && (
          <>
            <div>
              <label className="block mb-1">Installments</label>
              <input
                type="number"
                {...register("installments", { required: true, min: 1 })}
                className="w-full p-2 border rounded"
              />
              {errors.installments && (
                <span className="text-red-500">Must be at least 1</span>
              )}
            </div>

            {installments && installments > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>
                  {installments}x{" "}
                  <strong>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(amount) / Number(installments))}
                  </strong>
                </span>

                <div className="relative group">
                  <div className="w-4 h-4 rounded-full bg-zinc-400 text-white flex items-center justify-center text-xs cursor-default">
                    i
                  </div>
                  <div className="absolute z-10 hidden group-hover:block bg-zinc-800 text-white text-xs p-2 rounded w-64 top-6 left-1/2 -translate-x-1/2">
                    Each installment will be saved as a separate expense with
                    its own date and value.
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {type === "fixed" && (
          <div>
            <label className="block mb-1">Recurrence</label>
            <select
              {...register("recurrence")}
              className="w-full p-2 border rounded"
            >
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* 🔁 Recurrence duration selector */}
        {type === "fixed" && recurrence === "monthly" && (
          <div>
            <label className="block mb-1">For how many months?</label>
            <select
              value={monthsCount}
              onChange={(e) => setMonthsCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
            </select>
          </div>
        )}

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
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
