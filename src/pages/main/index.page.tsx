import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import BlueSSULogo from "../../assets/bluessu.png";
import BlueSSULineWhite from "../../assets/bluessuLineWhite.png";
import "./indexPage.css";
import { useUser } from "@/hooks/useUser";

function MainHeader() {
    const { isLogin } = useUser({
        requireLogin: false,
    });

    return (
        <div className="flex justify-center fixed left-0 top-0 w-screen backdrop-blur text-white">
            <div className="max-w-[900px] w-full flex justify-between items-center p-4">
                <Link className="flex items-center" to={"/"}>
                    <img src={BlueSSULogo} alt="BlueSSU Logo" className="w-7" />
                    <div className="text font-semibold ml-2">BlueSSU</div>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <a href="https://bluessu.notion.site" target="_blank">
                            ↖︎ 문서
                        </a>
                    </Button>
                    <div className="flex items-center">
                        {isLogin ? (
                            <Button asChild>
                                <Link to="/projects">프로젝트</Link>
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link to="/auth/signin">로그인</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <div className="flex items-center justify-center h-screen main-page-hero-background">
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="">
                    <img
                        src={BlueSSULineWhite}
                        alt=""
                        className="w-[64px] h-[64px]"
                    />
                </div>
                <h1 className="text-center font-bold text-7xl text-white">
                    <span className="main-page-hero-letter main-page-hero-letter-1">
                        B
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-2">
                        L
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-3">
                        U
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-4">
                        E
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-5">
                        S
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-6">
                        S
                    </span>
                    <span className="main-page-hero-letter main-page-hero-letter-7">
                        U
                    </span>
                </h1>
                <div className="text-white font-bold">
                    숭실대학교 오픈소스 API 프로젝트
                </div>
            </div>
        </div>
    );
}

export function MainPage() {
    return (
        <>
            <MainHeader />
            <HeroSection />
        </>
    );
}
