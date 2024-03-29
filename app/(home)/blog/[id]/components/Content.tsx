"use client";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import { BlogContentLoading } from "./Skeleton";
import Image from "next/image";
interface BlogData {
  author: string | null;
  comments_enabled: boolean | null;
  content: string | null;
  created_at: string;
  id: number;
  image: string | null;
  meta_description: string | null;
  meta_title: string | null;
  published_at: string;
  slug: string;
  status: string;
  title: string | null;
}
interface AuthorData {
          author: string | null
          Bio: string | null
          created_at: string
          github: string | null
          id: string
          instagram: string | null
          linkdin: string | null
          Name: string | null
}


export default function Content({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [authorid, setAuthorid] = useState<string | null>(null);


  const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);





  const readBlogContent = async () => {
    try {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setBlog(data);
      readauthorname(data?.author)
    } catch (err) {
      setError(`Failed to fetch blog post`);
    } finally {
      setLoading(false);
    }
  };
  const readauthorname = async (authorid :String) => {
    try {
      const { data, error } = await supabase
      .from("instructor")
      .select("*")
      .eq("id", authorid)
      .single();
      console.log(data)

    if (error) {
      throw new Error(error.message);
    }
    setAuthor(data);
    }
    catch (err) {
      setError(`failed to fetch author`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    readBlogContent();
   
  }, [id]);


  if (loading) {
    return <BlogContentLoading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-4  ">

    	<div className="sm:px-10 space-y-5">
				<h1 className=" text-3xl font-bold dark:text-gray-200">
        {blog?.title}
				</h1>
		<div className=" flex justify-between px-2 py-2 font-lg">
    <p className="text-sm flex dark:text-gray-400">
        {new Date(blog?.created_at!).toDateString()}
				</p>
        <p className="text-sm flex dark:text-gray-400">
        {author?.Name}
				</p>
    </div>
        </div>
        
        <div className="w-full h-96 relative">
				<Image
        priority
        src={blog?.image!}
        alt="cover"
        fill
        className=" object-cover object-center rounded-md border-[0.5px] border-zinc-600"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
      <MarkdownPreview content={blog?.content || ""} />;
      </div>
  );
}