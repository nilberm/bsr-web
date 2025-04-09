"use client";

import { useExpenseDetail } from "@/hooks/Expenses/useExpenseDetail";
import { format } from "date-fns";
import Modal from "@/components/ui/Modal";

interface ExpenseDetailModalProps {
  open: boolean;
  onClose: () => void;
  expenseId: string;
}

export default function ExpenseDetailModal({
  open,
  onClose,
  expenseId,
}: ExpenseDetailModalProps) {
  const { data, isLoading, error } = useExpenseDetail(expenseId, open);

  const title = data?.description || "Expense Detail";

  return (
    <Modal open={open} onCancel={onClose} width="w-[32rem]">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && (
          <p className="text-red-500">Error loading expense details.</p>
        )}

        {data && (
          <div className="space-y-2 text-sm text-zinc-700">
            <div>
              <strong>Amount:</strong>{" "}
              <span className="text-red-600 font-medium">
                R${" "}
                {data.amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {data.date && (
              <div>
                <strong>Date:</strong> {format(new Date(data.date), "PPP")}
              </div>
            )}

            <div>
              <strong>Category:</strong> {data.category.name}
            </div>

            <div>
              <strong>Paid with:</strong>{" "}
              {data.account?.name || data.card?.name || "N/A"}
            </div>

            <div>
              <strong>Type:</strong> {data.type}
            </div>

            {data.type === "installments" &&
              data.installmentNumber &&
              data.installmentTotal && (
                <div>
                  <strong>Installment:</strong>{" "}
                  {data.installmentNumber}/{data.installmentTotal}
                </div>
              )}

            {data.recurrence === "monthly" &&
              data.recurrenceEndDate && (
                <div>
                  <strong>Recurs every month until:</strong>{" "}
                  {format(new Date(data.recurrenceEndDate), "PPP")}
                </div>
              )}

            {data.createdAt && (
              <div>
                <strong>Created at:</strong>{" "}
                {format(new Date(data.createdAt), "PPPp")}
              </div>
            )}

            {data.updatedAt && (
              <div>
                <strong>Updated at:</strong>{" "}
                {format(new Date(data.updatedAt), "PPPp")}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
