import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useUser() {
  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () =>
      api
        .get<User>("/users/me")
        .then((res) => res.data)
        .catch(() => {
          throw new Error("Failed to load user data");
        }),
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    if (hour >= 18 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  return {
    user,
    loading: isLoading,
    error: isError ? "Failed to load user data" : null,
    greeting: getGreeting(),
  };
}
