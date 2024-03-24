import * as z from "zod";

export const BlogFormSchema = z
	.object({
		title: z.string().min(10, {
			message: "title is too short",
		}),
		content: z.string().min(50, {
			message: "Content is too short",
		}),
		image: z.string().url({
			message: "Invalid url",
		}),
		status: z.boolean(),
		meta_title: z.string(),
		meta_description: z.string(),
		created_at: z.string(),
		slug: z.string(),
		author: z.string(),
		coments_enabled:z.boolean(),
		

	})
	.refine(
		(data) => {
			const image = data.image;
			try {
				const url = new URL(image);
				return url.hostname === "images.unsplash.com";
			} catch {
				return false;
			}
		},
		{
			message: "Currently we are supporting only the image from unsplash",
			path: ["image"],
		}
	);

export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>;
