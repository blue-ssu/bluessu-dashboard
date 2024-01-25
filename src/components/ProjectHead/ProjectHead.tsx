import { ProjectObject } from "@/lib/client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";

export function ProjectHead({
    project,
    menu,
}: {
    project?: ProjectObject;
    menu: "index" | "secret" | "member" | "danger";
}) {
    const navigate = useNavigate();

    const onChange = (e: string) => {
        if (e === "index") {
            navigate(`/projects/${project?.id}`);
        } else if (e === "secret") {
            navigate(`/projects/${project?.id}/secret`);
        } else if (e === "member") {
            navigate(`/projects/${project?.id}/member`);
        } else if (e === "danger") {
            navigate(`/projects/${project?.id}/danger`);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col pt-[60px] pb-[20px] gap-1 justify-center">
                <Link
                    className="flex items-center gap-1 w-fit p-1 hover:bg-gray-100 rounded cursor-pointer"
                    to="/projects"
                >
                    <ArrowLeftIcon />
                    프로젝트
                </Link>
                {project ? (
                    <div className="flex items-center gap-2">
                        <img
                            src={project?.iconURL}
                            alt=""
                            className="w-[40px] h-[40px]"
                        />
                        <h1 className="font-bold text-5xl">{project?.name}</h1>
                    </div>
                ) : (
                    <Skeleton className="w-[200px] h-[48px]" />
                )}
            </div>
            <Tabs defaultValue={menu} onValueChange={(e) => onChange(e)}>
                <TabsList className="grid w-full max-w-[440px] grid-cols-4">
                    <TabsTrigger value="index">기본 정보</TabsTrigger>
                    <TabsTrigger value="secret">시크릿</TabsTrigger>
                    <TabsTrigger value="member">멤버</TabsTrigger>
                    <TabsTrigger value="danger">위험</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
