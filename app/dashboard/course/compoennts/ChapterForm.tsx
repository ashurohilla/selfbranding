"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback, useTransition, useMemo } from "react";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IchapterDetails, Catagories, IModule } from "@/lib/types";
import { Chapterformschematype } from "../../blog/schema";
import { readCatogries, readmodulescourse } from "@/lib/actions/blog";
import dynamic from "next/dynamic";
import { 
  Code, Eye, Edit3, Save, FileText, User, Calendar, Hash,
  Image as ImageIcon, Loader2, BookOpen, Layers, Tag, Video, 
  Plus, Copy, Check, Folder, Terminal as TerminalIcon, Sparkles, Wand2, X, Info , Layout
} from "lucide-react";
import ImageGallery from "../../blog/components/ImageGallery";
import { onUploadImageAction } from "../../blog/components/feats/file/actions/image-upload.action";

const MdxEditor = dynamic(() => import("@/components/editor/mdx-editor"), { ssr: false });
const BlogBody = dynamic(() => import("@/components/editor/BlogBody"), { ssr: false });
  
export default function ChapterForm({ id, lessonid, onHandleSubmit, defaultlesson }: {
  id: string;
  lessonid: string;
  defaultlesson: IchapterDetails;
  onHandleSubmit: (data: Chapterformschematype) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreview] = useState(false);
  const [categories, setCategories] = useState<Catagories[]>([]);
  const [modulescourse, setModulecourse] = useState<IModule>();
  const [isClient, setIsClient] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  // AI State
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const user = useUser((state) => state.user);

  const form = useForm<Chapterformschematype>({
    mode: "onChange",
    defaultValues: {
      catagory_id: defaultlesson?.catagory_id || 0,
      chapter_name: defaultlesson?.chapter_name || "",
      content: defaultlesson?.content || "",
      course_id: defaultlesson?.course_id || "",
      created_at: defaultlesson?.created_at || new Date().toISOString(),
      description: defaultlesson?.content || "",
      instructor: defaultlesson?.instructor || "",
      module_id: defaultlesson?.module_id || "",
      chapterno: defaultlesson?.chapterno || "",
      slug: defaultlesson?.slug || "",
      image: defaultlesson?.image || "",
    },
  });

  useEffect(() => { setIsClient(true); fetchCategories(); fetchmodulecourse(); }, []);

  const fetchCategories = async () => {
    const { data } = await readCatogries();
    if (data) setCategories(data);
  };

  const fetchmodulecourse = async () => {
    const { data } = await readmodulescourse(id);
    if (data) setModulecourse(data);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "chapter_name" && value.chapter_name) {
        const generatedSlug = slugify(value.chapter_name, { lower: true }) + "-" + (user?.id?.slice(0, 5) || "");
        form.setValue("slug", generatedSlug);
        form.setValue("instructor", user?.id || "");
       form.setValue("module_id", lessonid);
       form.setValue("course_id", id);
       console.log(id, lessonid);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, user?.id]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  // --- BUILD WITH AI LOGIC ---
  const handleAiGenerate = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);

    // DUMMY DELAY
    await new Promise(resolve => setTimeout(resolve, 2000));

    const dummyResponse = `
# Understanding Docker: Revolutionizing Software Deployment

![Docker Logo](https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/images/uploads/4yGcQJ8_rTEByiRm-ew_D_docker.png)
`;

    form.setValue("content", dummyResponse);
    form.setValue("chapter_name", aiTopic);
 
    setIsGenerating(false);
    setShowAiDrawer(false);
    setAiTopic("");
  };

  const components = [
    { name: "YouTube", icon: <Video className="w-4 h-4" />, snippet: '<YouTubeEmbed videoId="YOUR_VIDEO_ID" />' },
    { name: "Excalidraw", icon: <Layout className="w-4 h-4" />, snippet: '<Diagram id="YOUR_DRAWING_ID" />' },
    { name: "Terminal", icon: <TerminalIcon className="w-4 h-4" />, snippet: '<Terminal src="video_url_here" />' },
    { name: "Callout", icon: <FileText className="w-4 h-4" />, snippet: '<Callout type="info">\n  Your message here\n</Callout>' },
    { name: "Accordion", icon: <Layers className="w-4 h-4" />, snippet: '<Accordion title="Click to expand">\n  Content goes here...\n</Accordion>' },
    { name: "Steps", icon: <Plus className="w-4 h-4" />, snippet: '<Steps>\n  <Step number="1" title="First Step">\n    Details here\n  </Step>\n</Steps>' },
    { name: "Code Block", icon: <Code className="w-4 h-4" />, snippet: '```tsx\n// Your code here\n```' },
    { name: "File Tree", icon: <Folder className="w-4 h-4" />, snippet: '<FileTree>\n  <TreeItem name="src" type="folder" />\n</FileTree>' },
    { name: "Badge", icon: <Tag className="w-4 h-4" />, snippet: '<Badge variant="success">New Feature</Badge>' },
    { name: "Card", icon: <Layout className="w-4 h-4" />, snippet: '<Card title="Title" icon={<BookOpen />}>\n  Card content description...\n</Card>' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Chapter Content Editor</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Module: {modulescourse?.module_name || "Loading..."}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAiDrawer(true)} 
            className="flex gap-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Build with AI
          </Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1" />
          <Button variant="outline" size="sm" onClick={() => setShowImageGallery(true)} className="hidden md:flex gap-2 border-slate-200">
            <ImageIcon className="w-4 h-4" /> Gallery
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setPreview(!isPreview)} className="gap-2 text-slate-600">
            {isPreview ? <><Edit3 className="w-4 h-4" /> Write</> : <><Eye className="w-4 h-4" /> Preview</>}
          </Button>
          <Button size="sm" onClick={form.handleSubmit(onHandleSubmit)} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 shadow-md px-6">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Chapter
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden lg:block overflow-y-auto">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Components</h2>
          <div className="space-y-2">
            {components.map((comp) => (
              <button
                key={comp.name}
                onClick={() => copyToClipboard(comp.snippet, comp.name)}
                className="w-full flex items-center justify-between p-2 rounded-md hover:bg-slate-50 group border border-transparent hover:border-slate-100 transition-all text-left"
              >
                <div className="flex items-center gap-3 text-slate-600">
                  {comp.icon}
                  <span className="text-sm font-medium">{comp.name}</span>
                </div>
                {copiedLabel === comp.name ? <Check className="w-3 h-3 text-green-500" /> : <Plus className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Form {...form}>
            <div className="max-w-4xl mx-auto space-y-8">
              <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <FormField
                  control={form.control}
                  name="chapter_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Chapter Title"
                          className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-300 text-slate-900"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="chapterno"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="chapterno"
                          className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-300 text-slate-900"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-50 text-slate-500">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono">{form.watch("slug") || "auto-slug"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </section>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[700px] overflow-hidden">
                {isPreview ? (
                  <div className="p-8 prose prose-slate max-w-none prose-headings:font-bold prose-pre:bg-slate-900">
                    <BlogBody source={form.watch("content") || ""} />
                  </div>
                ) : (
                  <div className="p-2">
                     <MdxEditor
                        key="chapter-editor"
                        defaultValue={form.watch("content")|| ""}
                        onChange={(val) => {
                          form.setValue("content", val);
                          form.setValue("description", val.slice(0, 160));
                        }}
                      />
                  </div>
                )}
              </div>
            </div>
          </Form>
        </main>
      </div>

      {/* AI DRAWER MODAL */}
      {showAiDrawer && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-md h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl">Build with AI</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAiDrawer(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">What is the topic?</label>
                <Input 
                  placeholder="e.g. Docker Fundamentals or React Hooks"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="h-12 border-slate-200 focus:ring-purple-500"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-3 h-3" /> How it works
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The AI will generate a comprehensive chapter structure including an introduction, technical steps, and code examples formatted for your MDX editor.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAiGenerate}
              disabled={!aiTopic || isGenerating}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-100 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate Content
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Gallery Modal - same as before */}
      {showImageGallery && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Media Library</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowImageGallery(false)}><X className="w-4 h-4" /></Button>
             </div>
             <div className="max-h-[70vh] overflow-y-auto">
                <ImageGallery onUploadImageAction={onUploadImageAction} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}