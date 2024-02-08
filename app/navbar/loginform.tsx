"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation'

export default function loginform() {
    const pathname = usePathname()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const handleloginwihgithub =  () =>{
        supabase.auth.signInWithOAuth({
            provider:"github",
            options: {
                
                redirectTo:location.origin + "/auth/callback? next= "+ pathname,
            },

        })
      }
      const handleloginwithgoogle =  () =>{
        supabase.auth.signInWithOAuth({
            provider:"google",
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
                redirectTo:location.origin + "/auth/callback? next= "+ pathname,
            },

        })
      }
  return (
    <div className='flex '>
         <Button onClick={handleloginwihgithub}> githtub </Button>
         <Button onClick={handleloginwithgoogle}> google </Button>

    </div>
  )
}
