import React from "react";
import { SITE_URL } from "@/app/config"
import supabase from "@/utils/supabase/supabase";
import "react-quill/dist/quill.snow.css";
import ModuleTable from "../../compoennts/NewModuleTable";
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
     <div>
     <p className="text-4xl  ">
          You are building {course?.Name} course
        
        </p>
        <p className="text-ss  pt-4  font-medium  dark:text-gray-400">
            {course?.Description}
          </p>
     </div>

    <div className="absolute">
    <p className="text-xl ml-[600px] font-medium mr-4  dark:text-gray-400">
          {new Date(course?.created_at!).toDateString()}
        </p>
    </div>
      </div>
        <div className="border-2 rounded-md  border-black">
          <ModuleTable id={course?.slug}/>
        </div>
    </div>
          {/* <CourseDashboard  id={params.id}  course={course} /> */}
        </div>
      );
    }