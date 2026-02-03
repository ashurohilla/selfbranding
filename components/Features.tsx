import React from "react";
import { Terminal, BookOpen, Layout, HelpCircle, CheckCircle2, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AlgoFeatures() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#050505] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-mono font-bold tracking-widest uppercase">
            System.Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            BUILT FOR <span className="text-teal-500">ENGINEERS</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Card 1: Free Knowledge */}
          <FeatureCard 
            icon={<Terminal className="text-teal-500" />}
            title="Free Knowledge for All"
            description="Access premium quality engineering resources, blog posts, and code snippets without any paywall. We believe in open-source learning."
            tag="01. OPEN_ACCESS"
          />

          {/* Card 2: Structured Courses */}
          <FeatureCard 
            icon={<BookOpen className="text-teal-500" />}
            title="Structured Courses"
            description="Go from zero to architect. Our curriculum is designed linearly to ensure you master DevOps and MLOps without getting lost in documentation."
            tag="02. STEP_BY_STEP"
          />

          {/* Card 3: System Design */}
          <FeatureCard 
            icon={<Layout className="text-teal-500" />}
            title="System Design Simplified"
            description="Complex distributed systems broken down into easy-to-digest visual concepts. Learn high-level architecture with real-world examples."
            tag="03. ARCH_VISUALS"
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-8 rounded-none relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-white dark:bg-[#050505] px-4 py-1 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 font-mono text-sm text-zinc-500">
            <HelpCircle size={16} className="text-teal-500" />
            FREQUENTLY_ASKED_QUESTIONS
          </div>

          <Accordion type="single" collapsible className="w-full">
            <FaqItem 
              value="item-1" 
              question="Are the courses actually free?" 
              answer="Yes! Our core curriculum is free. We offer premium certifications and 1-on-1 mentorship for power users, but the knowledge is accessible to everyone." 
            />
            <FaqItem 
              value="item-2" 
              question="Do I need a prior programming background?" 
              answer="A basic understanding of any language (like Python or JS) is recommended. Our courses start from the fundamentals and scale to enterprise-level concepts." 
            />
            <FaqItem 
              value="item-3" 
              question="What technologies are covered?" 
              answer="We focus on the modern stack: Docker, Kubernetes, Terraform, AWS, and specific MLOps pipelines like Kubeflow and MLflow." 
            />
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// --- Sub-components ---

function FeatureCard({ icon, title, description, tag }: { icon: React.ReactNode, title: string, description: string, tag: string }) {
  return (
    <div className="group relative p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-teal-500/50 transition-all duration-300">
      <div className="mb-6 h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 transition-colors group-hover:border-teal-500/50">
        {icon}
      </div>
      <div className="text-[10px] font-mono text-zinc-400 mb-2">{tag}</div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-teal-500 transition-colors">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function FaqItem({ value, question, answer }: { value: string, question: string, answer: string }) {
  return (
    <AccordionItem value={value} className="border-zinc-200 dark:border-zinc-800">
      <AccordionTrigger className="text-left font-bold text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-400">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-zinc-600 dark:text-zinc-400 font-mono text-sm">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}