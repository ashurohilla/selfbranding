"use client";
import React, { useEffect, useState } from 'react';
import { readmodulesbycourseId } from '@/lib/actions/blog';
import Sidebar from '@/app/courses/components/sidebar';
import PrivateRoute from '@/components/editor/PrivateRoute';
import { IModules } from '@/lib/types';
import Link from 'next/link';
import { Coffee, ShieldAlert, ChevronLeft, Terminal, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string };
}) {
  const [modules, setModules] = useState<IModules>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const { data: moduleData } = await readmodulesbycourseId(params.courseSlug);
        setModules(moduleData ?? []);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [params.courseSlug]);

  // Algo System Fallback UI
  const courseFallback = (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 p-8 text-center relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-teal-500/50" />
        
        <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-none flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-teal-500" />
        </div>
        
        <h2 className="text-sm font-black dark:text-white mb-2 uppercase tracking-widest">
          ACCESS_DENIED: UNAUTHORIZED
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-[11px] leading-relaxed">
          Course content is locked for current credentials. System enrollment is required to initialize this module.
        </p>
        
        <div className="space-y-3">
          <Link href="/login" className="block w-full">
            <Button className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold rounded-none uppercase text-xs">
              Initialize Session (Login)
            </Button>
          </Link>
          <Link href="/courses" className="block w-full">
            <Button variant="outline" className="w-full border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-none uppercase text-xs">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <PrivateRoute fallback={courseFallback}>
      <div className="flex h-screen pt-16 md:pt-20 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-300">
        
        {/* Sidebar Navigation */}
        <div className="flex-shrink-0 relative z-20 h-full">
           {loading ? (
             <div className="w-[300px] lg:w-[350px] h-full border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-6 space-y-6">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 animate-pulse"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-none animate-pulse"></div>
                    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-none animate-pulse"></div>
                    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-none animate-pulse"></div>
                </div>
             </div>
           ) : (
             <Sidebar courseId={params.courseSlug} modules={modules} />
           )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative z-0 h-full overflow-hidden bg-white dark:bg-[#050505]">
          {/* Subtle Content Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Top Info Bar (Optional Chapter Context) */}
          <div className="h-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-6 justify-between bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1"><Terminal size={12} className="text-teal-500" /> SYSTEM.READ_MODE</span>
                <span className="hidden sm:inline border-l border-zinc-200 dark:border-zinc-800 pl-4 uppercase tracking-tighter">Path: {params.courseSlug}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_#2dd4bf]" />
                <span className="text-[10px] font-mono text-zinc-400 tracking-tighter uppercase">Sync: OK</span>
            </div>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto w-full relative z-10 custom-scrollbar">
            <div className="max-w-4xl mx-auto px-6 sm:px-12 py-10 md:py-16">
                {/* Content Injection */}
                <div className="prose prose-zinc dark:prose-invert max-w-none 
                  prose-headings:font-black prose-headings:tracking-tighter 
                  prose-a:text-teal-500 prose-strong:text-zinc-900 dark:prose-strong:text-white
                  prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none">
                  {children}
                </div>
            </div>
          </div>
        </main>

        {/* Floating Support Button (Themed) */}
        <Link
            href="https://www.buymeacoffee.com/ashishrohilla"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 group"
        >
            <div className="relative flex items-center justify-center w-14 h-14 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Corner detail */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-teal-500" />
                
                <Coffee size={20} className="text-zinc-800 dark:text-zinc-200 group-hover:text-teal-500 transition-colors" />
                
                {/* Technical Label */}
                <div className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 text-white text-[10px] font-mono tracking-widest uppercase rounded-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-700">
                    Sponsor.initialize()
                </div>
            </div>
        </Link>
      </div>
    </PrivateRoute>
  );
}