"use client";
import React, { useState, useTransition } from 'react';
import { 
  LayoutGrid, Search, Plus, Calendar, 
  Copy, Check, Pencil, Trash2, X, AlertTriangle, Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteDiagramAction } from "@/lib/actions/blog"; // You'll need to create this action
import { createNewDiagramAction } from '@/lib/actions/blog';

interface Diagram {
  id: string;
  name: string;
  created_at: string;
}

export default function WhiteboardDashboard({ diagrams }: { diagrams: Diagram[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const filtered = diagrams.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleCreateNew = async () => {
  setIsCreating(true);
  try {
    const result = await createNewDiagramAction();
    if (result.success && result.id) {
      // Redirect to the newly created diagram
      router.push(`/dashboard/whiteboard?id=${result.id}`);
    } else {
      alert("Failed to create diagram: " + result.error);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setIsCreating(false);
  }
};

  const copyId = (id: string) => {
    navigator.clipboard.writeText(`<Diagram id="${id}" />`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    startTransition(async () => {
      const result = await deleteDiagramAction(deletingId);
      if (result?.success) {
        setDeletingId(null);
        router.refresh(); // Refresh server data
      } else {
        alert("Failed to delete diagram");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              Diagram Library
            </h1>
            <p className="text-slate-500 text-sm">Manage and reuse your technical diagrams</p>
          </div>
          {/* ✅ FIXED: Correct link for empty new diagram */}
         <button 
  onClick={handleCreateNew}
  disabled={isCreating}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-70"
>
  {isCreating ? (
    <Loader2 className="w-5 h-5 animate-spin" />
  ) : (
    <Plus className="w-5 h-5" />
  )}
  {isCreating ? "Initializing..." : "New Diagram"}
</button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by diagram name..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
            <LayoutGrid className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No diagrams found</h3>
            <p className="text-slate-500">Create your first technical drawing to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((diagram) => (
              <div key={diagram.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all flex flex-col">
                <div className="aspect-[16/10] bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                   <LayoutGrid className="w-10 h-10 text-slate-200 group-hover:text-blue-100" />
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-800 truncate mb-1">{diagram.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    <Calendar className="w-3 h-3" />
                    {new Date(diagram.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <Link href={`/dashboard/whiteboard?id=${diagram.id}`} className="flex-1">
                      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                    </Link>
                    <button 
                      onClick={() => copyId(diagram.id)}
                      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Copy MDX Tag"
                    >
                      {copiedId === diagram.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setDeletingId(diagram.id)}
                      className="p-2 border border-red-100 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      title="Delete Diagram"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Diagram?</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                This action cannot be undone. Any blog post using the <code className="bg-slate-100 px-1 rounded text-red-500 font-mono text-xs">{"<Diagram id=\"" + deletingId.slice(0,5) + "...\" />"}</code> tag will show a missing component.
              </p>
            </div>
            <div className="p-4 bg-slate-50 flex gap-3">
              <button 
                disabled={isPending}
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                disabled={isPending}
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}