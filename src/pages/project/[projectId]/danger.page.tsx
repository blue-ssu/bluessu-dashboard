import { ProjectHead } from "@/components/ProjectHead/ProjectHead";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Header } from "@/containers/Header/Header";
import { useProject } from "@/hooks/useProject";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import { client } from "@/lib/client";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DeleteProjectDialog({ projectId }: { projectId?: number }) {
    const { project, isOwner } = useProject(projectId);

    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const { mutate: deleteProject, isLoading } = useMutation(
        () => client.CoreDeleteProject({ projectId: +(project?.id || "") }),
        {
            onSuccess: () => {
                toast.success("프로젝트를 삭제했어요.");
                navigate("/projects");
                setOpen(false);
            },
            onError: (error) => {
                console.error(error);
                toast.error("프로젝트 삭제에 실패했어요.");
            },
        }
    );

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="destructive" disabled={!isOwner}>
                        삭제
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>프로젝트 삭제</DrawerTitle>
                        <DrawerDescription>
                            더 이상 프로젝트를 사용하지 않는다면 프로젝트를
                            삭제할 수 있어요. 이 작업은 되돌릴 수 없으니
                            신중하게 결정해주세요.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">취소</Button>
                        </DrawerClose>
                        <Button
                            variant="destructive"
                            onClick={() => deleteProject()}
                            disabled={isLoading}
                        >
                            프로젝트 삭제
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={!isOwner}>
                    삭제
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>프로젝트 삭제</DialogTitle>
                    <DialogDescription>
                        더 이상 프로젝트를 사용하지 않는다면 프로젝트를 삭제할
                        수 있어요. 이 작업은 되돌릴 수 없으니 신중하게
                        결정해주세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-1">
                    <DialogClose asChild>
                        <Button variant="outline" className="">
                            취소
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={() => deleteProject()}
                        disabled={isLoading}
                    >
                        프로젝트 삭제
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function ProjectDangerPage() {
    const { project, projectId, isOwner } = useProject();

    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <ProjectHead project={project} menu="danger" />

                <div className="py-8 max-w-[440px] space-y-10">
                    <div className="space-y-2">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Danger Zone
                        </h3>
                        <div className="flex items-center justify-between p-4 border rounded">
                            <div className="">
                                <Label>프로젝트 삭제</Label>
                                {isOwner ? (
                                    <></>
                                ) : (
                                    <div className="text-muted-foreground text-sm">
                                        Owner만 삭제할 수 있어요
                                    </div>
                                )}
                            </div>
                            <DeleteProjectDialog projectId={projectId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
