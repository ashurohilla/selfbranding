import { readmodulesbycourseId } from '@/lib/actions/blog';
import Sidebar from '@/app/courses/components/sidebar';
import Navbar from '@/app/navbar/navbar';
import { IModules } from '@/lib/types';

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
      <div className="flex pt-[90px]">
        <Sidebar modules={modules} courseId={params.courseSlug} />
        <div className="flex-grow px-8">{children}</div>
      </div>
    </div>
  );
}
