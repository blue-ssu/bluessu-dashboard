import { Header } from "@/containers/Header/Header";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

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
    url: z.optional(z.string().url()),
    iconURL: z.optional(z.string().url()),
    termsURL: z.optional(z.string().url()),
    privacyURL: z.optional(z.string().url()),
});

export function CreateProjectForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(
        (values: z.infer<typeof formSchema>) =>
            client.CoreCreateProject({
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
                toast.success(<>{res.project.name} 프로젝트를 생성했어요!</>);
                navigate(`/projects/${res.project.id}`);
            },
            onError: (err) => {
                console.error(err);
                toast.error(
                    "프로젝트 생성에 실패했어요. 개발자 콘솔을 확인해주세요"
                );
            },
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-[440px]"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>이름*</FormLabel>
                            <FormControl>
                                <Input placeholder="이름" {...field} />
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
                                <Input placeholder="https://" {...field} />
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
                                <Input placeholder="https://" {...field} />
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
                                <Input placeholder="https://" {...field} />
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
                                <Input placeholder="https://" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export function CreateProjectPage() {
    return (
        <>
            <Header />
            <div className="max-w-[900px] w-auto m-auto p-[16px]">
                <div className="flex flex-col pt-[60px] pb-[60px] gap-1 justify-center">
                    <Link
                        className="flex items-center gap-1 w-fit p-1 hover:bg-gray-100 rounded cursor-pointer"
                        to="/projects"
                    >
                        <ArrowLeftIcon />
                        프로젝트
                    </Link>
                    <h1 className="font-bold text-5xl">새 프로젝트</h1>
                </div>
                <div className="">
                    <CreateProjectForm />
                </div>
            </div>
        </>
    );
}
