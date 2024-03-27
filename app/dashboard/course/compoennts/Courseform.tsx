"use client"
import React from 'react'
import { cn } from "@/lib/utils";
import { Input } from '@/components/ui/input';
import { useUser } from '@/lib/store/user';
import { useState } from 'react';
import { Icourse } from '@/lib/types';
import { course } from '@/lib/data';


 export default function Courseform( ) {
  const onSubmit = (data: Icourse) =>{
    
  }
  const user = useUser((state) => state.user);
  const [formData, setFormData] = useState<Icourse>({
    author: '',
    bannerImage: '',
    categoryId: '',
    description: '',
    instructor: '',
    name: '',
    price: '',
  });
  return (
    <div className=" pt-[100px] mx-4 justify-center    ">
          <h1 className="text-2xl  font-bold ">Add Course</h1>


    <form  className="grid grid-cols-3 grid-flow-row gap-4 shadow-md justify-center rounded pt2 pb-8">
      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="author">
          Author
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="author"
          type="text"
          name="author"
          placeholder="Enter author name"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="bannerImage">
          Banner Image URL
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="bannerImage"
          type="text"
          placeholder="Enter banner image URL"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="categoryId">
          Category ID
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="categoryId"
          type="number"
          placeholder="Enter category ID"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="description">
          Description
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Enter description"
        ></Input>
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="instructor">
          Instructor
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="instructor"
          type="text"
          placeholder="Enter instructor name"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="name">
          Name
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-6">
        <label className="block  font-bold mb-2" htmlFor="price">
          Price
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          placeholder="Enter price"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  )
}