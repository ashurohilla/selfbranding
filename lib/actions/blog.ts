"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { IBlog } from "@/lib/types";
import { revalidatePath, unstable_noStore } from "next/cache";
import { BlogFormSchema, BlogFormSchemaType } from "../../app/dashboard/blog/schema";
import { contents } from "cheerio/lib/api/traversing";
import { SiNginx } from "react-icons/si";

const DASHBOARD = "/dashboard/blog";

export async function createBlog(data: {
	content: string;
	title: string;
	image: string;
	author:string;
	meta_title: string;
	meta_description: string;
	slug: string;
	status: boolean;
	created_at: string;
	coments_enabled: boolean;
	
}) {

	const supabase = await createSupabaseServerClient();
	const blogResult = await supabase
		.from("blog")
		.insert(data)
		.single();

    return blogResult;
}

export async function createCourse(data: {
	banner_image: string;
	Catogory_id: string;
	created_at: string;
	Description: string;
	instructor: string;
	Name: string;
	price: string;
	
}) {

	const supabase = await createSupabaseServerClient();
	const CourseResult = await supabase
		.from("course")
		.insert(data)
		.single();
	console.log(CourseResult);	

    return CourseResult;
}


export async function readCatogries() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("catagory")
		.select("*")
		.order("created_at", { ascending: true });
}



export async function readBlog() {
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("blog")
		.select("*")
		.eq("status", true)
		// .order("created_at", { ascending: true });
}

export async function readBlogAdmin() {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const supabase = await createSupabaseServerClient();

	return supabase
		.from("blog")
		.select("*")
		// .eq('author', 'hjgkj' )
		.order("created_at", { ascending: true });
		
}

export async function Coursebyadmin() {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const supabase = await createSupabaseServerClient();

	return supabase
		.from("course")
		.select("*")
		.eq('instructor', '5023e815-5c4a-4cfe-8607-18c263d0fbe3' )
		.order("created_at", { ascending: true });
		
}

export async function readBlogById(blogId: number) {
	const supabase = await createSupabaseServerClient();
	return supabase.from("blog").select("*").eq("id", blogId).single();
}
export async function readBlogIds() {
	const supabase = await createSupabaseServerClient();
	return supabase.from("blog").select("id");
}

export async function readBlogDeatailById(id : number) {
	const supabase = await createSupabaseServerClient();
	return await supabase
		.from("blog")
		.select("*")
		.eq("id", id)
		.single();
}

export async function readBlogContent(blogId: string) {
	unstable_noStore();
	const supabase = await createSupabaseServerClient();
	return await supabase
		.from("blog_content")
		.select("content")
		.eq("blog_id", blogId)
		.single();
}

export async function updateBlogById(blogId: string, data: IBlog) {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").update(data).eq("id", blogId);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);
	return JSON.stringify(result);
}

export async function updateBlogDetail(
	id: string,
	data: BlogFormSchemaType
) {
	const supabase = await createSupabaseServerClient();
	const resultBlog = await supabase
		.from("blog")
		.update(data)
		.eq("id", id);
	if (resultBlog) {
		return (resultBlog);
	} else {
		revalidatePath(DASHBOARD);
	}
}

export async function deleteBlogById(blogId: number) {
	console.log("deleting blog post")
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").delete().eq("id", blogId);
	console.log(result);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);	
	return JSON.stringify(result);
}
export async function deleteCoursebyid(course_id: string) {
	console.log("deleting course")
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("course").delete().eq("id", course_id);
	console.log(result);
	revalidatePath(DASHBOARD);
	revalidatePath("/course/" + course_id);	
	return JSON.stringify(result);
}