"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import Profile from "./profile";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import logo from "../../public/logoashish.png";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useUser((state) => state.user);

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    setIsLoggedIn(!!user?.id);
  }, [user]);

  // Smart Scroll Behavior
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);  // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Close mobile menu on resize or click outside
  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Glassmorphism Background */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative h-10 w-10 md:h-16 md:w-24 overflow-hidden rounded-lg">
                   {/* Added a subtle glow behind logo */}
                   <div className="absolute inset-0 " />
                   <Image
                    src={logo}
                    alt="logo"
                    fill
                    className="object-contain p-1 " // Invert makes black logo white for dark mode
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/courses" label="Courses" active={isActive('/courses')} />
              <NavLink href="/blogs" label="Blogs" active={isActive('/blogs')} />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center">
                {user?.id ? (
                  <UserDropdown pathname={pathname} />
                ) : (
                  <Link href="/login">
                    <Button 
                        variant="outline" 
                        className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-zinc-950 border-b border-zinc-800 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-4 space-y-3">
            <MobileNavLink href="/courses" label="Courses" active={isActive('/courses')} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/blogs" label="Blogs" active={isActive('/blogs')} onClick={() => setIsMobileMenuOpen(false)} />
            
            <div className="pt-4 mt-4 border-t border-zinc-800">
                {!user?.id ? (
                    <Link 
                        href="/login" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full justify-center items-center px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                    >
                        Login
                    </Link>
                ) : (
                    <div className="flex items-center justify-between px-2 text-zinc-400">
                        <span className="text-sm">Account Settings</span>
                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="h-8 w-8 rounded-full ring-2 ring-zinc-700 overflow-hidden">
                                <Profile />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

// --- Sub Components for cleaner code ---

const NavLink = ({ href, label, active }: { href: string, label: string, active: boolean }) => (
    <Link 
      href={href} 
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        active ? "text-green-500" : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
      {/* Active Indicator Dot */}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
      )}
    </Link>
);

const MobileNavLink = ({ href, label, active, onClick }: { href: string, label: string, active: boolean, onClick: () => void }) => (
    <Link 
        href={href} 
        onClick={onClick}
        className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
            active 
            ? "bg-green-500/10 text-green-500 border-l-2 border-green-500" 
            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
        }`}
    >
        {label}
    </Link>
);

const UserDropdown = ({ pathname }: { pathname: string }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-green-500 transition-all overflow-hidden focus:outline-none">
                <Profile />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-200" align="end">
            <DropdownMenuLabel className="text-zinc-400">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            
            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer">
                <Link href={pathname === '/profile' ? '/dashboard' : '/profile'} className="w-full flex items-center justify-between">
                    {pathname === '/profile' ? 'Dashboard' : 'Profile'}
                </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer">
                <Link href="/" className="w-full">Home</Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-zinc-800" />
            
            <DropdownMenuItem className="focus:bg-red-900/20 focus:text-red-400 text-red-500 cursor-pointer">
                <Link href="/login" className="w-full flex items-center gap-2">
                    <Logout />
                    <span>Log out</span>
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);