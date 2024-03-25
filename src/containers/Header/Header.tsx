import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import BlueSSULogo from "../../assets/bluessu.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

export function HeaderUser() {
  const { user, isLogin } = useUser({
    requireLogin: true,
  });

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!isLogin) {
    return (
      <Button className="h-[32px]" asChild>
        <Link to={"/auth/signin"}>로그인</Link>
      </Button>
    );
  }

  if (!user) {
    return <Skeleton className="w-[32px] h-[32px] rounded-full" />;
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-[32px] h-[32px]">
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[230px]">
          <DropdownMenuLabel>
            <div className="flex items-center space-x-2">
              <Avatar className="w-[32px] h-[32px]">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-sm font-semibold">{user?.name}</div>
                <div className="leading-tight">
                  <div className="text-[12px] text-muted-foreground">
                    {user?.department}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    {user?.studentId}
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Header() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] w-full flex justify-between items-center p-4">
        <Link className="flex items-center" to={"/"}>
          <img src={BlueSSULogo} alt="BlueSSU Logo" className="w-7" />
          <div className="text font-semibold ml-2">BlueSSU</div>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size={"sm"} className="text-[14px]" asChild>
            <a href="https://bluessu.notion.site" target="_blank">
              문서
            </a>
          </Button>
          <HeaderUser />
        </div>
      </div>
    </div>
  );
}
