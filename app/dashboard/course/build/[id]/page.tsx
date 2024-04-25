import React from "react";
import { SITE_URL } from "@/app/config"
import supabase from "@/utils/supabase/supabase";
import CourseDashboard from "../../compoennts/CourseDashboard";

import "react-quill/dist/quill.snow.css";


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
        <div className="max-w-[800px] pt-[60px] mx-auto min-h-screen space-y-10">
          <CourseDashboard  course={course} />
        </div>
      );
    }