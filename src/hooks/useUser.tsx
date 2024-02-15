import { client } from "@/lib/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useUser(option?: { requireLogin?: boolean }) {
    const navigate = useNavigate();

    const isLogin = !!localStorage.getItem("token");
    const { data: user } = useQuery({
        queryKey: ["user", "me"],
        queryFn: async () => {
            const res = await client.CoreGetUser({ userId: "me" });
            return res.user;
        },
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
