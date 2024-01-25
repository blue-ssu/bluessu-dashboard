import React from "react";
import BlueSSULogo from "../../assets/bluessu.png";

type SignInButtonProps = {
    children?: React.ReactNode;
} & React.ComponentProps<"button">;
export function SignInButton({ children, ...rest }: SignInButtonProps) {
    return (
        <button
            className="flex items-center justify-center gap-2 h-10 border rounded hover:bg-slate-50 transition font-[15px]"
            onClick={() => {
                window.location.href = `${
                    import.meta.env.VITE_AUTH_URL
                }?redirectUrl=${window.location.protocol}//${
                    window.location.host
                }/auth`;
            }}
            {...rest}
        >
            <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
            {children}
        </button>
    );
}
