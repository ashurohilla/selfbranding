"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { readmoreblog } from "@/lib/actions/blog";
import Navbar from "../navbar/navbar";
import { IBlog } from "@/lib/types";

// Extract image URLs from markdown content
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

export default function Home() {
	const [blogs, setBlogs] = useState<IBlog[]>([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const { data } = await readmoreblog();
				if (data && data.length > 0) {
					setBlogs(data as IBlog[]);
				}
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};
		fetchBlogs();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog, index) => {
						const images = extractImageUrlsFromMarkdown(blog.content);
						
						// Use first image from content, or random placeholder if no images found
						const displayImage = images.length > 0 
							? images[0] 
							: placeholderImages[index % placeholderImages.length];

						return (
							<Link key={blog.slug || index} href={`/blog/${blog.slug}`}>
								<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
									<div className="relative h-48 w-full">
										{displayImage ? (
											<Image
												src={displayImage}
												alt={blog.title ? String(blog.title) : "Blog post image"}
												fill
												className="object-cover"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										) : (
											<div className="h-full w-full bg-gray-200 flex items-center justify-center">
												<span className="text-gray-500">No Image Found</span>
											</div>
										)}
									</div>
									
									<div className="p-4">
										<div className="text-sm text-gray-500 mb-2">
											{new Date(blog.created_at).toDateString()}
										</div>
										<h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
											{blog.title}
										</h3>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}