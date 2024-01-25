import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { CenterBoxHeader } from "@/components/CenterBox/CenterBoxHeader";
import { client } from "@/lib/client";

export function AuthPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            navigate("/auth/signin");
            return;
        }
        localStorage.setItem("token", token);
        client.updateAuth(token);
        navigate("/");
    }, [navigate, token]);

    return (
        <div className="flex h-screen items-center justify-center">
            <motion.div className="flex flex-col first-letter:gap-2 border rounded-md w-[450px]">
                <CenterBoxHeader>BlueSSU 대시보드</CenterBoxHeader>
                <div className="flex flex-col px-8 py-6 justify-center items-center gap-2">
                    <Spinner size={32} />
                    잠시만 기다려주세요
                </div>
            </motion.div>
        </div>
    );
}
