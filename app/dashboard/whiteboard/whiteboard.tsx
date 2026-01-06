"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2, Save, Copy, Check, ArrowLeft, Library } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ Import Excalidraw CSS
// @ts-ignore
import "@excalidraw/excalidraw/index.css";

// ✅ Dynamic Import for Excalidraw (Client-side only)
const Excalidraw = dynamic<any>(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-zinc-500 font-medium">Loading Canvas...</p>
        </div>
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
  const router = useRouter();

  // ✅ LOAD PRE-DEFINED LIBRARIES AUTOMATICALLY
  useEffect(() => {
    if (!excalidrawAPI) return;

    const loadLibraries = async () => {
      try {
        // Replace these URLs with your actual library files in /public/libraries/
        const libraryUrls = [
          "/public/libraries/software-architecture.excalidrawlib",
        ];

        const libraryPromises = libraryUrls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) return null;
          return response.json();
        });

        const results = await Promise.all(libraryPromises);
        
        // Merge all library items into one array
        const allLibraryItems = results
          .filter(res => res !== null)
          .flatMap(res => res.libraryItems);

        if (allLibraryItems.length > 0) {
          excalidrawAPI.updateLibrary({
            libraryItems: allLibraryItems,
            merge: true, // Merges with user's local library items
          });
        }
      } catch (error) {
        console.warn("Library auto-load failed. User can still upload manually.", error);
      }
    };

    loadLibraries();
  }, [excalidrawAPI]);

  const handleSaveWrapper = async () => {
    if (!excalidrawAPI || !title) {
      alert("Please enter a title for your diagram");
      return;
    }

    setIsSaving(true);

    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      
      const sceneData = {
        elements,
        appState: { 
          viewBackgroundColor: appState.viewBackgroundColor,
          gridSize: appState.gridSize 
        },
      };

      const result = await onSave(title, sceneData, currentId || undefined);

      if (result.error) {
        alert(`Save failed: ${result.error}`);
      } else if (result.success && result.id) {
        setCurrentId(result.id);
        // Update URL without reloading if it's a new diagram
        if (!id) {
          window.history.replaceState(null, "", `/dashboard/whiteboard?id=${result.id}`);
        }
      }
    } catch (err) {
      console.error("Save Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const copySnippet = () => {
    if (!currentId) return;
    navigator.clipboard.writeText(`<Diagram id="${currentId}" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen flex-col bg-white overflow-hidden">
      {/* --- Modern Toolbar --- */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 bg-white shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/course/whiteboard" 
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Untitled Diagram"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-64 bg-transparent text-sm font-bold text-zinc-900 focus:outline-none placeholder:text-zinc-300"
            />
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-tighter">
              {currentId ? `ID: ${currentId.slice(0, 12)}` : "Not Saved Yet"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentId && (
            <button 
              onClick={copySnippet} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition-all active:scale-95"
            >
              {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14} />}
              {copied ? "Copied Tag" : "Copy MDX Tag"}
            </button>
          )}
          
          <button
            onClick={handleSaveWrapper}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {currentId ? "Update Changes" : "Save Diagram"}
          </button>
        </div>
      </div>

      {/* --- Canvas Workspace --- */}
      <div className="flex-1 w-full relative">
        <Excalidraw
          initialData={initialData}
          excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
          gridModeEnabled={true}
          theme="light"
          name={title}
          UIOptions={{ }}
        />
      </div>
    </div>
  );
}