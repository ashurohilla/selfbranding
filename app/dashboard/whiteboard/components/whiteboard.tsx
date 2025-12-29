"use client";

// ✅ FIX 1: Import the CSS
import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Save, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
// @ts-ignore
import "@excalidraw/excalidraw/index.css"; 
import { useRouter } from "next/navigation";

const Excalidraw = dynamic<any>(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-zinc-50">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    ),
  }
);

interface WhiteboardProps {
  initialData?: any;
  initialTitle?: string;
  id?: string;
  onSave: (title: string, data: any, id?: string) => Promise<{ success?: boolean; id?: string; error?: string }>;
}

export default function Whiteboard({ initialData, initialTitle = "", id, onSave }: WhiteboardProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [title, setTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(id || null);
  const [copied, setCopied] = useState(false);

  const handleSaveWrapper = async () => {
    if (!excalidrawAPI || !title) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const sceneData = {
      elements,
      appState: { viewBackgroundColor: appState.viewBackgroundColor },
    };

    const result = await onSave(title, sceneData, currentId || undefined);

    setIsSaving(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else if (result.success && result.id) {
      setCurrentId(result.id);
      if (!id) {
        window.history.replaceState(null, "", `/course/whiteboard?id=${result.id}`);
      }
    }
  };

  const copySnippet = () => {
    if (!currentId) return;
    navigator.clipboard.writeText(`<Diagram id="${currentId}" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // ✅ FIX 2: Use calc() to prevent double scrollbars (100vh - header margin)
    <div className="flex mt-16 h-[calc(100vh-64px)] flex-col bg-white">
      {/* --- Toolbar --- */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-zinc-500 hover:text-zinc-900">
            <ArrowLeft size={20} />
          </Link>
          <input
            type="text"
            placeholder="Diagram Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-64 rounded-md border border-zinc-200 px-3 py-1.5 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          {currentId && (
            <div className="flex items-center gap-2 rounded-md bg-zinc-50 px-3 py-1.5 border border-zinc-200">
              <span className="font-mono text-xs text-zinc-500">ID: {currentId.slice(0,8)}...</span>
              <button onClick={copySnippet} className="text-zinc-600 hover:text-black" title="Copy Component Snippet">
                {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14} />}
              </button>
            </div>
          )}
          
          <button
            onClick={handleSaveWrapper}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {currentId ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* --- Canvas --- */}
      <div className="flex-1 w-full relative">
        <Excalidraw
          initialData={initialData}
          excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
        />
      </div>
    </div>
  );
}