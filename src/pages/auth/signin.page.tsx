import { motion } from "framer-motion";
import { CenterBoxHeader } from "@/components/CenterBox/CenterBoxHeader";
import { SignInButton } from "@/components/SignInButton/SignInButton";

export function SignInPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <motion.div className="flex flex-col first-letter:gap-2 border rounded-md w-[450px]">
                <CenterBoxHeader>BlueSSU 대시보드</CenterBoxHeader>
                <div className="flex flex-col px-8 py-4">
                    <SignInButton>BlueSSU 로그인</SignInButton>
                </div>
            </motion.div>
        </div>
    );
}
