"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { IModules, IchapterModules } from '@/lib/types';
import { toggleChapterProgress, getUserProgress } from '@/lib/actions/blog';
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  Circle, 
  Layout, 
  Trophy, 
  Loader2,
  BookCheck
} from "lucide-react";

interface RoadmapViewProps {
  modules: IModules;
  chapterData: { [moduleId: string]: IchapterModules[] };
  courseId: string;
}

export default function RoadmapView({ modules, chapterData, courseId }: RoadmapViewProps) {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // 1. Fetch user-specific progress on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await getUserProgress(courseId);
        console.log("Fetched user progress:", data);
        if (data) setCompletedChapters(data);
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [courseId]);

  // 2. Handle Checkbox Toggle
  const handleToggle = async (chapterSlug: string) => {
    const isCurrentlyComplete = completedChapters.includes(chapterSlug);
    const newStatus = !isCurrentlyComplete;

    // Optimistic Update: Change UI immediately
    setCompletedChapters(prev => 
      newStatus ? [...prev, chapterSlug] : prev.filter(slug => slug !== chapterSlug)
    );
    
    setSyncingId(chapterSlug);

    // Server Update
    const result = await toggleChapterProgress(chapterSlug, courseId, newStatus);
    
    if (result?.error) {
      toast.error("Failed to sync progress. Please try again.");
      // Rollback UI on failure
      setCompletedChapters(prev => 
        isCurrentlyComplete ? [...prev, chapterSlug] : prev.filter(slug => slug !== chapterSlug)
      );
    }
    
    setSyncingId(null);
  };

  // 3. Calculate Progress Percentages
  const stats = useMemo(() => {
    const allChapters = Object.values(chapterData).flat();
    const total = allChapters.length;
    const completed = completedChapters.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  }, [chapterData, completedChapters]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 animate-pulse">Syncing your progress...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Progress Stats Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-blue-200 shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Course Roadmap</h2>
              <p className="text-sm text-gray-500">
                {stats.completed} of {stats.total} tasks finished
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <span className="text-3xl font-black text-blue-600">{stats.percentage}%</span>
            <div className="h-8 w-px bg-gray-200" />
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Total<br/>Progress</span>
          </div>
        </div>
        <Progress value={stats.percentage} className="h-3 bg-gray-100" />
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <Accordion type="multiple" className="w-full space-y-4">
          {modules.map((module) => {
            const chapters = chapterData[module.slug] || [];
            const completedInModule = chapters.filter(c => completedChapters.includes(c.slug)).length;
            const isModuleComplete = chapters.length > 0 && completedInModule === chapters.length;

            return (
              <AccordionItem 
                key={module.slug} 
                value={module.slug}
                className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm px-2"
              >
                <AccordionTrigger className="hover:no-underline py-5 px-4 group">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isModuleComplete ? 'bg-green-100 text-green-600 rotate-12 scale-110' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {isModuleComplete ? <BookCheck className="w-5 h-5" /> : <Layout className="w-5 h-5" />}
                      </div>
                      <div className="text-left">
                        <h3 className={`font-bold transition-colors ${isModuleComplete ? 'text-green-700' : 'text-gray-800'}`}>
                          {module.module_name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">
                          {completedInModule} / {chapters.length} Chapters Complete
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4 px-4">
                  <div className="grid gap-2 mt-2">
                    {chapters.length > 0 ? (
                      chapters.map((chapter) => {
                        const isDone = completedChapters.includes(chapter.slug);
                        const isSyncing = syncingId === chapter.slug;

                        return (
                          <div 
                            key={chapter.slug}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                              isDone
                              ? 'bg-green-50/40 border-green-100'
                              : 'bg-gray-50/50 border-gray-100 hover:border-blue-200 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative flex items-center justify-center">
                                <Checkbox 
                                  id={chapter.slug}
                                  checked={isDone}
                                  onCheckedChange={() => handleToggle(chapter.slug)}
                                  disabled={isSyncing}
                                  className="w-5 h-5 rounded-md border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 transition-transform active:scale-90"
                                />
                                {isSyncing && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-md">
                                    <Loader2 className="w-3 h-3 animate-spin text-green-600" />
                                  </div>
                                )}
                              </div>
                              <label 
                                htmlFor={chapter.slug}
                                className={`text-sm font-semibold cursor-pointer select-none transition-all ${
                                  isDone ? 'text-green-800/60 line-through' : 'text-gray-700'
                                }`}
                              >
                                {chapter.chapter_name}
                              </label>
                            </div>
                            
                            <div className="flex items-center">
                               {isDone ? (
                                 <div className="bg-green-100 p-1 rounded-full">
                                   <CheckCircle2 className="w-4 h-4 text-green-600" />
                                 </div>
                               ) : (
                                 <Circle className="w-4 h-4 text-gray-300" />
                               )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-sm italic">
                        No chapters found in this module.
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}