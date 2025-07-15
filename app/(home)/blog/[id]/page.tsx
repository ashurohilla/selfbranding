import React from "react";
import { IBlog } from "@/lib/types";
import Content from "./components/Content"
import { SITE_URL } from "@/app/config";
import { createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import Comments from "./components/coments/coments";
import supabase from "@/utils/supabase/supabase";
import { IAuthor } from "@/lib/types";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/app/navbar/navbar";

export async function generateStaticParams() {
  const { data: blogs, error } = await supabase
    .from("blog")
    .select("slug");
  if (error) {
    throw error;
  }

  return blogs?.map((blog) => ({ id: blog.slug }));
}

function extractImageUrlsFromMarkdown(markdown: string): string[] {
	const imageUrls: string[] = [];
	
	// Regex for markdown images: ![alt text](image-url)
	const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
	// Regex for HTML images in markdown: <img src="..." />
	const htmlImageRegex = /<img[^>]+src="([^">]+)"/g;
	
	let match: RegExpExecArray | null;
	
	// Extract markdown format images
	while ((match = markdownImageRegex.exec(markdown))) {
		const src = match[2];
		if (src) {
			imageUrls.push(src);
		}
	}
	
	// Extract HTML format images (in case markdown contains HTML)
	while ((match = htmlImageRegex.exec(markdown))) {
		const src = match[1];
		if (src) {
			imageUrls.push(src);
		}
	}
	
	return imageUrls;
}

// Random placeholder images for fallback
const placeholderImages = [
	"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop",
	"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=300&fit=crop",
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
	"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
	"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=300&fit=crop"
];


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
                .from("blog")
                .select("*")
                .eq("slug", params.id)
                .single();
      const blog = await data
      	const images = extractImageUrlsFromMarkdown(blog.content);
						
						// Use first image from content, or random placeholder if no images found
						const displayImage = images.length > 0 ? images[0] : placeholderImages[ 0 % placeholderImages.length];
      return {
        title: blog?.title,
        openGraph: {
          title: blog?.title,
          url: `${SITE_URL}blog/${params.id}`,
          siteName: "Ashish Rohilla",
          images: displayImage,
          type: "website",
        },
        keywords: ["mechatronics", "arduino", "Raspberry pi"],
      };
    }

    export default async function Page({ params }: { params: { id: string } }) {
    
      const { data: blog, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug", params.id)
        .single();

  
    const { data: authorData, error: authorError } = await supabase
      .from("instructor")
      .select("*")
      .eq("id", blog.author)
      .single();

      return (
        <div>
          <Navbar/>
         <article className="pt-8">
        <div className="max-w-[1100px] pt-[60px] mx-auto min-h-screen space-y-10">
          <Content  blog={blog} author={authorData} />
        </div>
         </article>
        </div>
      );
    }