"use client"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import dynamic from 'next/dynamic';
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
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import Image from "next/image";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import {
    EyeOpenIcon,
    Pencil1Icon,
    RocketIcon,
    StarIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useRef, useTransition } from "react";
import { IBlogDetial, IBlogForm } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { BlogFormSchemaType } from "../schema";


export default function BlogForm({
    onblogsubmit,
    defaultBlog,
}: {
    defaultBlog: IBlogDetial;
    onblogsubmit: (data: BlogFormSchemaType) => void;
}) {
    const [isPending, startTransition] = useTransition();
    const [isPreview, setPreview] = useState(false);
    const user = useUser((state) => state.user);
    // const [content, setContent] = useState<string>('');

    const form = useForm<BlogFormSchemaType>({
        mode: "all",
        defaultValues: {
            title: defaultBlog?.title ,
            image: defaultBlog?.image || '',
            status: defaultBlog?.status || true,
            author: defaultBlog?.author || '',
			content:defaultBlog?.content || '',
            meta_title: defaultBlog?.meta_tiltle || '',
            meta_description: defaultBlog?.meta_description   || '',
            created_at: defaultBlog?.created_at || '',
            slug: defaultBlog?.slug || '',
            coments_enabled: defaultBlog?.coments_enabled || false,
        },
    });

    const onSubmit = (data: BlogFormSchemaType) => {
		console.log(data);
        console.log("button pressed")
        startTransition(() => {
            onblogsubmit(data);
        });
    };

    useEffect(() => {
        if (form.getValues().title && user?.id) {
            const slug = slugify(form.getValues().title, { lower: true }) + user?.id;
			const meta_title = form.getValues().title
			const meta_description = form.getValues().content
            form.setValue("slug", slug);
			form.setValue("meta_title", meta_title);
			form.setValue("meta_description", meta_description);
            console.log(slug);
            form.setValue("author", user?.id);
            form.setValue("created_at", new Date().toISOString().slice(0, 16));
        }
    }, [form.getValues().title, user?.id]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
            ["color"],
            ["code-block"],
        ],
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full pt-[100px] border pb-5 rounded-md"
            >
                <div className="border-b p-5 flex items-center sm:justify-between flex-wrap sm:flex-row gap-2">
                    <div className="flex items-center flex-wrap gap-5">
                        <span
                            onClick={() => {
                                setPreview(!isPreview && !form.getFieldState("image").invalid);
                            }}
                            role="button"
                            tabIndex={0}
                            className="flex gap-2 text-white items-center border px-3 py-2 rounded-md hover:border-zinc-400 transition-all bg-zinc-800 text-sm"
                        >
                            {!isPreview ? (
                                <>
                                    <EyeOpenIcon />
                                    Preview
                                </>
                            ) : (
                                <>
                                    <Pencil1Icon />
                                    Edit
                                </>
                            )}
                        </span>
                    </div>

                    <button
                        type="submit"
                        role="button"
                        className={cn(
                            "flex gap-2 text-white items-center border px-3 py-2 rounded-md border-green-500 disabled:border-gray-800  bg-zinc-800 transition-all group text-sm disabled:bg-gray-900",
                            { "animate-spin": isPending }
                        )}
                        disabled={!form.formState.isValid}
                    >
                        <BsSave className="animate-bounce group-disabled:animate-none" />
                        Save
                    </button>
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="w-full flex break-words p-2 gap-2">
                                    <Input
                                        placeholder="Blog title"
                                        {...field}
                                        autoFocus
                                        className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full lg:w-1/2"
                                    />
                                    <div className="lg:px-10 w-1/2 lg:block hidden">
                                        <h1 className="text-3xl font-bold dark:text-gray-200">
                                            {form.getValues().title || "Untitled blog"}
                                        </h1>
                                    </div>
                                </div>
                            </FormControl>

                            {form.getFieldState("title").invalid && form.getValues().title && (
                                <div className="px-2">
                                    <FormMessage />
                                </div>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <div className="w-full flex divide-x p-2 gap-2 items-center">
                                        <Input
                                            placeholder="🔗 Image url"
                                            {...field}
                                            className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full lg:w-1/2"
                                            type="url"
                                        />
                                        <div className="relative px-10 w-1/2 lg:block hidden">
                                            {isPreview ? (
                                                <div className="mx-auto w-full lg:w-4/5">
                                                    <div className="mx-auto w-full h-80 relative mt-10 border rounded-md">
                                                        {/* <ImgaeEror src={form.getValues().image} /> */}
                                                        <img src={form.getValues().image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-400">
                                                    👆 click on preview to see image
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </FormControl>

                                <div className="px-3">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        );
                    }}
                />

                <div className="w-full flex p-2 gap-2">
                    <div className="w-full">
					<ReactQuill
                            theme="bubble"
                            value={form.getValues().content}
                            onChange={(value) => form.setValue('content', value)}
                            modules={modules}
                            placeholder="Blog content"
                        />
                    </div>
                    {isPreview && (
                        <div className="w-full">
                            <MarkdownPreview content={form.getValues().content} />
                        </div>
                    )}
                </div>
            </form>
        </Form>
    );
}

const ImgaeEror = ({ src }: { src: string }) => {
    try {
        return <Image src={src} alt="" width={100} height={100} />;
    } catch {
        return <h1>Invalid</h1>;
    }
};
