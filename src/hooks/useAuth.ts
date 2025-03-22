import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        router.push("/login");
        return;
      }

      await api
        .get("/users/me")
        .then(() => {
          router.push("/home");
          console.log("test");
        })
        .catch(() => {
          router.push("/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    checkAuth();
  }, [router]);

  return { isLoading };
}
