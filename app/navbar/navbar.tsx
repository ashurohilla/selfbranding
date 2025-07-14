"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import Profile from "./profile";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import logo from "../../public/logonew.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useUser((state) => state.user);

  useEffect(() => {
    const userLoggedIn = user?.id ? false : true; // Check if user has an id
    setIsLoggedIn(userLoggedIn); 
  }, [user]);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className={`z-10 md:bg-white/10 backdrop-blur-sm rounded-sm shadow-sm w-full fixed transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="md:py-2 py-0 bg-white">
        <div className="w-full px-4 md:text-xl text-lg flex justify-between items-center">
          <div className="flex">
            <Image
              src={logo}
              alt="logo"
              height={160}
              width={160}
            />
            <ul className="ml-10 flex items-center md:mx-4 mx-2">
              <Link className="flex" href="/courses">
                <li className="md:mx-6 mx-1 md:text-2xl pt-2 text-sm text-black">Courses</li>
              </Link>
              <Link className="flex" href="/blogs">
                <li className="md:mx-6 md:text-2xl pt-2 text-sm text-black mx-1">Blogs</li>
              </Link>
            </ul>
          </div>
          <div>
            {user?.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Profile />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Link href={pathname === '/profile' ? '/dashboard' : '/profile'}>
                      {pathname === '/' ? 'Profile' : 'Dashboard'}
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={pathname === '/' ? '/dashboard' : '/'}>
                      {pathname === '/' ? 'Dashboard' : 'Home'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="text-red-600" href="/login">
                      <Logout />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <h1 className="text-black">
                <Link className="text-black" href="/login">Login</Link>
              </h1>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}