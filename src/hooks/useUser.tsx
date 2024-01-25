import { client } from "@/lib/client";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export function useUser(option?: { requireLogin?: boolean }) {
    const navigate = useNavigate();

    const isLogin = !!localStorage.getItem("token");
    const { data: user } = useQuery(
        ["user", "me"],
        async () => (await client.CoreGetUser({ userId: "me" })).user,
        {
            retry: false,
        }
    );

    if (option?.requireLogin && !isLogin) {
        navigate("/auth/signin");
    }

    return {
        user,
        isLogin,
    };
}
