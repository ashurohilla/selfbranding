import Link from "next/link";
import React from "react";
import Image from "next/image";
import { readcourse } from "@/lib/actions/blog";
import Navbar from "../navbar/navbar";
import { Terminal, Calendar, ArrowRight, Layers, ArrowUpRight } from "lucide-react"; // Icons for tech feel





export default async function Page() {
  let { data: Courses } = await readcourse();

  if (!Courses?.length) {
    Courses = [];
  }

  return (
    <div className="min-h-screen  bg-black text-zinc-100 selection:bg-green-500/30">
      {/* Navbar Container */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-800 bg-black/50">
        <Navbar />
      </div>

      <main className="max-w-7xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
                Explore Courses
            </h1>
            <p className="text-zinc-400 max-w-lg flex items-center gap-2">
                <Terminal size={16} className="text-green-500" />
                <span>Level up your devops skills.</span>
            </p>
        </div>

        {/* Grid Section */}
        {Courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Courses.map((course, index) => {
              // Highlight the first item as a feature
              const isFeatured = index === 0;

              return (
             <div    className={`
                    group relative overflow-hidden rounded-xl border border-zinc-800 
                    bg-zinc-900/50 transition-all duration-300 hover:border-green-500/50 
                    hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1
                    ${isFeatured ? "lg:col-span-2 md:col-span-3" : ""}
                  `}>
                 <Link
                  href={"/courses/" + course.slug}
                  key={index}
               
                >
                  {/* Image Container */}
                  <div className={`relative w-full overflow-hidden ${isFeatured ? "aspect-video md:h-[400px]" : "aspect-video"}`}>
                    {/* Overlay gradient for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60" />
                    
                    <Image
                      priority={index < 2} // Load top images faster
                      src={course.banner_image}
                      alt={course.Name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 70vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                    
                    {/* Tech Badge (Optional) */}
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-zinc-700 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">
                        OPEN
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="relative z-20 p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{new Date(course.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>

                    <h2 className={`font-bold text-zinc-100 group-hover:text-green-400 transition-colors ${isFeatured ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {course.Name}
                    </h2>

                    {/* Fake CTA that appears on hover */}
                  
                  </div>
                </Link>
                  <div className="flex items-center py-2 px-4 justify-between text-sm font-medium text-green-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                   <div className="flex">
                         <span>Start Learning</span>
                        <ArrowRight size={16} className="ml-2" />
                   </div>
                   <Link href={`/courses/roadmap/${course.slug}`} className="flex" >
                       <div className="flex">
                           <span>Roadmap</span>
                        <ArrowUpRight size={16} className="ml-2" />
                       </div>
                   </Link>
                    </div>
             </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
                <Layers size={32} className="text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-300">No Courses Found</h3>
            <p className="text-zinc-500 mt-2">Check back later for new content.</p>
          </div>
        )}
      </main>
    </div>
  );
}