import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/containers/Header/Header";
import { MemberObject, client } from "@/lib/client";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function ProjectItem({ member }: { member: MemberObject }) {
    const project = member.project;

    return (
        <Link to={`/projects/${project?.id}`}>
            <motion.div
                className="flex flex-col border shadow-sm hover:shadow rounded p-4 cursor-pointer gap-4 min-w-[250px] w-full"
                whileHover={{
                    y: -4,
                }}
            >
                <div className="flex gap-1 items-center">
                    <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
                        <img
                            src={project?.iconURL}
                            alt="프로젝트 아이콘"
                            className="w-[36px] h-[36px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1 justify-center leading-none">
                        <div className="font-bold leading-none">
                            {project?.name}
                        </div>
                        <div className="text-sm text-muted-foreground leading-none">
                            {member.role}
                        </div>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground">
                    {project?.description}
                </div>
            </motion.div>
        </Link>
    );
}

function NewProjectItem() {
    return (
        <Link
            className="flex border-2 border-dashed rounded p-4 cursor-pointer items-center justify-center gap-1 min-w-[250px] w-full"
            to="/projects/create"
        >
            <PlusIcon className="w-[20px] h-[20px]" />새 프로젝트 만들기
        </Link>
    );
}

function Menu({
    searchText,
    setSearchText,
}: {
    searchText: string;
    setSearchText: (text: string) => void;
}) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between gap-[4px]">
            <Button onClick={() => navigate("/projects/create")}>
                <PlusIcon />새 프로젝트
            </Button>
            <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="max-w-[200px]"
            />
        </div>
    );
}

export function ProjectsPage() {
    const [searchText, setSearchText] = useState("");

    const { data } = useQuery(["user", "me", "member"], () =>
        client.CoreListUserMember({ userId: "me" })
    );

    const members = data
        ? data?.members.filter((member) =>
              member?.project?.name.includes(searchText)
          )
        : undefined;

    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <div className="flex h-[200px] items-center">
                    <h1 className="font-bold text-5xl">프로젝트</h1>
                </div>
                <Menu searchText={searchText} setSearchText={setSearchText} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 py-5">
                    {members &&
                        members.map((member) => (
                            <ProjectItem
                                key={member?.project?.id}
                                member={member}
                            />
                        ))}
                    <NewProjectItem />
                </div>
            </div>
        </>
    );
}
