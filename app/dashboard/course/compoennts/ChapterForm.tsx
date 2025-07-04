"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import {useCallback} from "react";
import { BsGithub } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { PiLinkedinLogo } from "react-icons/pi";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import {  TwitterIcon } from "lucide-react";
import { IoShare } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Share1Icon } from "@radix-ui/react-icons";
import NiwiTextEditor from "../../blog/components/niwi-text-editor/niwi-text-editor";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import {
  EyeOpenIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import {  useTransition } from "react";
import { IchapterDetails, IBlogForm } from "@/lib/types";
import { BsSave } from "react-icons/bs";
import { Chapterformschematype } from "../../blog/schema";
import Link from "next/link";
import logo from "../../../image.png"
import { Catagories, IModule } from "@/lib/types";
import { readCatogries , readmodulescourse } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";

export default function ChapterForm({
  id,
  onHandleSubmit,
  defaultlesson,
}: {
  id: string;
  defaultlesson: IchapterDetails;
  onHandleSubmit: (data: Chapterformschematype) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreview] = useState(false);
  const [categories, setCategories] = useState<Catagories[]>([]);
  const [modulescourse, setModulecourse] = useState<IModule>();
  const [editorResetKey, setEditorResetKey] = useState(0);

  const user = useUser((state) => state.user);
  // const [content, setContent] = useState<string>('');

  const form = useForm<Chapterformschematype>({
    mode: "all",
    defaultValues: {
      catagory_id: defaultlesson?.catagory_id || 0,
      chapter_name: defaultlesson?.chapter_name || "",
      content: defaultlesson?.content || "",
      course_id: defaultlesson?.course_id || "",
      created_at: defaultlesson?.created_at || "",
      description: defaultlesson?.content || "",
      instructor: defaultlesson?.instructor || "",
      module_id: defaultlesson?.module_id || "",
      chapterno: defaultlesson?.chapterno || "",
      slug: defaultlesson?.slug || " ",
      image: defaultlesson?.image || " ",
    },
  });

  const onSubmit = (data: Chapterformschematype) => {
    console.log(data);
    startTransition(() => {
      onHandleSubmit(data);
    });
  };
  useEffect(() => {
    // Fetch categories from Supabase backend
    fetchCategories();
    fetchmodulecourse();
  }, []);

  const onChangeValue = useCallback(
    (html: string, json: string, text: string) => {
      form.setValue("content", html);    },
    [],
  );

  const fetchCategories = async () => {
    try {
      const { data: Catagories } = await readCatogries();
      if (Catagories) {
        setCategories(Catagories);
      } } 
      catch (error) {
        console.log(error);
  };
};

const fetchmodulecourse = async () => {
  try {
    const { data: modulescourse } = await readmodulescourse(id);
    if (modulescourse) {
      setModulecourse(modulescourse);
    } } 
    catch (error) {
      console.log(error);
};
};
console.log(modulescourse);

  useEffect(() => {
  if (form.getValues().chapter_name && user?.id) {
      const slug = slugify(form.getValues().chapter_name, { lower: true }) + user?.id;
      const course_id = modulescourse?.course_id || "";
      form.setValue("slug", slug);
      form.setValue("instructor", user?.id);
      form.setValue("created_at", new Date().toISOString().slice(0, 16));
      form.setValue("module_id", id );
      form.setValue("course_id",  course_id )

    }
  }, [form.getValues().chapter_name, user?.id]);


  return (
    <Form {...form}>
    
        <div className="border-b p-5 flex items-center sm:justify-between flex-wrap  gap-2">
          <div className="flex items-center flex-wrap gap-5">
            <span
              onClick={() => {
                setPreview(!isPreview && !form.getFieldState("chapter_name").invalid);
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

          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            role="button"
            className={cn(
              "flex gap-2 text-white items-center border px-3 py-2 rounded-md border-green-500 disabled:border-gray-800  bg-zinc-800 transition-all group text-sm disabled:bg-gray-900",
              { "animate-spin": isPending }
            )}
            disabled={!form.formState.isValid}
          >
            <BsSave className="animate-bounce group-disabled:animate-none" />
            Save
          </Button>
        </div>



        {!isPreview ? (
          <div className="mx-[300px]">
            <FormField
              control={form.control}
              name="chapter_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full  break-words p-2 gap-2">
                      <Input
                        placeholder="Blog title"
                        {...field}
                        autoFocus
                        className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full "
                      />
                    </div>
                  </FormControl>

                  {form.getFieldState("chapter_name").invalid &&
                    form.getValues().chapter_name && (
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
                          className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full "
                          type="url"
                        />
                      </div>
                    </FormControl>

                    <div className="px-3">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="chapterno"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full  break-words p-2 gap-2">
                      <Input
                      type="number"
                        placeholder="chapter no "
                        {...field}
                        autoFocus
                        className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full "
                      />
                    </div>
                  </FormControl>

                  {form.getFieldState("chapterno").invalid &&
                    form.getValues().chapterno && (
                      <div className="px-2">
                        <FormMessage />
                      </div>
                    )}
                </FormItem>
              )}
            />



<FormField
  control={form.control}
  name="catagory_id"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <div className="w-full break-words p-2 gap-2">
          <label className="block font-bold mb-2" htmlFor="Category">
            Category
          </label>
          <select
            {...field}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </FormControl>

      {form.formState.errors.catagory_id && (
        <div className="px-2">
          <FormMessage>{form.formState.errors.catagory_id.message}</FormMessage>
        </div>
      )}
    </FormItem>
  )}
/>
            <div className=" p-2 gap-2">
              <div className=" contentclass">

              <div className="p-2 gap-2">
              <div className="contentclass">
                <NiwiTextEditor onChangeValue={onChangeValue} key={editorResetKey} />
              </div>
            </div>
     
              </div>
            </div>
          </div>
        ) : (

            <div className="">
            <div className="mx-[400px] ">
            <div className="">
              <div className="space-y-5 ">
                <h1 className="text-6xl  font-bold dark:text-gray-200">
                {form.getValues().chapter_name || "Untitled blog"}
                </h1>
                <div className=" flex justify-between px-1 py-2 mx-0 sm:mx-2 font-lg">
                  <div className="flex gap-2 ">
                    <div className="">
                      <Image
                        className="rounded-full px-1 py-1 "
                        width={60}
                        height={60}
                        alt="profile"
                        src={logo}
                      />
                    </div>
      
                    <div className="pt-2">
                      <p className="text-lg font-medium  dark:text-gray-400">
                       author
                      </p>
                      <p className="text-sm   font-medium  dark:text-gray-400">
                       14 may 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex pt-10 gap-3">
                    <Link target="_blank" href="google.com">
                      <BsGithub />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <BsInstagram />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <BsTwitter />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <PiLinkedinLogo />
                    </Link>
                    <p className="text-lg font-medium flex dark:text-gray-400"></p>
                  </div>
                </div>
      
                <div className="">
                  <hr className="border-gray-200" />
      
                  <div className="flex items-center justify-between mb-4 pt-2">
                    <div className="flex items-center space-x-4">
                      <button
                        className="ml-[60px] flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
                      >
                        <span>
                          <AiOutlineComment />{" "}
                        </span>
                      </button>
      
      
      
      
      
      
      
      
                    </div>
                    <div className="flex items-center space-x-4">
                    <button className="hello"
      >
        <span className="material-icons">
          {/* <PlayCircle onClick="pass" /> */}
        </span>
      </button>
      
      
                      <button className="text-gray-600 font-medium text-xl hover:text-gray-800 transition">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {" "}
                            <span className="material-icons">
                              <IoShare />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
      
      
      
                              <button className="flex pl-3 px-2">
                                <span className=" py-2">
                                  <Share1Icon />
                                </span>
                                <span className="flex ml-2 pt-1 ">Copy link</span>
                                <span className="ml-1">
                                  {" "}
                                  {/* <CopyButton id={blogUrl} /> */}
                                </span>
                              </button>
      
      
      
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <button
                  
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1 ">
                                  <TwitterIcon />
                                </span>
                                <span className="flex ml-2  "> Share on twiter</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button
                         
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1">
                                  <BsInstagram />{" "}
                                </span>
                                <span className="flex ml-2  "> Share on threads</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                            <DropdownMenuItem>
      
      
                              <button
                             
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1">
                                  <PiLinkedinLogo />{" "}
                                </span>
                                <span className="flex ml-2  ">Share on Linkdin</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </button>
      
                   <DropdownMenu>
                          <DropdownMenuTrigger>
                            <span className="material-icons">
                              <BsThreeDotsVertical />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link
                                className="font-medium text-green-400"
                                target="_blank"
                                href="google.com"
                              >
                                Follow Author
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-large text-red-700">
                              Report Article
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                  <hr className="border-gray-200 font-mono" />
                </div>
              </div>
      
              <div className="w-full px-8  mt-6 h-96 relative">
                <Image
                  priority
                  src={form.getValues().image}
                  alt="cover"
                  fill
                  className=" object-cover sm:w-[300px] object-center rounded-md border-[0.5px] border-zinc-600"
                  sizes="(max-width: 300px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div
  className="font-[20px]  mb-[20px] contentclass"
  dangerouslySetInnerHTML={{
    __html: form.getValues().content || "",
  }}
/>
            </div>
          </div>
          </div>
        )}
    </Form>
  );
}
