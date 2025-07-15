"use client"
import React, { useState } from "react";
import Image from "next/image";
import { IAuthor, IBlog } from "@/lib/types";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineComment, AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { LinkedinIcon, InstagramIcon, TwitterIcon, ShareIcon, CopyIcon, Clock, Calendar } from "lucide-react";
import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote/rsc'
import Footer from "@/components/Footer";
import BlogBody from "@/components/editor/BlogBody";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_URL } from "@/app/config";
import { toast } from "@/components/ui/use-toast";

const Comments = dynamic(() => import('./coments/coments'), { ssr: false });

interface Props {
  blog: IBlog;
  author: IAuthor;
}

export default function Content({ blog, author }: Props) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const blogUrl = `https://${SITE_URL}blog/${blog?.slug}`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${blogUrl}&text=${encodeURIComponent(blog?.title || '')}`, "_blank");
  };
  
  const shareOnThreads = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`, "_blank");
  };
  
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${encodeURIComponent(blog?.title || '')}`, "_blank");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast({ description: "Link copied to clipboard!" });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(!isCommentSectionOpen);
  };

  const estimatedReadTime = Math.ceil((blog?.content?.length || 0) / 200); // Rough estimate

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-gilroy_bold">
              {blog?.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog?.created_at!).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        {/* Author Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={author?.linkdin} target="_blank" className="relative group">
                <Image 
                  className="rounded-full border-2 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300" 
                  width={64} 
                  height={64} 
                  alt="profile" 
                  src={author?.profile} 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </Link>
              <div>
                <h3 className="font-bold text-lg text-gray-900 font-gilroy_medium">{author?.Name}</h3>
                <p className="text-gray-600 text-sm">Software Engineer & Writer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link target="_blank" href={author?.github} className="text-gray-600 hover:text-gray-900 transition-colors">
                <BsGithub size={20} />
              </Link>
              <Link target="_blank" href={author?.instagram} className="text-gray-600 hover:text-pink-600 transition-colors">
                <BsInstagram size={20} />
              </Link>
              <Link target="_blank" href={author?.twiter} className="text-gray-600 hover:text-blue-500 transition-colors">
                <BsTwitter size={20} />
              </Link>
              <Link target="_blank" href={author?.linkdin} className="text-gray-600 hover:text-blue-700 transition-colors">
                <BsLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200  'bg-gray-100 text-gray-600 hover:bg-gray-200" 
                  
              >
                <AiOutlineHeart className= "fill-current " />
                <span className="text-sm font-medium">Like</span>
              </button>
              <button
                onClick={toggleCommentSection}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
              >
                <AiOutlineComment />
                <span className="text-sm font-medium">Comments</span>
              </button>
              <div className="flex items-center gap-2 text-gray-500">
                <AiOutlineEye />
                <span className="text-sm">1.2k views</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200">
                  <ShareIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>
                    <button onClick={copyToClipboard} className="flex items-center gap-3 w-full">
                      <CopyIcon className="w-4 h-4" />
                      <span>Copy link</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={shareOnTwitter} className="flex items-center gap-3 w-full">
                      <TwitterIcon className="w-4 h-4" />
                      <span>Share on Twitter</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={shareOnThreads} className="flex items-center gap-3 w-full">
                      <InstagramIcon className="w-4 h-4" />
                      <span>Share on Threads</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={shareOnLinkedIn} className="flex items-center gap-3 w-full">
                      <LinkedinIcon className="w-4 h-4" />
                      <span>Share on LinkedIn</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <BsThreeDotsVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link className="font-medium text-green-600 hover:text-green-700" target="_blank" href={author?.twiter}>
                      Follow Author
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium text-red-600 hover:text-red-700">
                    Report Article
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className={`bg-white overflow-hidden transition-all duration-300 ${
          isCommentSectionOpen ? "mr-80" : ""
        }`}>
          <div className="p-8 md:p-12">
            {/* Medium-style content styling */}
            <div className="max-w-none">
              <BlogBody source={blog?.content || ""} />
              {/* <MDXRemote 
                source={blog?.content || ""} 
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8 mt-12 font-serif">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6 mt-12 font-serif">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-4 mt-8 font-serif">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-800 text-lg leading-relaxed mb-6 font-serif">
                      {children}
                    </p>
                  ),
                  code: ({ children }) => (
                    <code className=" text-gray-700 px-2 py-1 rounded font-mono text-sm">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 text-gray-400 p-6 rounded-lg my-8 overflow-x-auto border border-gray-200 font-mono text-sm">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 bg-gray-50 p-6 my-8 rounded-r-lg italic text-gray-700 text-lg font-serif">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-6 space-y-3 text-gray-800 text-lg font-serif">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-6 space-y-3 text-gray-800 text-lg font-serif">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-800 leading-relaxed ml-6 list-disc">
                      {children}
                    </li>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-gray-900 font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-700 italic">
                      {children}
                    </em>
                  ),
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt} 
                      className="w-full rounded-lg shadow-lg my-8 border border-gray-200"
                    />
                  ),
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          isCommentSectionOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Comments id={blog?.slug} toggleCommentSection={toggleCommentSection} />
      </div>

      {/* Overlay */}
      {isCommentSectionOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={toggleCommentSection}
        />
      )}


   <Footer />
    </div>
  );
}