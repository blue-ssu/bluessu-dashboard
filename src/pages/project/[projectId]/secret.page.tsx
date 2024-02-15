import { ProjectHead } from "@/components/ProjectHead/ProjectHead";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/containers/Header/Header";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useProject } from "@/hooks/useProject";
import { client } from "@/lib/client";
import { EyeClosedIcon, EyeOpenIcon, MinusIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function GenerateClientSecretDialog() {
    const { project, isOwner } = useProject();
    const [isOpen, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const isMobile = useIsMobile();

    const { mutate: generateSecret, isPending } = useMutation({
        mutationFn: () =>
            client.CoreGenerateProjectClientSecret({
                projectId: +(project?.id || ""),
            }),
        onSuccess: () => {
            toast.success("토큰을 생성했어요.");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["projects", project?.id],
            });
        },
        onError: (error) => {
            console.error(error);
            toast.error("토큰 생성에 실패했어요.");
        },
    });

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={!isOwner}
                        className="w-fit"
                    >
                        재발급
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>ClientSecret 재발급</DrawerTitle>
                        <DrawerDescription>
                            토큰을 재발급하면 기존 토큰을 더 이상 사용할 수
                            없고, 새로운 토큰이 생성되요. 토큰을 안전하게
                            보관해주세요.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">취소</Button>
                        </DrawerClose>
                        <Button
                            onClick={() => generateSecret()}
                            disabled={isPending}
                        >
                            재발급
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={!isOwner} className="w-fit">
                    재발급
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ClientSecret 재발급</DialogTitle>
                    <DialogDescription>
                        토큰을 재발급하면 기존 토큰을 더 이상 사용할 수 없고,
                        새로운 토큰이 생성되요. 토큰을 안전하게 보관해주세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-1">
                    <DialogClose asChild>
                        <Button variant="outline" className="">
                            취소
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => generateSecret()}
                        disabled={isPending}
                    >
                        재발급
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function APISection() {
    const { project } = useProject();
    const [isShowSecret, setIsShowSecret] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    API
                </h3>
                <a href="/" className="text-blue-500 text-sm hover:underline">
                    API 가이드
                </a>
            </div>
            <div className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                    <Label>Client ID</Label>
                    <Input readOnly value={project?.clientId}></Input>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label>Client Secret</Label>
                    <div className="flex gap-1">
                        <Input
                            readOnly
                            value={
                                isShowSecret
                                    ? project?.clientSecret ||
                                      "ClientSecret이 없습니다"
                                    : "*************"
                            }
                        />
                        <Button
                            size={"icon"}
                            className="min-w-[36px] h-[36px]"
                            onClick={() => setIsShowSecret(!isShowSecret)}
                        >
                            {isShowSecret ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </Button>
                    </div>
                    <GenerateClientSecretDialog />
                </div>
            </div>
        </div>
    );
}

function OAuthRedirectURLSection() {
    const { project } = useProject();
    const queryClient = useQueryClient();

    const redirectUrlRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [redirectUrls, setRedirectUrls] = useState<string[]>([]);

    const isRedirectUrlsChanged = () => {
        if (project?.redirectURLs.length !== redirectUrls.length) {
            return true;
        }
        for (let i = 0; i < project?.redirectURLs.length; i++) {
            if (project?.redirectURLs[i] !== redirectUrls[i]) {
                return true;
            }
        }
        return false;
    };

    const {
        mutate: updateProjectRedirectURLs,
        isPending: isUpdateProjectRedirectURLLoading,
    } = useMutation({
        mutationFn: (redirectUrls: string[]) => {
            return client.CoreUpdateProject({
                projectId: +(project?.id || ""),
                redirectURLs: redirectUrls,
            });
        },
        onSuccess: () => {
            toast.success("리다이렉트 URL을 성공적으로 변경했어요.");
            queryClient.invalidateQueries({
                queryKey: ["projects", project?.id],
            });
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof APIResponseError) {
                const message = error.body.message;
                toast.error(
                    typeof message === "object" ? message.join(", ") : message
                );
                return;
            }
            toast.error("리다이렉트 URL 변경에 실패했어요.");
        },
    });

    useEffect(() => {
        setRedirectUrls(project?.redirectURLs || []);
    }, [project]);

    const addRedirectUrl = () => {
        setRedirectUrls([...redirectUrls, ""]);
        setTimeout(() => {
            redirectUrlRefs.current[redirectUrls.length]?.focus();
        });
    };

    const removeRedirectUrl = (index: number) => {
        const newRedirectUrls = [...redirectUrls];
        newRedirectUrls.splice(index, 1);
        setRedirectUrls(newRedirectUrls);
        setTimeout(() => {
            redirectUrlRefs.current[index === 0 ? 0 : index - 1]?.focus();
        });
    };

    return (
        <div className="grid w-full items-center gap-1.5">
            <Label>Redirect URL</Label>
            {redirectUrls.map((url, index) => (
                <div className="flex gap-1" key={index}>
                    <Input
                        key={index}
                        value={url}
                        onChange={(e) => {
                            const newRedirectUrls = [...redirectUrls];
                            newRedirectUrls[index] = e.target.value;
                            setRedirectUrls(newRedirectUrls);
                        }}
                        onKeyDown={(e) => {
                            redirectUrls[index] &&
                                e.key === "Enter" &&
                                addRedirectUrl();

                            !redirectUrls[index] &&
                                e.key === "Backspace" &&
                                removeRedirectUrl(index);
                        }}
                        ref={(ref) => {
                            redirectUrlRefs.current[index] = ref;
                        }}
                        placeholder="https://"
                    />
                    <Button
                        size={"icon"}
                        className="w-[36px] h-[36px]"
                        disabled={redirectUrls.length === 1}
                        onClick={() => {
                            const newRedirectUrls = [...redirectUrls];
                            newRedirectUrls.splice(index, 1);
                            setRedirectUrls(newRedirectUrls);
                        }}
                    >
                        <MinusIcon />
                    </Button>
                </div>
            ))}
            <div className="flex justify-between">
                <Button
                    variant={"outline"}
                    className="w-fit"
                    onClick={() => {
                        addRedirectUrl();
                    }}
                >
                    추가
                </Button>
                <Button
                    disabled={
                        isUpdateProjectRedirectURLLoading ||
                        !isRedirectUrlsChanged()
                    }
                    onClick={() => updateProjectRedirectURLs(redirectUrls)}
                >
                    적용
                </Button>
            </div>
        </div>
    );
}

function OAuthStatusSection() {
    const { project } = useProject();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (value: boolean) => {
            return client.CoreUpdateProject({
                projectId: +(project?.id || ""),
                oAuthStatus: value ? "Active" : "Inactive",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", project?.id],
            });
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof APIResponseError) {
                const message = error.body.message;
                toast.error(
                    typeof message === "object" ? message.join(", ") : message
                );
                return;
            }
            toast.error("OAuth 상태 변경에 실패했어요.");
        },
    });

    return (
        <div className="flex items-center justify-between border rounded p-4">
            <Label>OAuth 활성화</Label>
            <Switch
                checked={project?.oAuthStatus === "Active"}
                onCheckedChange={(e) => mutate(e)}
                disabled={isPending}
            />
        </div>
    );
}

function OAuthSection() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    OAuth
                </h3>
                <a href="/" className="text-blue-500 text-sm hover:underline">
                    OAuth 가이드
                </a>
            </div>
            <div className="space-y-6">
                <OAuthStatusSection />
                <OAuthRedirectURLSection />
            </div>
        </div>
    );
}

export function ProjectSecretPage() {
    const { project } = useProject();

    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <ProjectHead project={project} menu="secret" />

                <div className="py-8 max-w-[440px] space-y-10">
                    <APISection />
                    <OAuthSection />
                </div>
            </div>
        </>
    );
}
