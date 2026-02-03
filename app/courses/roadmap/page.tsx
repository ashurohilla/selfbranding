import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readcourse } from "@/lib/actions/blog";
export default async function Page() {
  let { data: Courses } = await readcourse();
  if (!Courses?.length) Courses = [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-teal-500/30 transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#050505]" />
        {/* Moving Scanline */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-teal-500/20 dark:bg-teal-500/10 animate-[scan_8s_linear_infinite]" />
      </div>

      <div className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50 bg-white/70 dark:bg-black/50">
      </div>

      <main className="relative z-10 max-w-7xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-mono text-xs tracking-widest uppercase">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            System.Status: Active
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white">
            ALGO <span className="text-teal-500 dark:text-teal-400">COURSES</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg font-mono text-sm border-l-2 border-teal-500 pl-4">
            Compiling advanced modules for MLOps and DevSecOps engineering.
          </p>
        </div>

        {/* Grid Section */}
        {Courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Courses.map((course, index) => {
              const isFeatured = index === 0;
              return (
                <div key={index} className={`group relative flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md transition-all duration-500 hover:border-teal-500 ${isFeatured ? "lg:col-span-2 md:col-span-3" : ""}`}>
                  <Link href={"/courses/roadmap/" + course.slug} className="flex-1">
                    <div className={`relative w-full overflow-hidden ${isFeatured ? "aspect-video md:h-[420px]" : "aspect-video"}`}>
                      <Image src={course.banner_image} alt={course.Name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050505] via-transparent opacity-90" />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-teal-500 transition-colors">
                        {course.Name}
                      </h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}
      </main>
    </div>
  );
}