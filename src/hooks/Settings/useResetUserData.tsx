import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";

export function useResetUserData(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    api
      .delete("/data/reset")
      .then(() => {
        toast.success("Your account has been reset.");
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        toast.error("Failed to reset account.");
      })
      .finally(() => setLoading(false));
  };

  return { reset, loading };
}
