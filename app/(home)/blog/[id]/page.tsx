import React from "react";
import { IBlog } from "@/lib/types";
import Content from "./components/Content"
import { SITE_URL } from "@/app/config";
import { createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: blogs, error } = await supabase
    .from("blog")
    .select("slug");

  if (error) {
    throw error;
  }

  return blogs?.map((blog) => ({ id: blog.slug }));
}


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
                .from("blog")
                .select("*")
                .eq("slug", params.id)
                .single();
      const blog = await data
      return {
        title: blog?.title,
        openGraph: {
          title: blog?.title,
          url: `${SITE_URL}blog/${params.id}`,
          siteName: "Hardware Garage",
          images: blog?.image,
          type: "website",
        },
        keywords: ["mechatronics", "arduino", "Raspberry pi"],
      };
    }
    export default async function Page({ params }: { params: { id: string } }) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    
      const { data: blog, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug", params.id)
        .single();
    
      if (error) {
        throw error;
      }
    
      return (
        <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
          <Content id={blog?.slug} />
        </div>
      );
    }