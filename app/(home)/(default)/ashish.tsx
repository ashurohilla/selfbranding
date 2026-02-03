"use client";
import { 
  Github, Mail, Phone, Projector, ExternalLink, MapPin, 
  Briefcase, GraduationCap, Code, Award, BookOpen, Menu, X, 
  Linkedin, ShoppingBagIcon, Cpu, Instagram, ArrowRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { readmoreblog } from "@/lib/actions/blog"; 
import { IBlog } from "@/lib/types"
import { InstagramEmbed } from '../blog/[id]/components/Instagramembed';

function extractImageUrlsFromMarkdown(markdown: string): string[] {
  const imageUrls: string[] = [];
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const htmlImageRegex = /<img[^>]+src="([^">]+)"/g;
  let match: RegExpExecArray | null;
  
  while ((match = markdownImageRegex.exec(markdown))) {
    if (match[2]) imageUrls.push(match[2]);
  }
  while ((match = htmlImageRegex.exec(markdown))) {
    if (match[1]) imageUrls.push(match[1]);
  }
  return imageUrls;
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop"
];

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  // --- Fetch Blogs ---
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await readmoreblog();
        if (data && data.length > 0) {
          setBlogs(data as IBlog[]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans selection:bg-blue-100">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-2">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">A</div>
               Ashish Rohilla
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
               <Link href="/products">
                <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                  <ShoppingBagIcon className="w-4 h-4 mr-2" /> Products
                </Button>
               </Link>
               <Link href="/courses">
                <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                  <Projector className="w-4 h-4 mr-2" /> Courses
                </Button>
               </Link>
               <Link href="/blogs">
                <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                  <BookOpen className="w-4 h-4 mr-2" /> Blog
                </Button>
               </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-100 pt-4 space-y-2">
               <Link href="/products" className="block">
                <Button variant="ghost" className="w-full justify-start">Products</Button>
               </Link>
               <Link href="/courses" className="block">
                <Button variant="ghost" className="w-full justify-start">Courses</Button>
               </Link>
               <Link href="/blogs" className="block">
                <Button variant="ghost" className="w-full justify-start">Blog</Button>
               </Link>
            </div>
          )}
        </div>
      </nav>

      {/* --- Visual Elements (Notebook Style) --- */}
      <div className="hidden lg:block fixed left-[18%] top-0 bottom-0 w-px bg-red-500/20 z-0"></div>
      <div className="hidden lg:block fixed left-[18.5%] top-0 bottom-0 w-px bg-red-500/20 z-0"></div>

      {/* --- Main Content Area --- */}
      <div className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN (Main Feed) --- */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* 1. Header / Intro */}
            <header className="relative">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
                Open to Work
              </div>
              <h1 className="text-5xl md:text-6xl font-extralight text-slate-900 mb-6 tracking-tight leading-tight">
                Ashish Rohilla
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl">
                Associate DevOps Engineer specializing in AI/ML Infrastructure. I build scalable banking fintech solutions, automate CI/CD pipelines, and bridge the gap between development and operations.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={"https://drive.google.com/file/d/1hJrewpm3qB1vpM2gwkBus105Fdn6uaF4/view?usp=sharing"} target="_blank" rel="noopener noreferrer">
                 <Button className="rounded-full bg-slate-900 hover:bg-slate-800 px-6">
                   Download Resume
                 </Button>
                </Link>
                 <div className="flex items-center gap-4 px-4">
                    <a href="https://github.com/ashurohilla" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors"><Github className="w-6 h-6"/></a>
                    <a href="https://linkedin.com" target="_blank" className="text-slate-400 hover:text-blue-700 transition-colors"><Linkedin className="w-6 h-6"/></a>
                    <a href="mailto:ashishrohilla510@gmail.com" className="text-slate-400 hover:text-red-500 transition-colors"><Mail className="w-6 h-6"/></a>
                 </div>
              </div>
            </header>

            {/* 2. Experience Section - UPDATED TO MATCH RESUME */}
            <section>
              <h2 className="text-2xl font-light text-slate-800 mb-8 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-slate-400" /> Professional Journey
              </h2>
              
              <div className="space-y-12 border-l border-slate-200 ml-3 pl-8 relative">
                 {/* Job 1 - Fintech Role */}
                 <div className="relative group">
                    <span className="absolute -left-[41px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-sm group-hover:scale-110 transition-transform"></span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-xl font-medium text-slate-900">Associate Software Engineer (DevOps)</h3>
                        <span className="text-sm text-slate-500 font-mono">Dec 2024 – Present</span>
                    </div>
                    <div className="text-blue-600 font-medium mb-4">Decimal Technologies</div>
                    <ul className="list-disc ml-4 space-y-2 text-slate-600 text-base leading-relaxed">
                        <li>Engineered end-to-end CI/CD pipelines for Fintech Account Opening, reducing deployment time by 70%.</li>
                        <li>Orchestrated high-availability infrastructure using Kubernetes, supporting 10,000+ concurrent users with 99.99% uptime.</li>
                        <li>Implemented DevSecOps scanning to secure PII and KYC data in compliance with banking regulations.</li>
                    </ul>
                 </div>

                 {/* Job 2 - Internship */}
                 <div className="relative group">
                    <span className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-200 rounded-full border-4 border-white group-hover:bg-slate-400 transition-colors"></span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-xl font-medium text-slate-900">DevOps & Full-Stack Intern</h3>
                        <span className="text-sm text-slate-500 font-mono">May 2023 – Aug 2023</span>
                    </div>
                    <div className="text-slate-500 font-medium mb-4">Diana Advance Tech Academy</div>
                    <ul className="list-disc ml-4 space-y-2 text-slate-600 text-base leading-relaxed">
                        <li>Containerized Python microservices using Docker for horizontal scaling.</li>
                        <li>Engineered automated GitOps workflows to streamline backend testing and deployment.</li>
                        <li>Automated build processes for internal monitoring tools, integrating real-time system observability.</li>
                    </ul>
                 </div>
              </div>
            </section>

             {/* 3. Certifications */}
             <section>
                <h2 className="text-2xl font-light text-slate-800 mb-8 flex items-center gap-3">
                    <Award className="w-5 h-5 text-slate-400" /> Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cert 1 */}
                    <a href="https://www.udacity.com/certificate/e/42318d36-5a07-11ed-8b9b-c3420296beff" target="_blank" className="group block p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">AWS AI Programming with Python</h3>
                                <p className="text-sm text-slate-500 mt-1">Udacity • AWS Sponsored Nanodegree</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500"/>
                        </div>
                    </a>

                    {/* Cert 2 */}
                    <a href="https://www.udacity.com/certificate/e/f6ba5bf8-ee8f-11ed-8aeb-a7de405c1e0c" target="_blank" className="group block p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Machine Learning Fundamentals</h3>
                                <p className="text-sm text-slate-500 mt-1">Udacity • AWS Sponsored Nanodegree</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500"/>
                        </div>
                    </a>

                    {/* Hackathon Generic */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                         <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-purple-500"/>
                            <h3 className="font-semibold text-slate-900">Hackathon Finalist</h3>
                         </div>
                         <p className="text-sm text-slate-600">Participated and built MVP solutions in 24-hour coding sprints.</p>
                    </div>
                </div>
            </section>

            {/* 4. Projects - UPDATED TO DEVOPS FOCUS */}
            <section>
              <h2 className="text-2xl font-light text-slate-800 mb-8 flex items-center gap-3">
                <Code className="w-5 h-5 text-slate-400" /> Featured Work
              </h2>
              <div className="grid gap-8">
                 {/* Project 1 */}
                 <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Microservices Infrastructure</h3>
                            <p className="text-sm text-slate-500 mt-1">DevOps & Architecture</p>
                        </div>
                        <a href="https://github.com/ashurohilla/ArchEngineInfra" target='_blank' className="p-2 bg-slate-50 rounded-full group-hover:bg-slate-100"><Github className="w-5 h-5"/></a>
                    </div>
                    <p className="text-slate-600 mb-4 text-sm">Architected a decoupled microservices platform using Go, Next.js, and RabbitMQ for event-driven async communication.</p>
                    <div className="flex flex-wrap gap-2">
                        {['Go', 'K8s', 'Docker', 'RabbitMQ'].map(t => <span key={t} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md font-medium">{t}</span>)}
                    </div>
                 </div>

                 {/* Project 2 - SWAPPED TO AWS EKS PROJECT */}
                 <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">AWS EKS Cloud Native Deployment</h3>
                            <p className="text-sm text-slate-500 mt-1">Infrastructure as Code</p>
                        </div>
                        <a href="https://github.com/ashurohilla/devopsinfra_ci_cd" target='_blank' className="p-2 bg-slate-50 rounded-full group-hover:bg-slate-100"><Github className="w-5 h-5"/></a>
                    </div>
                    <p className="text-slate-600 mb-4 text-sm">Provisioned immutable infrastructure using Terraform and automated deployments with AWS CodePipeline, ECR, and ALB.</p>
                    <div className="flex flex-wrap gap-2">
                        {['AWS EKS', 'Terraform', 'CodePipeline', 'ALB'].map(t => <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">{t}</span>)}
                    </div>
                 </div>
              </div>
            </section>

             {/* 5. Hardware & Hobbies */}
             <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-light text-slate-800 flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-slate-400" /> The Hardware Lab
                    </h2>
                    <a href="https://www.instagram.com/ashish__the__engineer/" className="text-sm text-pink-600 flex items-center gap-1 hover:underline">
                        <Instagram className="w-4 h-4"/> View Reels
                    </a>
                </div>
                
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-8 flex items-center justify-center">
                    <InstagramEmbed />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                    When I'm not deploying clusters, I build custom hardware controllers and document the process on Instagram.
                </p>
            </section>

            {/* 6. DevOps Blogs */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-light text-slate-800 flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-slate-400" /> Latest Writing
                    </h2>
                    <Link href="/blogs" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                        View All <ArrowRight className="w-4 h-4"/>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.length > 0 ? blogs.slice(0, 4).map((blog, index) => {
                    const images = extractImageUrlsFromMarkdown(blog.content);
                    const displayImage = images.length > 0 
                      ? images[0] 
                      : placeholderImages[index % placeholderImages.length] || placeholderImages[0];
                    
                    return (
                        <Link key={index} href={`/blog/${blog.slug}`} className="group block">
                        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image 
                                    src={displayImage || '/placeholder.png'} 
                                    alt={blog.title || '/placeholder.png'} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <div className="text-xs text-slate-400 mb-2">{new Date(blog.created_at).toDateString()}</div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                            </div>
                        </div>
                        </Link>
                    )
                }) : (
                        <div className="col-span-2 py-10 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            Loading thoughts...
                        </div>
                    )}
                </div>
            </section>

          </div>

          {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28">
                
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
                    <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">ashishrohilla510@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">9588368052</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">Gurugram, India</span>
                        </div>
                    </div>
                </div>

                {/* Skills Cloud - UPDATED */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-slate-900 mb-3 text-sm">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'Go', 'JavaScript', 'TypeScript', 'C++'].map(s => (
                                <span key={s} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium hover:border-blue-300 transition-colors cursor-default">{s}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900 mb-3 text-sm">DevOps Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {/* Removed Ansible, Added EKS, CodePipeline */}
                            {['AWS EKS', 'Docker', 'Kubernetes', 'Terraform', 'CodePipeline', 'Prometheus'].map(s => (
                                <span key={s} className="px-3 py-1 bg-green-50 border border-green-100 rounded-full text-xs text-green-700 font-medium hover:border-green-300 transition-colors cursor-default">{s}</span>
                            ))}
                        </div>
                    </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3 text-sm">Frameworks</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Next.js', 'React', 'Django', 'Flask', 'PyTorch'].map(s => (
                                <span key={s} className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs text-blue-700 font-medium hover:border-blue-300 transition-colors cursor-default">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <h4 className="font-semibold text-slate-900">B.Tech in AI & ML</h4>
                            <p className="text-sm text-slate-500">Panipat Institute of Engineering</p>
                            <p className="text-xs text-slate-400 mt-1">CGPA: 8.13 • 2024</p>
                        </div>
                    </div>
                </div>

            </div>
          </div>

        </div>

        {/* --- Footer --- */}
        <footer className="mt-24 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-400">
            Crafted by Ashish Rohilla © 2026
          </p>
        </footer>

      </div>
    </div>
  );
}