import { ProjectHead } from "@/components/ProjectHead/ProjectHead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Header } from "@/containers/Header/Header";
import { useProject } from "@/hooks/useProject";
import { MemberObject, client } from "@/lib/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { APIResponseError } from "endpoint-client";
import { toast } from "sonner";

function MemberItem({ member }: { member: MemberObject }) {
    const queryClient = useQueryClient();

    const { projectId } = useProject();
    const { mutate: removeMember } = useMutation({
        mutationFn: () =>
            client.CoreRemoveMemberFromProject({
                projectId: projectId,
                memberId: member.id,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", projectId],
            });
            toast.success("멤버를 성공적으로 삭제했습니다.");
        },
        onError: (error) => {
            if (error instanceof APIResponseError) {
                if (error.body.code === "cannot_remove_owner") {
                    toast.error("프로젝트의 소유자는 삭제할 수 없어요.");
                    return;
                }
            }

            console.error(error);
            toast.error("멤버 삭제에 실패했어요.");
        },
    });

    const { mutate: changeRole } = useMutation({
        mutationFn: (role: "Member" | "Owner") =>
            client.CoreUpdateMemberRole({
                projectId: projectId,
                memberId: member.id,
                role: role,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", projectId],
            });
            toast.success("멤버의 역할을 성공적으로 변경했습니다.");
        },
        onError: (error) => {
            if (error instanceof APIResponseError) {
                if (error.body.code === "cannot_remove_last_owner") {
                    toast.error(
                        "프로젝트의 마지막 소유자는 역할을 변경할 수 없어요"
                    );
                    return;
                }
            }
            console.error(error);
            toast.error("멤버 역할 변경에 실패했어요.");
        },
    });

    return (
        <TableRow>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="text-start">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
                                    <Avatar className="w-[36px] h-[36px]">
                                        <AvatarImage
                                            src={member.profileImage}
                                            alt="프로젝트 아이콘"
                                        />
                                        <AvatarFallback>
                                            {member.name}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex flex-col gap-1 justify-center leading-none">
                                    <div className="font-bold leading-none">
                                        {member.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground leading-none">
                                        {member.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[230px] p-2 space-y-2">
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-[32px] h-[32px]">
                                <AvatarImage src={member?.profileImage} />
                                <AvatarFallback>{member?.name}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold">
                                    {member?.name}
                                </div>
                                <div className="leading-tight">
                                    <div className="text-[12px] text-muted-foreground">
                                        {member.user?.department}
                                    </div>
                                    <div className="text-[12px] text-muted-foreground">
                                        {member.user?.studentId}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                            {dayjs(member.createdAt).format(
                                "YYYY-MM-DD에 들어옴"
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            <TableCell className="w-[40px]">
                {member.role === "Owner" ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <DotsHorizontalIcon className="w-[20px] h-[20px]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {member.role === "Owner" ? (
                                <DropdownMenuItem
                                    onClick={() => changeRole("Member")}
                                >
                                    Member로 변경
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    onClick={() => changeRole("Owner")}
                                >
                                    Owner로 변경
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                className="text-red-500 hover:text-red-500"
                                onClick={() => removeMember()}
                            >
                                멤버 삭제
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <></>
                )}
            </TableCell>
        </TableRow>
    );
}

export function ProjectMemberPage() {
    const { project, members } = useProject();

    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <ProjectHead project={project} menu="member" />
                <div className="space-y-6 py-4"></div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>유저</TableHead>
                            <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members?.map((member) => (
                            <MemberItem member={member} key={member.user.id} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
