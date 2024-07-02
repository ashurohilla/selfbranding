"use client";
import React from "react";

import { toast } from "@/components/ui/use-toast";
import { IBlogDetial, IchapterDetails } from "@/lib/types";
import { updatechapter } from "@/lib/actions/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { Chapterformschematype } from "@/app/dashboard/blog/schema";
import Editchapterform from "@/app/dashboard/course/compoennts/Editchapterform";

export default function EditchaptersForm({ chapter }: { chapter: IchapterDetails }) {
	const router = useRouter();

	// const onchaptersubmit = async (data: Chapterformschematype) => {
	// 	const result = (
	// 		await updatechapter(chapter?.id!, data)
	// 	) as PostgrestSingleResponse<null>;
	// 	if (result.error) {
	// 		toast({
	// 			title: "Fail to update ",
	// 			description: (
	// 				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 					<code className="text-white">
	// 						{result.error?.message}
	// 					</code>
	// 				</pre>
	// 			),
	// 		});
	// 	} else {
	// 		toast({
	// 			title: "Successfully update 🎉",
	// 		});
	// 		router.push("/dashboard");
	// 	}
	// };
  return "hello"

	// return <Editchapterform onHandleSubmit={onchaptersubmit} defaultlesson={chapter} />;
}
