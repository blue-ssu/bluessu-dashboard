import { ProjectHead } from "@/components/ProjectHead/ProjectHead";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/containers/Header/Header";
import { useProject } from "@/hooks/useProject";
import { CoreUpdateProjectBodyParameters, client } from "@/lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "2글자 이상 입력해주세요.",
        })
        .max(32, {
            message: "32글자 이하로 입력해주세요.",
        }),
    description: z.string().max(128, {
        message: "128글자 이하로 입력해주세요.",
    }),
    url: z.string().url().or(z.literal("")),
    iconURL: z.string().url().or(z.literal("")),
    termsURL: z.string().url().or(z.literal("")),
    privacyURL: z.string().url().or(z.literal("")),
});

export function ProjectPage() {
    const queryClient = useQueryClient();
    const { projectId, project, isOwner } = useProject();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            url: "",
            iconURL: "",
            termsURL: "",
            privacyURL: "",
        },
    });

    useEffect(() => {
        if (project)
            form.reset({
                name: project.name,
                description: project.description,
                url: project.url || "",
                iconURL: project.iconURL || "",
                termsURL: project.termsURL || "",
                privacyURL: project.privacyURL || "",
            });
    }, [form, project]);

    const { mutate, isLoading } = useMutation(
        (values: CoreUpdateProjectBodyParameters) =>
            client.CoreUpdateProject({
                projectId: +(projectId || ""),
                name: values.name,
                description: values.description,
                url: values.url,
                iconURL: values.iconURL,
                termsURL: values.termsURL,
                privacyURL: values.privacyURL,
            }),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["projects"]);
                toast.success(
                    <>{res.project.name} 프로젝트를 업데이트했어요!</>
                );
            },
            onError: (err) => {
                console.error(err);
                toast.error(
                    "프로젝트 생성에 실패했어요. 개발자 콘솔을 확인해주세요"
                );
            },
        }
    );

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            name: values.name,
            description: values.description,
            url: values.url || undefined,
            iconURL: values.iconURL || undefined,
            termsURL: values.termsURL || undefined,
            privacyURL: values.privacyURL || undefined,
        });
    };

    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <ProjectHead project={project} menu="index" />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 max-w-[440px] py-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>이름*</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="이름"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>설명*</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="프로젝트 설명"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        사용하는 유저에게 보여지는 설명입니다.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>프로젝트 URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="iconURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>아이콘 URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacyURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>개인정보처리방침 URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="termsURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>이용약관 URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://"
                                            readOnly={!isOwner}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isOwner ? (
                            <Button type="submit" disabled={isLoading}>
                                수정
                            </Button>
                        ) : (
                            <Button type="submit" disabled={true}>
                                프로젝트 수정은 Owner만 가능합니다
                            </Button>
                        )}
                    </form>
                </Form>
            </div>
        </>
    );
}
