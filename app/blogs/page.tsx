"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { readmoreblog } from "@/lib/actions/blog";
import Navbar from "../navbar/navbar";
import { IBlog } from "@/lib/types";

// Extract image URLs from HTML string
function extractImageUrlsFromHtml(html: string): string[] {
	const imageUrls: string[] = [];
	const imgTagRegex = /<img[^>]+src="([^">]+)"/g;
	let match: RegExpExecArray | null;

	while ((match = imgTagRegex.exec(html))) {
		const src = match[1];
		if (src) {
			imageUrls.push(src);
		}
	}

	return imageUrls;
}

export default function Home() {
	const [blogs, setBlogs] = useState<any>([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			const { data } = await readmoreblog();
			if (data && data.length > 0) {
				setBlogs(data);
			}
		};
		fetchBlogs();
	}, []);

	return (
		<div className="">
			<Navbar />

			<div className="pt-[100px]">
				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
					{blogs.map((blog: { content: string; slug: any; created_at: string | number | Date; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => {
						const images = extractImageUrlsFromHtml(blog.content);
						const randomImage =
							images[Math.floor(Math.random() * images.length)];

						return (
							<Link
								href={`/blog/${blog.slug}`}
								className="w-full border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
								key={index}
							>
								<div className="w-full h-72 sm:w-full md:h-64 xl:h-96 relative">
									{randomImage ? (
										<Image
											priority
											src={randomImage}
											alt="cover"
											fill
											className="rounded-md object-cover object-center"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									) : (
										<div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center text-sm text-gray-700">
											No Image Found
										</div>
									)}
								</div>

								<div className="space-y-2">
									<p className="text-sm dark:text-gray-400">
										{new Date(blog.created_at).toDateString()}
									</p>
									<h1 className="text-xl font-bold dark:text-gray-300">
										{blog.title}
									</h1>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
