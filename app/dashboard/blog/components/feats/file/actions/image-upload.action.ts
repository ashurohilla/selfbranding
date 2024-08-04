"use server";

import {
  responseError,
  responseSuccess,
} from "@/lib/response/response-helper";
import { nanoid } from "nanoid";
import { z } from "zod";
import { imageUploadSchema } from "../validation/image-upload.validation";
import supabase from "@/utils/supabase/supabase";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

export const onUploadImageAction = async (form: FormData) => {
  const image = form.get("image") as File | null;

  if (!image) {
    throw new Error("No file uploaded");
  }

  // Validate the file using Zod
  try {
    imageUploadSchema.parse({ image });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((err) => err.message).join(", ");
      return responseError(message);
    } else {
      return responseError("Invalid file format");
    }
  }

  const uniqueId = nanoid();
  const imageName = `${uniqueId}_${image.name}`;

  // Convert the file to a buffer
  const fileBuffer = Buffer.from(await image.arrayBuffer());

  // Upload the image to Supabase Storage
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`uploads/${imageName}`, fileBuffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type,
    });

  if (error) {
    return responseError("Failed to upload image to Supabase");
  }

  const publicUrl = supabase.storage.from('images').getPublicUrl(`uploads/${imageName}`).data.publicUrl;

  return responseSuccess("File uploaded successfully", {
    path: publicUrl,
  });
};
