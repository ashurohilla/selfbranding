"use client"
import React from 'react';
import Navbar from '@/app/navbar/navbar';

export default function Hero() {
  return (
    <div className="relative">

      <video
        className="w-full bg-white/10 backdrop-blur-sm rounded-sm  shadow-sm md:h-screen object-cover"
        autoPlay
        loop
        muted
        src="https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/videos/hardware.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-center justify-center">

        <div className="text-center text-white">
          <h1 className="md:text-8xl text-4xl font-bold mb-4">Stay curious.</h1>
          <p className="md:text-2xl  text-sm font-medium mb-8">
           Discover hardware and Robotics  <br /> passion of Engineering.
          </p>
          <button className="bg-black text-white md:px-6 md:py-3 px-2 py-2 rounded-full md:font-medium font-small hover:bg-gray-800">
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
}