import { ProjectHead } from "@/components/ProjectHead/ProjectHead";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/containers/Header/Header";
import { useProject } from "@/hooks/useProject";
import {
    ExclamationTriangleIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    MinusIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";

function APISection() {
    const [isShowSecret, setIsShowSecret] = useState(false);

    return (
        <div className="space-y-6">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                API
            </h3>
            <div className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                    <Label>Client ID</Label>
                    <Input readOnly value={"1231231232"}></Input>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label>Client Secret</Label>
                    <div className="flex gap-1">
                        <Input
                            readOnly
                            value={isShowSecret ? "123123123" : "******"}
                        />
                        <Button
                            size={"icon"}
                            className="min-w-[36px] h-[36px]"
                            onClick={() => setIsShowSecret(!isShowSecret)}
                        >
                            {isShowSecret ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </Button>
                    </div>
                    <Button variant={"outline"} className="w-fit">
                        재발급
                    </Button>
                </div>
            </div>
        </div>
    );
}

function OAuthSection() {
    const redirectUrlRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [redirectUrls, setRedirectUrls] = useState<string[]>([]);

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
        <div className="space-y-6">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                OAuth
            </h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between border rounded p-4">
                    <Label>OAuth 활성화</Label>
                    <Switch />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
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
                    <Button
                        variant={"outline"}
                        className="w-fit"
                        onClick={() => {
                            addRedirectUrl();
                        }}
                    >
                        추가
                    </Button>
                </div>
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
                    <Alert>
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>WIP (Working In Progress)</AlertTitle>
                        <AlertDescription>
                            이 기능들은 아직 개발 중이에요
                        </AlertDescription>
                    </Alert>
                    <APISection />
                    <OAuthSection />
                </div>
            </div>
        </>
    );
}
