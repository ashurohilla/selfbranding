"use client"
import React from 'react'
import { Icourse } from '@/lib/types';
import Image from 'next/image';
interface Props {
    course: Icourse; // Define prop type'
  }

function CourseDashboard({ course}: Props) {
  return (
    <div>
    <div className=" flex justify-between px-1 py-2 mx-0 sm:mx-2 font-lg">
    <div className="flex gap-2 ">
      <div className="">
        {/* <Image
          className="rounded-full px-1 py-1 "
          width={60}
          height={60}
          alt="profile"
          src={course?.Description}
        /> */}
      </div>

      <div className="pt-2">
        <p className="text-lg font-medium  dark:text-gray-400">
          {course?.Name}
        </p>
        <p className="text-sm   font-medium  dark:text-gray-400">
          {new Date(course?.created_at!).toDateString()}
        </p>
        <p className="text-sm   font-medium  dark:text-gray-400">
    {course?.Description}
        </p>
      </div>
    </div>

  </div> 
          </div>
   
  )
}

export default CourseDashboard