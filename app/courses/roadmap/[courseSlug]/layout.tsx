"use client";

import React, { useEffect, useState } from 'react';
import { readmodulesbycourseId, readchaptersbymodules } from '@/lib/actions/blog';
import { IModules, IchapterModules } from '@/lib/types';
import RoadmapView from '../../components/RoadmapView';
import { Loader2, ArrowLeft, LayoutDashboard, Flag } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage({ params }: { params: { courseSlug: string } }) {
  const [modules, setModules] = useState<IModules>([]);
  const [chapterData, setChapterData] = useState<{ [moduleId: string]: IchapterModules[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Modules
        const { data: moduleData } = await readmodulesbycourseId(params.courseSlug);
        
        if (moduleData) {
          setModules(moduleData);
          
          // 2. Fetch Chapters for all modules
          const moduleSlugs = moduleData.map((m) => m.slug);
          const response = await readchaptersbymodules(moduleSlugs);

          if (response && Array.isArray(response.data)) {
            const grouped: { [key: string]: IchapterModules[] } = {};
            response.data.forEach((chapter: IchapterModules) => {
              const moduleId = chapter.module_id;
             if (moduleId) {
  if (!grouped[moduleId]) grouped[moduleId] = [];
  grouped[moduleId]!.push(chapter); // Added ! here
}
            });
            setChapterData(grouped);
          }
        }
      } catch (error) {
        console.error('Error loading roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.courseSlug]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-500 font-medium">Assembling your roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/courses/${params.courseSlug}`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900 tracking-tight">Learning Path</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
            <Flag className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-tighter">
              Course: {params.courseSlug.replace(/-/g, ' ')}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Roadmap Content */}
      <main className="py-10 pb-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Progress
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl">
              Complete chapters to unlock your certificate. Your progress is saved automatically as you check off items.
            </p>
          </div>

          {/* Checklist UI */}
          <RoadmapView courseId={params.courseSlug} modules={modules} chapterData={chapterData} />
        </div>
      </main>

      {/* Simplified Mobile Progress Bar (Fixed Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-700">Overall Progress</span>
        <div className="w-1/2 bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-[45%]" /> {/* Dynamic value from RoadmapView */}
        </div>
      </div>
    </div>
  );
}