import { client } from "@/lib/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";

export function useUser(option?: { requireLogin?: boolean }) {
  const navigate = useNavigate();

  const isLogin = !!localStorage.getItem("token");
  const { data: user } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      try {
        const res = await client.CoreGetUser({ userId: "me" });
        return res.user;
      } catch (err) {
        if (err instanceof APIResponseError) {
          if (err.body.code === "invalid_token") {
            localStorage.removeItem("token");
            navigate("/auth/signin");
          }
        }
      }
    },
    enabled: isLogin,
    retry: false,
  });

  if (option?.requireLogin && !isLogin) {
    navigate("/auth/signin");
  }

  return {
    user,
    isLogin,
  };
}
