"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IModules, IchapterModules } from '@/lib/types';
import { readchaptersbymodules } from '@/lib/actions/blog';
import Link from 'next/link';
import Loading from './loader';
import { ChevronRight, Folder, FileText, PlayCircle, Menu, X, BookOpen } from "lucide-react";
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
  const router = useRouter();
  const pathname = usePathname();
  const [chapterData, setChapterData] = useState<{ [moduleId: string]: IchapterModules[] }>({});
  const [loader, setLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const moduleIds = modules.map((module) => module.slug);
        const response = await readchaptersbymodules(moduleIds);

        if (response && Array.isArray(response.data)) {
          const groupedChapters: { [key: string]: IchapterModules[] } = {};
          response.data.forEach((chapter: IchapterModules) => {
            const moduleId = chapter?.module_id;
            if (moduleId !== undefined && moduleId !== null) {
              if (!groupedChapters[moduleId]) {
                groupedChapters[moduleId] = [];
              }
              groupedChapters[moduleId]!.push(chapter);
            }
          });
          setChapterData(groupedChapters);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setLoading(false);
      }
    };

    if (modules.length > 0) {
      fetchChapters();
    }
  }, [modules]);

  const handleChapterClick = () => setIsMobileMenuOpen(false);
  const isChapterActive = (chapterSlug: string) => pathname === `/courses/${courseId}/${chapterSlug}`;

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-white border-b px-4 h-14 flex items-center shadow-sm">
        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-2 font-semibold text-gray-800">Course Menu</span>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-50 md:z-auto
          w-[280px] lg:w-[380px] bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isMobileMenuOpen ? 'shadow-2xl' : ''}
        `}
      >
        {/* Header Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 text-blue-600">
                <BookOpen size={20} />
                <span className="font-bold text-lg tracking-tight text-gray-900">Course Modules</span>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {loader ? (
            <Loading />
          ) : (
            <Accordion type="multiple" className="space-y-4" defaultValue={["item-0"]}>
              {modules.map((module, index) => (
                <AccordionItem 
                    key={module.slug} 
                    value={`item-${index}`} 
                    className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline transition-colors group">
                    <div className="flex items-center gap-3 text-left">
                        <div className="bg-blue-50 text-blue-600 p-2 rounded-md group-hover:bg-blue-100 transition-colors">
                            <Folder size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 text-sm">{module.module_name}</span>
                            <span className="text-xs text-gray-400 font-normal">{chapterData[module.slug]?.length || 0} Chapters</span>
                        </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="pt-0 pb-2 px-2 bg-gray-50/30">
                    <div className="flex flex-col gap-1 mt-2">
                        {chapterData[module.slug]?.map((chapter) => {
                        const isActive = isChapterActive(chapter.slug);
                        return (
                            <Link 
                                key={chapter.slug} 
                                href={`/courses/${courseId}/${chapter.slug}`}
                                onClick={handleChapterClick}
                            >
                            <div className={`
                                group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 border border-transparent
                                ${isActive 
                                    ? 'bg-white text-blue-600 font-medium shadow-sm border-gray-100 ring-1 ring-blue-500/10' 
                                    : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm hover:border-gray-100'
                                }
                            `}>
                                <span className={`
                                    ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                                `}>
                                    {isActive ? <PlayCircle size={16} /> : <FileText size={16} />}
                                </span>
                                <span className="line-clamp-2 leading-relaxed">
                                    {chapter.chapter_name}
                                </span>
                            </div>
                            </Link>
                        );
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        
        {/* Footer Area (Optional progress or watermark) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-xs text-center text-gray-400">
             © 2024 scale saas
        </div>
      </aside>
    </>
  );
}

export default Sidebar;