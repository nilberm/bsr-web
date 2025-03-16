import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<User>("/users/me");
        setUser(response.data);
      } catch (_err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    if (hour >= 18 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  return { user, loading, error, greeting: getGreeting() };
}
