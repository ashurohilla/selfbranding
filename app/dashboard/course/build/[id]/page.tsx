import React from "react";
import { SITE_URL } from "@/app/config"
import supabase from "@/utils/supabase/supabase";
import "react-quill/dist/quill.snow.css";
import ModuleTable from "../../compoennts/NewModuleTable";


export async function generateStaticParams() {
  const { data: course, error } = await supabase
    .from("course")
    .select("slug");

  if (error) {
    throw error;
  }

  return course?.map((course) => ({ id: course.slug }));
}

    export default async function Page({ params }: { params: { id : string } }) {
      const { data: course, error } = await supabase
        .from("course")
        .select("*")
        .eq("slug", params.id)
        .single();

      return (
        <div className="w-full pt-[90px] mx-auto min-h-screen space-y-10">
            <div>
      <div className="flex">
        <p className="text-4xl ">
          You are building {course?.Name} course
          <p className="text-xl  flex  font-medium  dark:text-gray-400">
            {course?.Description}
          </p>
        </p>

        <p className="text-xl ml-[600px] font-medium  dark:text-gray-400">
          {new Date(course?.created_at!).toDateString()}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4  mx-2 grid-flow-row mt-10">
        <div className="border-2 rounded-md  border-black">

          <ModuleTable id={course.slug}/>
      
        </div>

        <div>here is am</div>
      </div>
    </div>
          {/* <CourseDashboard  id={params.id}  course={course} /> */}
        </div>
      );
    }