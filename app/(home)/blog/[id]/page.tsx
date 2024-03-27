import React from "react";
import { IBlog } from "@/lib/types";
import Image from "next/image";
import Content from "./components/Content";
import Head from "next/head";
import Script from "next/script";

export async function generateStaticParams() {
    try {
        const { data: blogs } = await fetch(process.env.SITE_URL + "/blog/?id=*").then((res) => res.json());
        
        return blogs.map((blog: IBlog) => ({
            id: blog.id, // Include other properties if needed
        }));
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return []; // Return an empty array or handle the error as needed
    }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
		const { data: blog } = (await fetch(
			process.env.SITE_URL + "/blog/" + params.id
		).then((res) => res.json())) as { data: IBlog };		
        return {
            title: blog?.title,
            openGraph: {
                title: blog?.title,
                url: "https://hardwaregarage.dev/blog/" + params.id, // Corrected URL format
                siteName: "Hardware Garage",
                images: blog?.image,
                type: "website",
            },
            keywords: ["mechatronics", "arduino", "Raspberry pi"],
        };
    } catch (error) {
        console.error("Error fetching blog metadata:", error);
        return {}; // Return an empty object or handle the error as needed
    }
}
export default async function page({ params }: { params: { id: string } }) {
	return (
      <div>

		<div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
			
			<Content id={params.id} />
		</div>
	  </div>
		
	);
}
