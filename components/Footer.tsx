"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logoDark from "../public/logodark.png";
import logoLight from "../public/logolight.png";
import { useTheme } from "next-themes";
import {  Github, Youtube, Instagram, Twitter, Mail, Globe, Cpu } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Grid Decor - Aligned with the rest of the UI */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Status Section */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-8 w-32 overflow-hidden">
                <Image 
                  src={theme === 'dark' ? logoDark : logoLight} 
                  alt="Algo System" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono leading-relaxed">
              Architecture for the modern engineer. Building high-availability knowledge modules since 2025.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-teal-600 dark:text-teal-500 uppercase tracking-tighter">
               <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
               System_v.3.0_Operational
            </div>
          </div>

          {/* Sitemaps */}
          <FooterColumn title="Platform">
            <FooterLink href="/courses" label="All Courses" />
            <FooterLink href="/practice" label="DSA Practice" />
            <FooterLink href="/docs" label="Documentation" />
            <FooterLink href="/newsletter" label="Newsletter" />
          </FooterColumn>

          <FooterColumn title="Community">
            <FooterLink href="#" label="Discord Server" />
            <FooterLink href="#" label="GitHub Repo" />
            <FooterLink href="#" label="Open Source" />
            <FooterLink href="#" label="Contribute" />
          </FooterColumn>

          {/* Contact / Command Section */}
          <FooterColumn title="Command Center">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                <Mail size={16} className="text-teal-500" />
                <span>root@algosystem.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                <Globe size={16} className="text-teal-500" />
                <span>HQ: New Delhi, India</span>
              </div>
              {/* Static Colored Social Icons in Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <Link href="#" className="text-[#FF0000] hover:scale-110 transition-transform"><Youtube size={20} /></Link>
                 <Link href="#" className="text-[#E4405F] hover:scale-110 transition-transform"><Instagram size={20} /></Link>
                 <Link href="#" className="text-[#1DA1F2] hover:scale-110 transition-transform"><Twitter size={20} /></Link>
                 <Link href="#" className="text-zinc-900 dark:text-white hover:scale-110 transition-transform"><Github size={20} /></Link>
              </div>
            </div>
          </FooterColumn>
        </div>

        {/* Bottom Bar: Logs Style */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-4">
            <span>&copy; {year} ALGO_SYSTEM</span>
            <span className="hidden md:inline border-l border-zinc-800 pl-4">SEC_ENCRYPTED: AES-256</span>
            <span className="hidden md:inline border-l border-zinc-800 pl-4">LATENCY: 24ms</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-400">
            <Link href="/privacy" className="hover:text-teal-500 transition-colors">PRIVACY_POLICY</Link>
            <Link href="/terms" className="hover:text-teal-500 transition-colors">TERMS_OF_SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Sub-components for Footer ---

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em] flex items-center gap-2">
        <Cpu size={14} className="text-teal-500" />
        {title}
      </h4>
      <div className="flex flex-col space-y-3">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string, label: string }) {
  return (
    <Link 
      href={href} 
      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 font-mono transition-all hover:translate-x-1"
    >
      {">"} {label}
    </Link>
  );
}