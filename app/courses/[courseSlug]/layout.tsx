import { readmodulesbycourseId } from '@/lib/actions/blog';
import Sidebar from '@/app/courses/components/sidebar';
import Navbar from '@/app/navbar/navbar';
import { IModules } from '@/lib/types'
import Link from 'next/link';

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string };
}) {
  const { data: moduleData } = await readmodulesbycourseId(params.courseSlug);
  const modules: IModules = moduleData ?? [];

  return (
    <div>
      <Navbar />
      <div className="flex md:pt-[90px] pt-[30px]">
        <Sidebar modules={modules} courseId={params.courseSlug} />
        <div className="flex-grow px-2">{children}</div>
      </div>
      
      {/* Floating Coffee Donation Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="https://buymeacoffee.com/ashishrohilla" target="_blank" rel="noopener noreferrer" >
        <button
          className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Buy me a coffee"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.252 8.252 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003.001 2.48z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Buy me a coffee ☕
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
          </Link>
      </div>
    </div>
  );
}