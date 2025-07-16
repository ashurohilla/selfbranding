"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IModules, IchapterModules } from '@/lib/types';
import { readchaptersbymodules } from '@/lib/actions/blog';
import Link from 'next/link';
import Loading from './loader';
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
  const [chapterData, setChapterData] = useState<{ [moduleId: string]: IchapterModules[] }>({});
  const [loader, setLoading] = useState<boolean>(true);

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
              // Fix: Use non-null assertion since we just checked above
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

  return (
    <div className="w-[300px] mx-4">
      {loader ? (
        <Loading />
      ) : (
        <div>
          {modules.map((module, index) => (
            <Accordion type="single" collapsible key={module.slug}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="w-[400px]">
                  {module.module_name}
                </AccordionTrigger>
                {chapterData[module.slug]?.map((chapter) => (
                  <AccordionContent key={chapter.slug}>
                    <Link href={`/courses/${courseId}/${chapter.slug}`} >
                    <button
                      // onClick={() => router.push(`/courses/${courseId}/${chapter.slug}`)}
                      className="text-left w-full hover:underline text-blue-600"
                      >
                      {chapter.chapter_name}
                    </button>
                      </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;