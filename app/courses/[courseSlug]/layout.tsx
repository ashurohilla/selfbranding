'use client';
import React, { useEffect, useState } from 'react';
import { readmodulesbycourseId } from '@/lib/actions/blog';
import Sidebar from '@/app/courses/components/sidebar';
import PrivateRoute from '@/components/editor/PrivateRoute';
import { IModules } from '@/lib/types';
import Link from 'next/link';
import { Coffee } from 'lucide-react'; // Using Lucide icon for consistency

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

  // Clean fallback UI
  const courseFallback = (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-gray-500 mb-6 text-sm">
          You need to be enrolled to view this content.
        </p>
        <div className="space-y-3">
          <a href="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all">Sign In</a>
          <a href="/courses" className="block w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-lg transition-all">Back to Courses</a>
        </div>
      </div>
    </div>
  );

  return (
    <PrivateRoute fallback={courseFallback}>
      {/* LAYOUT STRUCTURE EXPLAINED:
         h-screen: Forces full height
         overflow-hidden: Prevents the body from scrolling (we scroll inner containers instead)
         flex: Puts Sidebar and Main side-by-side
      */}
      <div className="flex h-screen bg-white overflow-hidden">
        
        {/* Sidebar Wrapper */}
        <div className="flex-shrink-0 relative z-20 h-full">
           {loading ? (
             <div className="w-[300px] h-full border-r bg-gray-50 animate-pulse p-4">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                </div>
             </div>
           ) : (
             <Sidebar courseId={params.courseSlug} modules={modules} />
           )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative z-0 h-full overflow-hidden bg-white">
          {/* Scrollable Container for Article Content */}
          <div className="flex-1 overflow-y-auto w-full md:mt-0 mt-14">
            <div className="max-w-9xl mx-auto px-4 sm:px-8 py-8 md:py-12">
                {children}
            </div>
          </div>
        </main>

        {/* Floating Coffee Button */}
        <Link
            href="https://www.buymeacoffee.com/ashishrohilla"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-12 h-12 bg-[#FFDD00] hover:bg-[#FFEA00] text-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            title="Buy me a coffee"
        >
            <Coffee size={20} fill="currentColor" className="text-black/80" />
            <span className="sr-only">Buy me a coffee</span>
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Support my work
            </span>
        </Link>
      </div>
    </PrivateRoute>
  );
}