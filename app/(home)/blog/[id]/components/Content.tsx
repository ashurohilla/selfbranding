"use client";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import { BlogContentLoading } from "./Skeleton";
import Image from "next/image";
import supabase from "@/utils/supabase/supabase";
import { IAuthor, IBlog } from "@/lib/types";
import { BsGithub } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { PiLinkedinLogo } from "react-icons/pi";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { PlayCircle, TwitterIcon } from "lucide-react";
import { IoShare } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Share1Icon } from "@radix-ui/react-icons";
import CopyButton from "@/components/markdown/CopyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SITE_URL } from "@/app/config";


interface Props {
  blog: IBlog; // Define prop type'
  author:IAuthor;
}
export default function Content({ blog , author  } : Props ) {
  const blogUrl = `https://${SITE_URL}/blog/${blog?.slug}`;

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
    window.open(twitterUrl, '_blank');
  };
  const copylink = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
    window.open(twitterUrl, '_blank');
  };


  const shareonthreads = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(blogUrl)}`;
    window.open(linkedInUrl, '_blank');
  };
  return (
    <div className="">
    	<div className="sm:px-10 space-y-5">
				<h1 className="text-6xl font-bold dark:text-gray-200">
        {blog?.title}
				</h1>
		<div className=" flex justify-between px-2 py-2 font-lg">

      <div className="flex gap-2 ">

    <div className="">
       <Image className="rounded-full px-1 py-1 "
       width={60}
       height={60}
       alt="profile"
       src={author?.profile}
       />
       </div>


      <div className="pt-2">
    <p className="text-lg font-medium  dark:text-gray-400">
       {author?.Name}
				</p>
    <p className="text-sm   font-medium  dark:text-gray-400">
        {new Date(blog?.created_at!).toDateString()}
				</p>
      </div>
       </div>
        <div className="flex pt-10 gap-3">
        <Link  target="_blank" href={author?.github}>
        <BsGithub/>
        </Link>
        <Link  target="_blank"  href={author?.instagram}>
        <BsInstagram/>
        </Link>
        <Link  target="_blank" href={author?.twiter}>
        <BsTwitter/>
        </Link>
        <Link   target="_blank" href={author?.linkdin}>
        <PiLinkedinLogo/>
        </Link> 
        <p className="text-lg font-medium flex dark:text-gray-400">
       
				</p>
        </div>
    </div>


    <div>
    <hr className="border-gray-200" />

    <div className="flex items-center justify-between mb-4 pt-2">

      <div className="flex items-center space-x-4">
        <button className="ml-[60px] flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition">
          <span><AiOutlineComment/></span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <span className="material-icons"><PlayCircle/></span>
        </button>
        <button
          className="text-gray-600 font-medium text-xl hover:text-gray-800 transition"
        >
<DropdownMenu>
  <DropdownMenuTrigger> <span className="material-icons"><IoShare/></span>
</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel> 
      <button className="flex pl-3 px-2">
        <span className=" py-2">
        <Share1Icon/>
        </span>
     <span  className="flex ml-2 pt-1 ">  Copy link</span>
     <span className="ml-1">        <CopyButton id={blogUrl} />
</span>
       </button>
       </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
    <button onClick={shareOnTwitter} className="flex px-2 py-2 ">
        <span className="pt-1 ">
        <TwitterIcon/>
        </span>
     <span className="flex ml-2  "> Share on twiter</span>
       </button>
    </DropdownMenuItem>
    <DropdownMenuItem >
    <button onClick={shareonthreads} className="flex px-2 py-2 ">
        <span className="pt-1">
        <BsInstagram/>        </span>
     <span   className="flex ml-2  "> Share on threads</span>
       </button>
   
    </DropdownMenuItem>
    <DropdownMenuItem >
    <button onClick={shareOnLinkedIn} className="flex px-2 py-2 ">
        <span className="pt-1">
        <PiLinkedinLogo/>      </span>
     <span   className="flex ml-2  ">Share on Linkdin</span>
       </button>
    </DropdownMenuItem>
  </DropdownMenuContent>




</DropdownMenu>
        </button>
        <button
          className="text-gray-600 mr-4 hover:text-gray-800 transition"
        >
          <DropdownMenu>
  <DropdownMenuTrigger><span className="material-icons"><BsThreeDotsVertical/></span></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link className="font-medium text-green-400" target="_blank" href={author?.twiter}>
      Follow Author
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem className="font-large text-red-700">Report Article</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  
        </button>
      </div>
    </div>
    <hr className="border-gray-200 font-mono" />
    </div>




        </div>
        
        <div className="w-full mt-6 h-96 relative">
				<Image
        priority
        src={blog?.image!}
        alt="cover"
        fill
        className=" object-cover object-center rounded-md border-[0.5px] border-zinc-600"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
      <div className="font-[20px] mb-[20px] contentclass"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          />
      {/* <MarkdownPreview content={blog?.content || ""} />; */}
      </div>
  );
}