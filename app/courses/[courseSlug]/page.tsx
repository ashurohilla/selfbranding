import { readcoursebyid } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import Navbar from '@/app/navbar/navbar';

export default async function CourseOverviewPage({
  params,
}: {
  params: { courseSlug: string };
}) {
  const { courseSlug } = params;
  const { data: course } = await readcoursebyid(courseSlug);

  if (!course) return notFound();

  return (
    <div className="mt-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-2">{course.Name}</h1>
      <p className="mb-4 text-sm text-gray-500">Instructor: {course.Description}</p>
      <p className="text-lg">
        Welcome to <strong>{course.Name}</strong>! Please select a chapter from the sidebar to begin learning.
      </p>
    </div>
  );
}
