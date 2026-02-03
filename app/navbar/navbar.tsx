"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import Profile from "./profile";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import logoDark from "../../public/logodark.png";
import logoLight from "../../public/logolight.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Menu, X, ChevronDown, Youtube, Instagram, Crown, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useUser((state) => state.user);
  const isPremium = user?.id ? true : false; 

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      else if (currentScrollY < lastScrollY) setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  if (!mounted) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-40 overflow-hidden">
                  <Image 
                    src={theme === 'dark' ? logoDark : logoLight} 
                    alt="Algo System Logo" 
                    fill 
                    className="object-contain" 
                    priority 
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-2">
              <NavDropdown label="Learn" items={[{ label: "Courses", href: "/courses" }, { label: "Roadmap", href: "/courses/roadmap" }]} />
              <NavDropdown label="Practice" items={[{ label: "Interview Prep", href: "/prep" }]} />
              <NavDropdown label="Newsletter" items={[{ label: "Weekly Tech", href: "/newsletter" }, { label: "Archive", href: "/archive" }]} />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Social Links */}
    <div className="hidden lg:flex items-center gap-2 border-r border-zinc-200 dark:border-zinc-800 pr-4 mr-2">
  
  {/* Instagram - Using a hardcoded brand gradient overlay */}
  <Link 
    href="https://www.instagram.com/scale_saas/" 
    target="_blank"
    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#insta-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <radialGradient id="insta-gradient" cx="30%" cy="107%" r="100%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </Link>

  {/* YouTube - Static Red with a "Live" Pulse Effect */}
  <Link 
    href="https://www.youtube.com/@AshishRohilla." 
    target="_blank"
    className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center"
  >
    <Youtube size={22} className="text-[#FF0000] fill-[#FF0000]/10" />
    
    {/* Small 'Live' Status Dot */}
    <span className="absolute top-2 right-1.5 flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </span>
  </Link>
</div>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                {isPremium && (
  <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 text-[10px] font-black tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.1)]">
    <Crown size={14} className="fill-amber-500 animate-pulse" />
    <span className="hidden sm:inline">PREMIUM</span>
  </div>
)}

                {user?.id ? (
                  <UserDropdown pathname={pathname} />
                ) : (
                  <Link href="/login">
                    <Button variant="outline" className="border-teal-500/50 bg-transparent text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white dark:hover:text-black transition-all">
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-zinc-600 dark:text-zinc-400">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-zinc-950 ${isMobileMenuOpen ? "max-h-screen border-t border-zinc-200 dark:border-zinc-800" : "max-h-0"}`}>
          <div className="px-4 py-6 space-y-4">
            <MobileNavLink href="/courses" label="Learn" active={isActive('/courses')} />
            <MobileNavLink href="/practice" label="Practice" active={isActive('/practice')} />
            <MobileNavLink href="/newsletter" label="Newsletter" active={isActive('/newsletter')} />
          </div>
        </div>
      </nav>
    </div>
  );
}

const NavDropdown = ({ label, items }: { label: string, items: { label: string, href: string }[] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none">
      {label} <ChevronDown size={14} />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 min-w-[160px]">
      {items.map((item) => (
        <DropdownMenuItem key={item.href} className="focus:bg-teal-500/10 focus:text-teal-600 dark:focus:text-teal-400 cursor-pointer">
          <Link href={item.href} className="w-full">{item.label}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const UserDropdown = ({ pathname }: { pathname: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative h-10 w-10 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800 hover:ring-teal-500 transition-all overflow-hidden">
        <Profile />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200" align="end">
      <DropdownMenuLabel className="text-zinc-500">Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
      <DropdownMenuItem className="focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400 text-red-500 cursor-pointer">
        <div className="flex items-center gap-2"><Logout /></div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileNavLink = ({ href, label, active }: { href: string, label: string, active: boolean }) => (
  <Link href={href} className={`block px-3 py-2 text-base font-medium rounded-md ${active ? "text-teal-600 dark:text-teal-400 bg-teal-500/5" : "text-zinc-600 dark:text-zinc-400"}`}>
    {label}
  </Link>
);