import BlueSSULogo from "../../assets/bluessu.png";

export function CenterBoxHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-auto px-4 border-b flex items-center h-10">
            <div className="flex items-center gap-2">
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                <p className="text-slate-500 text-sm">{children}</p>
            </div>
        </div>
    );
}
