"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";
import { useUser } from "@/lib/store/user";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { defaultcoment } from "@/lib/data";

interface CommentData {
    coment: string
    coment_id : string
    created_at: string
    slug_id: string
    user_id: string
  }
  interface postcomentdata {
    coment: string
    created_at: string
    slug_id: string
    user_id: string
  }


const Comments = ({ id }: { id: string }) => {
    const [AllComents, SetCommnetDATA] = useState<CommentData[] | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [coment, setComment] = useState<string>(''); 
    const [newCommentAdded, setNewCommentAdded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const user = useUser((state) => state.user);
    const [formValues, setFormValues] = useState<postcomentdata>(defaultcoment);
    const form = useForm<postcomentdata>({
        defaultValues: formValues,
      });
      console.log(formValues)

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = e.target.value;
        setComment(newComment);
        setFormValues({
          ...formValues,
          coment: newComment,
        });
      };
      const handleSubmit = async () => {
        const { data, error } = await supabase
          .from('blog_coments')
          .insert([
            formValues
          ])
          .select()
        console.log(data);
        setNewCommentAdded(true);
      };
  useEffect(() => {
    if (user?.id) {
      const user_id = user?.id;
      const slug_id = id;
      setFormValues({
        ...formValues,
       
        user_id,
        slug_id,
        coment,
        created_at: new Date().toISOString().slice(0, 16),
      });
    }
  }, [user?.id]);


    const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

    const readcommnets = async (id: string) => {
        try {
          const { data , error } = await supabase
            .from("blog_coments")
            .select("*")
            .eq("slug_id", id)    
          if (error) {
            throw new Error(error.message);
          }
          SetCommnetDATA(data);
        } catch (err) {
          setError(`Failed to fetch blog post`);
        } finally {
          setLoading(false);
        }
      };


 useEffect(() => {
  readcommnets(id);
  setNewCommentAdded(false);
}, [id, newCommentAdded]);

    


  return (
    <div className="container mx-auto mt-12">
    <h1 className="text-softTextColor mb-8">Comments</h1>
    {user?.id ? (
  <div className="flex items-center justify-between gap-8">
       <input
            type="text"
            placeholder="What are your thoughts"
            value={coment} // Bind input value to state
            onChange={handleInputChange} // Handle input change event
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
    <button
      className="bg-teal-500 text-white font-bold px-5 py-4 rounded-md cursor-pointer"
      onClick={handleSubmit}
    >
      Send
    </button>
  </div>
) : (
  <Link href="/login" className="text-teal-500">
    Login to write a comment
  </Link>
)}
  
    <div className="mt-12">
      {isLoading ? (
        "loading"
      ) : (
        <div>
          {AllComents?.map((item) => (
            <div className="mb-12" key={item.coment_id}>
              <div className="flex items-center gap-5">
            
                <div className="flex flex-col gap-1 text-softTextColor">
                  <span className="font-medium">{item.coment}</span>
                  <span className="text-sm">{item.created_at}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Comments;