import React from "react";
import { IBlog } from "@/lib/types";
import Image from "next/image";
import Content from "./components/Content";

// export async function generateStaticParams() {
// 	const { data: blogs } = await fetch(process.env.SITE_URL + "/blog?id=*").then((res) => res.json());

// 	return blogs.map((blog) => ({
// 		blog: blog.id,
// 	  }))
// }

// export async function generateMetadata({ params }: { params: { id: string } }) {
// 	const { data: blog } = (await fetch(
// 		process.env.SITE_URL + "/blog?id=" + params.id
// 	).then((res) => res.json())) as { data: IBlog };

// 	return {
// 		title: blog?.title,
// 		authors: {
// 			name: "chensokheng",
// 		},
// 		openGraph: {
// 			title: blog?.title,
// 			url: "https://dailyblog-demo.vercel.app/blog" + params.id,
// 			siteName: "Hardware Garage",
// 			images: blog?.image,
// 			type: "website",
// 		},
// 		keywords: ["mechatronics", "arduino ", "Raspberry pi "],
// 	};
// }

export default async function page({ params }: { params: { id: string } }) {
	return (
		<div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
		
			<Content id={params.id} />
		</div>
	);
}
