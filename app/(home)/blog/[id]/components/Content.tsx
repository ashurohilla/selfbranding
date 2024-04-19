"use client";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import { BlogContentLoading } from "./Skeleton";
import Image from "next/image";
import supabase from "@/utils/supabase/supabase";
import { IAuthor, IBlog } from "@/lib/types";

interface Props {
  blog: IBlog; // Define prop type'
  author:IAuthor;
}
export default function Content({ blog , author  } : Props ) {

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