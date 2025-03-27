import { useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { FaCheck } from "react-icons/fa6";
import { useCreateAccount } from "@/hooks/useCreateAccount";

interface ModalAccountCreationProps {
  open: boolean;
  onCancel: () => void;
  refetch?: () => void;
}

interface AccountFormValues {
  name: string;
  balance: number;
  type: string;
}

export default function ModalAccountCreation({
  onCancel,
  open,
  refetch,
}: ModalAccountCreationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    defaultValues: {
      name: "",
      balance: 0,
      type: "checking",
    },
  });

  const { createAccount, loading } = useCreateAccount(refetch);

  const onSubmit = (data: AccountFormValues) => createAccount(data, onCancel);

  return (
    <Modal open={open} onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <form
          className="flex flex-col items-center justify-center w-full h-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold">Create new Account</h1>

          <label className="w-full">
            <span className="text-gray-700 text-lg">Account Name</span>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: 3,
              })}
              className="p-3 w-full border border-gray-300 rounded-md mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </label>

          <label className="w-full">
            <span className="text-gray-700 text-lg">
              Set your current balance
            </span>
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

          <input type="hidden" {...register("type")} value="checking" />

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
