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
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  Loader2
} from "lucide-react";

const MdxEditor = dynamic(() => import("@/components/editor/mdx-editor"), { ssr: false });

interface BlogFormProps {
  defaultBlog: IBlogDetial;
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}

export default function BlogForm({ onHandleSubmit, defaultBlog }: BlogFormProps) {
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
      onHandleSubmit(data);
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
            <span className="text-green-400 font-bold">BLOG_EDITOR v2.1.0</span>
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
                onClick={() => setPreview(!isPreview)}
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

            {/* Editor/Preview Panel */}
            <div className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden">
              <div className="bg-gray-700 px-4 py-3 border-b border-green-500/20">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-bold">
                    {isPreview ? "PREVIEW.MD" : "EDITOR.MDX"}
                  </span>
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
                {!isPreview ? (
                  <div className="min-h-[500px]">
                    <MdxEditor
                      key="editor"
                      defaultValue={form.getValues().content || ""}
                      onChange={onChangeValue}
                    />
                  </div>
                ) : (
                  <div className="min-h-[500px] bg-gray-900 border border-green-500/20 rounded p-4">
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
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {form.getValues().content || "// No content available"}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-bold">SETTINGS</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Status:</span>
                  <div className="flex items-center gap-2">
                    {form.getValues().status ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={form.getValues().status ? "text-green-400" : "text-red-400"}>
                      {form.getValues().status ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Comments:</span>
                  <div className="flex items-center gap-2">
                    {form.getValues().coments_enabled ? (
                      <MessageCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={form.getValues().coments_enabled ? "text-green-400" : "text-red-400"}>
                      {form.getValues().coments_enabled ? "ENABLED" : "DISABLED"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
            Terminal Blog Editor © 2024
          </div>
        </div>
      </div>
    </div>
  );
}