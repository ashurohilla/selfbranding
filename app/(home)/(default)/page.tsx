"use client"
import { Github, Mail, Phone, ExternalLink, MapPin, Calendar, Briefcase, GraduationCap, Code, Award, ShoppingBag, BookOpen, Menu, X, Linkedin } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 ">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-light text-slate-900">Ashish Rohilla</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
   <Link href={"products"}>
                <Button variant={"outline"} className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Products
                </Button>
                </Link>            <Link href={"blogs"}>
                <Button variant={"outline"} className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Button>
                </Link>
             
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#products" className="text-slate-600 hover:text-blue-600 transition-colors">Products</a>
                <Link href={"blogs"}>
                <Button variant={"default"} className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Button>
                </Link>
                <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Subtle notebook binding */}
      <div className="fixed  lg:left-[300px] left-6 top-0 bottom-0 w-px bg-red-500/30"></div>
      <div className="fixed  lg:left-[308px] left-7 top-0 bottom-0 w-px bg-red-500/30"></div>
      <div className="fixed lg:left-[270px] left-10 top-4 bottom-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-slate-500/40 mb-12 shadow-sm"></div>
        ))}
      </div>

      {/* Main content */}
      <div className="pl-20 pr-8 mt-8 py-16 max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-16">                                                                                                                                                              
          <div className="relative">                                                                             
            <h1 className="text-5xl font-extralight text-slate-900 mb-3 tracking-tight leading-tight">
              Ashish Rohilla
            </h1>
            <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
          </div>
          <p className="text-2xl text-slate-600 mb-8 font-light">
            Full Stack Developer & Devops Engineer                                          
          </p>
          
          <div className="flex flex-wrap gap-8 text-slate-600">
            <a href="mailto:ashishrohilla510@gmail.com" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">ashishrohilla510@gmail.com</span>
            </a>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span className="text-sm">9588368052</span>
            </div>
            <a href="https://github.com/ashurohilla" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">github.com/ashurohilla</span>
            </a>
            <a href="https://www.linkedin.com/in/ashish-rohilla-3200011ba/" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">linkedin</span>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Experience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-blue-500" />
                <h2 className="text-3xl font-light text-slate-800">Experience</h2>
              </div>
              
              <div className="space-y-8">
                {/* Current Role */}
                <div className="relative pl-8 border-l-2 border-blue-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-200/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-slate-900">Developer</h3>
                        <p className="text-blue-600 font-medium">Decimal Technologies</p>
                      </div>
                      <div className="text-sm text-slate-500 mt-2 sm:mt-0 sm:text-right">
                        <p className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Dec 2024 – Present
                        </p>
                        <p className="flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          Gurugram
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-slate-700 text-sm leading-relaxed">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Developed and deployed innovative no-code solutions for banking fintech applications, reducing development time by 70%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Designed and managed APIs for seamless banking system integration with enhanced reliability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Streamlined workflows ensuring secure access to sensitive financial data</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Previous Role */}
                <div className="relative pl-8 border-l-2 border-orange-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-400 rounded-full"></div>
                  <div className="bg-white/50 p-6 rounded-xl border border-orange-200/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-slate-900">DevOps & Full-Stack Intern</h3>
                        <p className="text-slate-600 font-medium">Diana Advance Tech Academy</p>
                      </div>
                      <div className="text-sm text-slate-500 mt-2 sm:mt-0 sm:text-right">
                        <p className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          May 2023 – Aug 2023
                        </p>
                        <p className="flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          Remote, London
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-slate-700 text-sm leading-relaxed">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Deployed microservices using Django REST framework and Docker for horizontal scaling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Implemented CI/CD pipelines with GitLab for automated testing and deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Developed cross-platform desktop app with Electron.js for employee activity tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Optimized PostgreSQL queries, reducing API latency by 15%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Code className="w-6 h-6 text-purple-500" />
                <h2 className="text-3xl font-light text-slate-800">Featured Projects</h2>
              </div>
              
              <div className="grid gap-6">
                
                <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Hardware Garage</h3>
                    <Link  href={"/blogs"}>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Django', 'Next.js', 'PostgreSQL', 'Tailwind', 'Docker'].map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Full-stack hardware blogging platform with modern architecture</li>
                    <li>• Automated image handling with Supabase APIs</li>
                    <li>• Dockerized deployment with GitHub Actions CI/CD</li>
                  </ul>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">Microservices Infrastructure</h3>
                    <Link target='_blank' href={"https://github.com/ashurohilla/ArchEngineInfra"}>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Go', 'Kubernetes', 'Docker', 'RabbitMQ', 'Next.js'].map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• AI agent generator with PDF/URL support</li>
                    <li>• Container orchestration with Kubernetes</li>
                    <li>• Async messaging with RabbitMQ</li>
                  </ul>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-green-600 transition-colors">AWS EKS 3-Tier Deployment</h3>
                    <Link href={"https://github.com/ashurohilla/devopsinfra_ci_cd"} target='_blank'>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-green-500 transition-colors" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['AWS EKS', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'].map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Production-ready 3-tier application on AWS</li>
                    <li>• Infrastructure as Code with Terraform</li>
                    <li>• Real-time monitoring and alerting</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            
            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-5 h-5 text-green-500" />
                <h2 className="text-2xl font-light text-slate-800">Education</h2>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200/50">
                <h3 className="font-semibold text-slate-900 mb-2">B.Tech in AI & ML</h3>
              <p className="text-slate-600 text-sm mb-2">Panipat Institute of Engineering and Technology</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>CGPA: 8.13/10.00</span>
                  <span>June 2024</span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-orange-500" />
                <h2 className="text-2xl font-light text-slate-800">Certifications</h2>
              </div>

              <div className="space-y-4">
              <Link href={"https://www.udacity.com/certificate/e/42318d36-5a07-11ed-8b9b-c3420296beff"} target="_blank">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-200/50">
                  <p className="text-sm font-medium text-slate-900 mb-1">AWS AI Programming with Python</p>
                  <p className="text-xs text-slate-500">Udacity • AWS Sponsored</p>
                </div>
                </Link>
                <Link href={"https://www.udacity.com/certificate/e/f6ba5bf8-ee8f-11ed-8aeb-a7de405c1e0c"} target="_blank">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-200/50">
                  <p className="text-sm font-medium text-slate-900 mb-1">Machine Learning Fundamentals</p>
                  <p className="text-xs text-slate-500">Udacity • AWS Sponsored</p>
                </div>
                </Link>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-light text-slate-800 mb-6">Technical Skills</h2>
              <div className="space-y-6">
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-3 text-sm uppercase tracking-wide">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Go', 'Python', 'JavaScript', 'TypeScript', 'C++'].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-full border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-3 text-sm uppercase tracking-wide">Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Django', 'Flask', 'TensorFlow', 'PyTorch'].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-3 text-sm uppercase tracking-wide">DevOps & Cloud</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-3 text-sm uppercase tracking-wide">Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200/50 text-center">
          <p className="text-sm text-slate-500 font-light">
            Crafted with precision • Ashish Rohilla © 2024
          </p>
        </footer>
      </div>
    </div>
 
  );
}
