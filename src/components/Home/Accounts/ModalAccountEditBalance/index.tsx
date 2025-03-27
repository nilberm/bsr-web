import { useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { FaCheck } from "react-icons/fa6";
import { useEditAccountBalance } from "@/hooks/useEditAccountBalance";

interface ModalAccountEditBalanceProps {
  open: boolean;
  onCancel: () => void;
  refetch?: () => void;
  accountId: string;
}

interface AccountBalanceFormValues {
  balance: number;
}

export default function ModalAccountEditBalance({
  open,
  onCancel,
  refetch,
  accountId,
}: ModalAccountEditBalanceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountBalanceFormValues>();

  const { editBalance, loading } = useEditAccountBalance(refetch);

  const onSubmit = (data: AccountBalanceFormValues) =>
    editBalance(accountId, data.balance, onCancel);

  return (
    <Modal open={open} onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <form
          className="flex flex-col items-center justify-center w-full h-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold">Edit Account Balance</h1>

          <label className="w-full">
            <span className="text-gray-700 text-lg">New Balance</span>
            <input
              type="number"
              step="0.01"
              {...register("balance", {
                required: "Balance is required",
                min: { value: 0, message: "Balance must be positive" },
              })}
              className="p-3 w-full border border-gray-300 rounded-md mt-1"
            />
            {errors.balance && (
              <p className="text-red-500 text-sm">{errors.balance.message}</p>
            )}
          </label>

          <button
            type="submit"
            className="text-3xl p-3 px-6 rounded-full bg-green-500 text-white transition-all"
            disabled={loading}
          >
            {loading ? <p className="text-2xl">Loading...</p> : <FaCheck />}
          </button>
        </form>
      </div>
    </Modal>
  );
}
