import { Link, useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { SignInButton } from "@/components/SignInButton/SignInButton";

import BlueSSULogo from "../../assets/bluessu.png";
import { useEffect, useState } from "react";

function AuthHeader() {
  return (
    <div
      className={
        "w-full absolute top-0 left-0 h-[60px] bg-background transition window-draggable z-10"
      }
    >
      <div className="max-w-[1100px] h-full w-full px-4 py-3 m-auto flex items-center justify-between window-draggable">
        <div className="flex items-center gap-3">
          <Link className="flex items-center" to={"/"}>
            <img src={BlueSSULogo} alt="BlueSSU Logo" className="w-7" />
            <div className="text font-semibold ml-2">BlueSSU</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MovingLogo() {
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const strokeWidth = isBreathing ? 4 : 28;

  return (
    <svg
      width="538"
      height="538"
      viewBox="0 0 538 538"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all"
    >
      <g clip-path="url(#clip0_260_38)">
        <path
          d="M344.573 234.13C350.22 255.204 347.264 277.657 336.355 296.551C325.447 315.445 307.479 329.232 286.406 334.879"
          stroke="white"
          stroke-width={strokeWidth}
          stroke-linecap="round"
          stroke-linejoin="round"
          className="transition-all"
          style={{
            transitionDuration: "3000ms",
          }}
        />
        <path
          d="M256.164 248.498C270.191 244.74 278.516 230.321 274.757 216.293C269.344 196.093 260.179 202.5 244.342 208.144C228.506 213.787 220.2 215.877 223.959 229.905C227.718 243.932 242.136 252.257 256.164 248.498Z"
          fill="white"
          className="transition-all"
          style={{
            transitionDuration: "3000ms",
          }}
        />
        <path
          d="M194.655 416.238C230.428 434.331 272.705 438.758 314.456 426.719C399.231 402.229 449.822 313.926 428.18 228.387C422.841 207.245 413.353 187.375 400.268 169.932C387.182 152.489 370.759 137.822 351.954 126.782C333.149 115.743 312.337 108.552 290.728 105.628C269.119 102.703 247.145 104.104 226.082 109.747L212.839 113.296L227.033 166.268L83.2613 318.342L115.847 348.644C121.81 353.508 129.019 356.602 136.653 357.574C144.287 358.545 152.04 357.356 159.032 354.14C186.621 341.425 235.201 320.176 286.388 334.812L351.954 410.58"
          stroke="white"
          stroke-width={strokeWidth}
          stroke-linecap="round"
          stroke-linejoin="round"
          className="transition-all"
          style={{
            transitionDuration: "3000ms",
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_260_38">
          <rect
            width="438.726"
            height="438.726"
            fill="white"
            transform="translate(0 113.551) rotate(-15)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SignInPage() {
  const { isLogin } = useUser();
  const navigate = useNavigate();

  if (isLogin) {
    navigate("/");
  }

  return (
    <div className="flex h-[100dvh] w-[100dvw]">
      <div className="relative hidden lg:flex w-1/2 h-full hero-background justify-center items-center">
        <div className="">
          <MovingLogo />
        </div>

        <div className="absolute left-[32px] bottom-[52px]">
          <div className="text-xl text-gray-50">
            숭실대학교 오픈소스 API 프로젝트
          </div>
          <div className="text-sm text-gray-50 mt-2">- BlueSSU</div>
        </div>
      </div>
      <div className="relative h-full w-full lg:w-1/2 flex items-center justify-center">
        <AuthHeader />
        <div className="flex flex-col justify-center items-center max-w-[350px]">
          <div className="flex flex-col items-center">
            <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
              로그인 / 회원가입
            </div>
            <p className="text-muted-foreground text-sm">
              BlueSSU에 로그인/회원가입 하기
            </p>
          </div>
          <div className="flex flex-col gap-2 py-10 w-full">
            <SignInButton>BlueSSU 로그인</SignInButton>
          </div>
          <div className="text-muted-foreground text-sm text-center">
            계속 진행하면 BlueSSU의{" "}
            <Link
              to={"/terms"}
              className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition"
            >
              이용약관
            </Link>{" "}
            및{" "}
            <Link
              to={"/terms"}
              className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition"
            >
              개인정보 보호정책
            </Link>
            에 동의하는 것으로 간주됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
