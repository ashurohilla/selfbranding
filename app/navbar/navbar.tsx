"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUser } from "@/lib/store/user";
import Profile from "./profile";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function navbar() {
  const pathname = usePathname()
  console.log(pathname)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = user?.id ? false : true; // Check if user has an id
    setIsLoggedIn(userLoggedIn);
       
  }, []);

  const user = useUser((state) => state.user);
  return (
    <div className="mx-4">
      <nav className="mt-2">
       <div className="mt-2 text-2xl ">
       <Link className="pt-4" href="/">
          Self branding
        </Link>
        
        <div className=" flex float-right">
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
                  {" "}
                  <Link href={pathname === '/' ? '/dashboard' : '/'}>
  {pathname === '/' ? 'Dashbaord' : 'Home'}
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
            <h1>
              {" "}
              <Link href="/login">Login</Link>{" "}
            </h1>
          )}
  
   </div>
        </div>  
      </nav>
    </div>
  );
}
