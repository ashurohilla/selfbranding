"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IModules, IchapterModules } from '@/lib/types';
import { readchaptersbymodules } from '@/lib/actions/blog';
import Link from 'next/link';
import { 
  ChevronRight, Folder, FileText, PlayCircle, Menu, X, 
  Search, Terminal, ChevronLeft, PanelLeftClose, PanelLeftOpen 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  modules: IModules;
  courseId: string;
}

function Sidebar({ modules, courseId }: SidebarProps) {
  const pathname = usePathname();
  const [chapterData, setChapterData] = useState<{ [moduleId: string]: IchapterModules[] }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const moduleIds = modules.map((module) => module.slug);
        const response = await readchaptersbymodules(moduleIds);
        if (response && Array.isArray(response.data)) {
          const grouped: { [key: string]: IchapterModules[] } = {};
          response.data.forEach((chapter: IchapterModules) => {
            const mId = chapter?.module_id;
            if (mId) {
              if (!grouped[mId]) grouped[mId] = [];
              grouped[mId]!.push(chapter);
            }
          });
          setChapterData(grouped);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    if (modules.length > 0) fetchChapters();
  }, [modules]);

  const isChapterActive = (chapterSlug: string) => pathname === `/courses/${courseId}/${chapterSlug}`;

  // Filter chapters based on search
  const filteredChapterData = useMemo(() => {
    if (!searchQuery) return chapterData;
    const filtered: { [key: string]: IchapterModules[] } = {};
    Object.keys(chapterData).forEach(mId => {
      const chapters = chapterData[mId];
      if (!chapters) return;
      const matches = chapters.filter(c => 
        c.chapter_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matches.length > 0) filtered[mId] = matches;
    });
    return filtered;
  }, [searchQuery, chapterData]);

  return (
    <>
      {/* Mobile Header Trigger */}
      <div className="md:hidden fixed top-0 left-0 z-40 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-teal-500" />
          <span className="font-bold text-sm dark:text-white uppercase tracking-widest">Modules</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-500">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 md:z-30
          bg-white dark:bg-[#050505] border-r border-zinc-200 dark:border-zinc-800
          transition-all duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-0 md:opacity-0 md:pointer-events-none' : 'w-[300px] lg:w-[350px]'}
        `}
      >
        {/* Collapse Toggle (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(true)}
          className="hidden md:flex absolute -right-4 top-20 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-full text-zinc-500 hover:text-teal-500 z-50"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Header & Search */}
        <div className="p-6 space-y-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
              <Terminal size={20} />
              <span className="font-black text-sm tracking-[0.2em] uppercase">System.Explorer</span>
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-teal-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-none py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-teal-500/50 transition-all font-mono"
            />
          </div>
        </div>

        {/* Module List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <Accordion type="multiple" className="space-y-2" defaultValue={["item-0"]}>
            {modules.map((module, index) => {
              const chapters = filteredChapterData[module.slug];
              if (searchQuery && !chapters) return null;

              return (
                <AccordionItem 
                  key={module.slug} 
                  value={`item-${index}`} 
                  className="border border-zinc-100 dark:border-zinc-800 rounded-none overflow-hidden bg-transparent"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:no-underline transition-colors group">
                    <div className="flex items-center gap-3 text-left">
                      <div className="bg-teal-500/10 text-teal-500 p-2 border border-teal-500/20">
                        <Folder size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 text-[11px] uppercase tracking-wider line-clamp-1">{module.module_name}</span>
                        <span className="text-[9px] font-mono text-zinc-400">{chapters?.length || 0} MODULE_UNITS</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="pt-0 pb-2 px-2">
                    <div className="flex flex-col gap-1 mt-2">
                      {chapters?.map((chapter) => {
                        const active = isChapterActive(chapter.slug);
                        return (
                          <Link 
                            key={chapter.slug} 
                            href={`/courses/${courseId}/${chapter.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className={`
                              group flex items-center gap-3 px-3 py-2 rounded-none text-[11px] font-mono transition-all duration-200 border-l-2
                              ${active 
                                ? 'bg-teal-500/5 text-teal-500 border-teal-500' 
                                : 'text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                              }
                            `}>
                              <span className={active ? 'text-teal-500' : 'text-zinc-600'}>
                                {active ? <PlayCircle size={14} className="animate-pulse" /> : <FileText size={14} />}
                              </span>
                              <span className="line-clamp-1 uppercase tracking-tight">
                                {chapter.chapter_name}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/50 text-[9px] font-mono flex justify-between text-zinc-400">
             <span>ALGO_SYS_v2.0</span>
             <span className="text-teal-500">READY</span>
        </div>
      </aside>

      {/* Floating Re-open Button (only when collapsed) */}
      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)}
          className="hidden md:flex fixed left-4 top-20 z-50 bg-teal-500 text-black p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}
    </>
  );
}

export default Sidebar;