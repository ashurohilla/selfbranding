"use client";
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { useState, useRef } from 'react';
import { 
  Copy, Check, TerminalIcon, Folder, File, 
  ChevronRight, Info, AlertTriangle, Lightbulb,
  BookOpen
} from 'lucide-react'; 
import YouTubeEmbed from './YouTubeEmbed';
import Diagram from './Diagram';
import Terminal from './Terminal';
import Table from './Table'

// --- UI Components ---

const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: string }) => {
  const styles: Record<string, string> = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-50 text-green-700 border-green-100",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium border ${styles[variant] || styles.default}`}>{children}</span>;
};

const Card = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
  <div className="my-10 p-8 rounded-2xl border border-gray-100 bg-gray-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <div className="text-gray-400">{Icon}</div>}
      <h4 className="font-sans font-bold text-xl text-gray-900 m-0 tracking-tight">{title}</h4>
    </div>
    <div className="text-gray-600 font-serif text-lg leading-relaxed">{children}</div>
  </div>
);

const Step = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
  <div className="relative pl-12 pb-12 last:pb-0">
    <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-gray-900 text-gray-900 rounded-full flex items-center justify-center text-sm font-bold font-sans z-10">
      {number}
    </div>
    <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gray-100 last:hidden" />
    <h4 className="font-sans font-bold text-xl text-gray-900 mt-0 mb-3 tracking-tight">{title}</h4>
    <div className="text-gray-600 font-serif text-lg leading-relaxed">{children}</div>
  </div>
);

// --- VS Code Style Code Block ---
const Pre = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.innerText || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-10 rounded-xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-sans font-medium text-slate-400 hover:text-white"
        >
          {copied ? (
            <><Check size={14} className="text-green-500" /> Copied</>
          ) : (
            <><Copy size={14} /> Copy</>
          )}
        </button>
      </div>

      <pre
        ref={preRef}
        className="p-6 overflow-x-auto text-[14px] leading-relaxed font-mono text-slate-200 selection:bg-blue-500/30"
      >
        {children}
      </pre>
    </div>
  );
};

export default function BlogBody({ source }: { source: string }) {
  return (
    <article className="w-full max-w-[720px] mx-auto px-4 sm:px-6 mb-24 antialiased selection:bg-yellow-100">
      <div className="font-serif text-[21px] leading-[32px] text-gray-800">
        <MDXRemote 
          source={source} 
          components={{
            // Typography
            h1: ({ children }) => <h1 className="font-sans font-black text-4xl sm:text-5xl mt-16 mb-6 text-gray-900 tracking-tight leading-tight">{children}</h1>,
            h2: ({ children }) => <h2 className="font-sans font-bold text-3xl mt-12 mb-4 text-gray-900 tracking-tight">{children}</h2>,
            h3: ({ children }) => <h3 className="font-sans font-bold text-2xl mt-8 mb-3 text-gray-800 tracking-tight">{children}</h3>,
            p: ({ children }) => <p className="mb-7 last:mb-0 text-gray-700">{children}</p>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-900 pl-6 my-10 italic text-gray-600 text-2xl font-serif">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => <ul className="list-disc pl-6 mb-7 space-y-3 text-gray-700">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-7 space-y-3 text-gray-700">{children}</ol>,
            
            // Custom Components
            Badge,
            Card,
            Steps: ({ children }) => <div className="my-12 font-serif">{children}</div>,
            Step,
            
            Accordion: ({ title, children }: { title: string, children: React.ReactNode }) => (
              <details className="group my-6 border-y border-gray-100 py-2">
                <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                  <span className="font-sans font-bold text-lg text-gray-800 group-open:text-gray-900">{title}</span>
                  <ChevronRight size={20} className="text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="pb-6 px-2 text-gray-600 leading-relaxed font-serif">
                  {children}
                </div>
              </details>
            ),

            Callout: ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warn" | "tip" }) => {
              const styles = {
                info: "bg-blue-50/50 border-blue-100 text-blue-900",
                warn: "bg-amber-50/50 border-amber-100 text-amber-900",
                tip: "bg-emerald-50/50 border-emerald-100 text-emerald-900"
              };
              return (
                <div className={`my-10 p-6 rounded-xl border flex gap-5 ${styles[type] || styles.info}`}>
                  <div className="shrink-0 pt-1">
                    {type === "tip" ? <Lightbulb size={24} /> : type === "warn" ? <AlertTriangle size={24} /> : <Info size={24} />}
                  </div>
                  <div className="font-serif text-lg leading-relaxed">{children}</div>
                </div>
              );
            },

            // Code
            pre: ({ children }) => <Pre>{children}</Pre>,
            code: ({ children }) => <code className="bg-gray-100 text-[#d63384] px-1.5 py-0.5 rounded text-[0.85em] font-mono font-medium border border-gray-200">{children}</code>,
            
            FileTree: ({ children }) => <div className="my-10 p-6 rounded-2xl bg-[#1e1e1e] text-gray-300 font-mono text-sm border border-gray-800 shadow-inner">{children}</div>,
            
            // Shared Components
            YouTubeEmbed,
            Diagram,
            Terminal,
            Table,
          }}
        />
      </div>
    </article>
  );
}