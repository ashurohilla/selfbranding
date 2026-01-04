import Link from "next/link";
import React from "react";
import Image from "next/image";
import Navbar from "../navbar/navbar"; // Assuming this path exists in your project
import { 
  Terminal, 
  ArrowRight, 
  Layers, 
  ExternalLink, 
  Cpu, 
  Wrench, 
  Briefcase 
} from "lucide-react"; 

// ----------------------------------------------------------------------
// 1. CONFIGURATION: EDIT THIS LIST TO ADD/REMOVE PRODUCTS
// ----------------------------------------------------------------------
const products = [
  {
    id: "preparly",
    title: "Preparly",
    description: "The ultimate learning platform designed for structured education and exam preparation.",
    category: "Learning Platform",
    image: "https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/images/uploads/preparely.png", // Replace with your image path
    link: "https://sarkariresultindia.vercel.app/", // Replace with actual link
    featured: true, // Takes up 2 columns
    date: "2024-01-15"
  },
    {
    id: "devops Learning platform",
    title: "Living Devops",
    description: "The ultimate learning platform designed for structured education and exam preparation.",
    category: "Learning Platform",
    image: "https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/images/uploads/Q54s7yEde52QXX5ZHWCjO_courses%20.png", // Replace with your image path
    link: "https://www.ashishrohilla.co.in/courses", // Replace with actual link
    featured: false, // Takes up 2 columns
    date: "2024-01-15"
  },
  {
    id: "ai-enables",
    title: "AI Enables",
    description: "Next-gen AI platform. Automatically write articles, generate content, and automate workflows.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
    link: "https://scalesaas.ashishrohilla.co.in/", 
    featured: false,
    date: "2024-02-10"
  },
  {
    id: "json-editor",
    title: "JSON Editor Pro",
    description: "Free online tool to validate, format, and edit JSON data instantly.",
    category: "Dev Tool",
    image: "https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/images/uploads/jsonstudio.png",
    link: "https://scalesaas.ashishrohilla.co.in/tooling/jsoneditor",
    featured: false,
    date: "2024-04-05"
  },
  {
    id: "writeymlfiles",
    title: "Yml Master Suite",
    description: "Write yml and docker files directly in your browser for free.",
    category: "Utility",
    image: "https://owerrlaobwdowecvbfgk.supabase.co/storage/v1/object/public/images/uploads/ymlstudio.png",
    link: "https://scalesaas.ashishrohilla.co.in/tooling/writeymlfiles",
    featured: false,
    date: "2024-04-10"
  },
];




export default function Page() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-green-500/30">
      
      {/* Navbar Container */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-800 bg-black/50">
        <Navbar />
      </div>

      <main className="max-w-7xl pt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
                Product Ecosystem
            </h1>
            <p className="text-zinc-400 max-w-2xl text-lg flex items-center gap-2">
                <Terminal size={20} className="text-green-500" />
                <span>Premium platforms, agency services, and free developer tools.</span>
            </p>
        </div>

        {/* Grid Section */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              // Logic for Featured Items (Takes up 2 slots)
              const isFeatured = product.featured;

              return (
              <div 
                  key={index}
                  className={`
                    group relative overflow-hidden rounded-2xl border border-zinc-800 
                    bg-zinc-900/40 transition-all duration-500 
                    hover:border-green-500/30 hover:bg-zinc-900/80
                    hover:shadow-2xl hover:shadow-green-900/20 hover:-translate-y-1
                    ${isFeatured ? "lg:col-span-2 md:col-span-2" : ""}
                  `}
                >
                 {/* We use a standard <a> tag with target="_blank" because 
                    you requested redirection to external platforms.
                 */}
                 <Link
                  href={product.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className={`relative w-full overflow-hidden ${isFeatured ? "h-64 md:h-80" : "h-56"}`}>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10 opacity-80 transition-opacity group-hover:opacity-60" />
                    
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-[20%]"
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 70vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-zinc-700 px-3 py-1 rounded-full text-xs font-mono text-green-400 flex items-center gap-1">
                        {product.category === 'Learning Platform' && <Briefcase size={12}/>}
                        {product.category === 'Dev Tool' && <Wrench size={12}/>}
                        {product.category === 'AI & Automation' && <Cpu size={12}/>}
                        {product.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="relative z-20 p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mb-3">
                        <div className="flex items-center gap-2">
                           {/* Decorative ID */}
                           <span className="text-zinc-700">#{index + 1 < 10 ? `0${index+1}` : index+1}</span>
                        </div>
                    </div>

                    <h2 className={`font-bold text-zinc-100 group-hover:text-green-400 transition-colors mb-2 ${isFeatured ? "text-3xl" : "text-xl"}`}>
                      {product.title}
                    </h2>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {product.description}
                    </p>

                    {/* Bottom Action Area */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/50 group-hover:border-green-500/20 transition-colors">
                        <span className="text-xs font-mono text-zinc-500 group-hover:text-green-300 transition-colors">
                            {product.link.replace('https://', '').split('/')[0]}
                        </span>
                        
                        <div className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-800 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                             <ExternalLink size={16} />
                        </div>
                    </div>
                  </div>
                </Link>
             </div>
             );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <div className="bg-zinc-800/50 p-6 rounded-full mb-6">
                <Layers size={48} className="text-zinc-600" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-300">No Products Live</h3>
            <p className="text-zinc-500 mt-2 max-w-sm">We are currently updating our catalog. Check back shortly.</p>
          </div>
        )}
      </main>
    </div>
  );
}