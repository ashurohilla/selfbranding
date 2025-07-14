"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback, useTransition } from "react";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IBlogDetial } from "@/lib/types";
import { BlogFormSchemaType } from "../schema";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MdxEditor = dynamic(() => import("@/components/editor/mdx-editor"), { ssr: false });
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "../../../image.png";
import { 
  Terminal, 
  Code, 
  Eye, 
  Edit3, 
  Save, 
  FileText, 
  User, 
  Calendar,
  Hash,
  Globe,
  MessageCircle,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Loader2,
  Github,
  Instagram,
  Twitter,
  Linkedin,
  Share2,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogFormProps {
  defaultBlog: IBlogDetial;
  onblogsubmit: (data: BlogFormSchemaType) => void;
}

export default function BlogForm({ onblogsubmit, defaultBlog }: BlogFormProps) {
  const [isPreview, setPreview] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useUser((state) => state.user);

  const form = useForm<BlogFormSchemaType>({
    mode: "all",
    defaultValues: {
      title: defaultBlog?.title || "",
      image: defaultBlog?.image || "",
      status: defaultBlog?.status || true,
      author: defaultBlog?.author || "",
      content: defaultBlog?.content || "",
      meta_title: defaultBlog?.meta_tiltle || "",
      meta_description: defaultBlog?.meta_description || "",
      created_at: defaultBlog?.created_at || "",
      slug: defaultBlog?.slug || "",
      coments_enabled: defaultBlog?.coments_enabled || false,
    },
  });

  // Update time every second for terminal feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = (data: BlogFormSchemaType) => {
    startTransition(() => {
      onblogsubmit(data);
    });
  };

  const onChangeValue = useCallback((markdown: string) => {
    form.setValue("content", markdown);
    form.setValue("meta_description", markdown.slice(0, 160));
  }, [form]);

  useEffect(() => {
    if (form.getValues().title && user?.id) {
      const slug = slugify(form.getValues().title, { lower: true }) + user?.id;
      form.setValue("slug", slug);
      form.setValue("meta_title", form.getValues().title);
      form.setValue("author", user?.id);
      form.setValue("created_at", new Date().toISOString().slice(0, 16));
    }
  }, [form.getValues().title, user?.id, form]);

  const formStatus = form.formState.isValid ? "READY" : "INVALID";
  const wordCount = form.getValues().content?.length || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-green-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold">BLOG_EDITOR_EDIT v2.1.0</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-sm text-green-300">
            {currentTime.toLocaleTimeString()} | USER: {user?.email || "GUEST"}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-b border-green-500/20 p-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-green-300">STATUS:</span>
              <span className={`font-bold ${formStatus === "READY" ? "text-green-400" : "text-red-400"}`}>
                {formStatus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-300">MODE:</span>
              <span className="text-yellow-400 font-bold">
                {isPreview ? "PREVIEW" : "EDIT"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-300">WORDS:</span>
              <span className="text-blue-400 font-bold">{wordCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            <span className="text-green-300">
              {isPending ? "SAVING..." : "IDLE"}
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        {/* Control Panel */}
        <div className="bg-gray-800 border-b border-green-500/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => setPreview(!isPreview && !form.getFieldState("image").invalid)}
                className="bg-gray-700 hover:bg-gray-600 border border-green-500/30 text-green-400 font-mono"
              >
                {isPreview ? (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    [E]dit
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    [P]review
                  </>
                )}
              </Button>

              {/* Settings Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.getValues().status}
                    onCheckedChange={(checked) => form.setValue("status", checked)}
                  />
                  <span className="text-green-300 text-sm">PUBLISHED</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.getValues().coments_enabled}
                    onCheckedChange={(checked) => form.setValue("coments_enabled", checked)}
                  />
                  <span className="text-green-300 text-sm">COMMENTS</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid || isPending}
              className="bg-green-600 hover:bg-green-700 text-gray-900 font-mono font-bold"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  SAVING...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  [S]ave
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {!isPreview ? (
              <>
                {/* Title Input */}
                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-bold">BLOG.TITLE</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter blog title..."
                            {...field}
                            autoFocus
                            className="bg-gray-900 border-green-500/30 text-green-400 placeholder-green-600 font-mono focus:border-green-400 text-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Input */}
                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-bold">COVER.IMAGE</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="🔗 Image URL..."
                            {...field}
                            type="url"
                            className="bg-gray-900 border-green-500/30 text-green-400 placeholder-green-600 font-mono focus:border-green-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Metadata Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">SLUG</span>
                    </div>
                    <div className="text-yellow-400 text-sm font-mono break-all">
                      {form.getValues().slug || "auto-generated"}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">AUTHOR</span>
                    </div>
                    <div className="text-blue-400 text-sm font-mono">
                      {user?.email || "Unknown"}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">CREATED</span>
                    </div>
                    <div className="text-purple-400 text-sm font-mono">
                      {form.getValues().created_at ? 
                        new Date(form.getValues().created_at).toLocaleDateString() : 
                        "Now"
                      }
                    </div>
                  </div>
                </div>

                {/* Editor Panel */}
                <div className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden">
                  <div className="bg-gray-700 px-4 py-3 border-b border-green-500/20">
                    <div className="flex items-center gap-3">
                      <Code className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 font-bold">EDITOR.MDX</span>
                      <div className="flex items-center gap-2 ml-auto">
                        <div className={`w-2 h-2 rounded-full ${
                          wordCount > 0 ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <span className="text-xs text-green-300">
                          {wordCount > 0 ? 'ACTIVE' : 'EMPTY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="min-h-[500px]">
                      <MdxEditor
                        key="editor"
                        defaultValue={form.getValues().content || ""}
                        onChange={onChangeValue}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Preview Mode */
              <div className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-4 py-3 border-b border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-bold">PREVIEW.LIVE</span>
                  </div>
                </div>

                <div className="p-6 bg-gray-900">
                  <div className="max-w-4xl mx-auto">
                    {/* Blog Header */}
                    <div className="space-y-6 mb-8">
                      <h1 className="text-5xl font-bold text-green-400 leading-tight">
                        {form.getValues().title || "Untitled Blog"}
                      </h1>
                      
                      {/* Author Info */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-4">
                          <Image
                            className="rounded-full border-2 border-green-500/30"
                            width={50}
                            height={50}
                            alt="profile"
                            src={logo}
                          />
                          <div>
                            <p className="text-green-300 font-medium">Author</p>
                            <p className="text-green-600 text-sm">
                              {form.getValues().created_at ? 
                                new Date(form.getValues().created_at).toLocaleDateString() : 
                                "Today"
                              }
                            </p>
                          </div>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                          <Link href="#" className="text-green-400 hover:text-green-300 transition-colors">
                            <Github className="w-5 h-5" />
                          </Link>
                          <Link href="#" className="text-green-400 hover:text-green-300 transition-colors">
                            <Instagram className="w-5 h-5" />
                          </Link>
                          <Link href="#" className="text-green-400 hover:text-green-300 transition-colors">
                            <Twitter className="w-5 h-5" />
                          </Link>
                          <Link href="#" className="text-green-400 hover:text-green-300 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">Comments</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="text-green-400 hover:text-green-300 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-green-500/30">
                              <DropdownMenuLabel className="text-green-300">Share Article</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-green-500/20" />
                              <DropdownMenuItem className="text-green-400 hover:bg-gray-700">
                                <Share2 className="w-4 h-4 mr-2" />
                                Copy Link
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-green-400 hover:bg-gray-700">
                                <Twitter className="w-4 h-4 mr-2" />
                                Share on Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-green-400 hover:bg-gray-700">
                                <Linkedin className="w-4 h-4 mr-2" />
                                Share on LinkedIn
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger className="text-green-400 hover:text-green-300 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-green-500/30">
                              <DropdownMenuLabel className="text-green-300">Options</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-green-500/20" />
                              <DropdownMenuItem className="text-green-400 hover:bg-gray-700">
                                Follow Author
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                                Report Article
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Cover Image */}
                    {form.getValues().image && (
                      <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden border border-green-500/20">
                        <Image
                          priority
                          src={form.getValues().image}
                          alt="cover"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert max-w-none
                      prose-headings:text-green-400 prose-headings:font-mono
                      prose-p:text-green-300 prose-p:leading-relaxed
                      prose-code:bg-gray-800 prose-code:text-yellow-400
                      prose-pre:bg-gray-800 prose-pre:border prose-pre:border-green-500/30
                      prose-blockquote:border-l-green-500 prose-blockquote:bg-gray-800/50
                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-green-400 prose-em:text-yellow-400
                      prose-li:text-green-300
                    ">
                      {form.getValues().content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {form.getValues().content}
                        </ReactMarkdown>
                      ) : (
                        <div className="text-green-600 text-center py-8">
                          // No content available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Form>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-green-500/30 p-3 text-xs text-green-600">
        <div className="flex items-center justify-between">
          <div>
            Press [P] for Preview | [E] for Edit | [S] to Save | [Ctrl+S] Quick Save
          </div>
          <div>
            Terminal Blog Editor © 2024 | EDIT MODE
          </div>
        </div>
      </div>
    </div>
  );
}