import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';

interface Props {
  source: string;
}

// Custom Table component with enhanced mobile responsiveness
const Table = ({ headers, data }: { headers: string[], data: string[][] }) => (
  <div className="my-12 w-full">
    {/* Desktop Table */}
    <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50/80 backdrop-blur-sm">
            {headers.map((header, index) => (
              <th 
                key={index}
                className="text-left py-4 px-6 text-gray-700 font-medium text-sm tracking-wide border-b border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className="py-4 px-6 text-gray-800 text-base leading-relaxed"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="mb-3 last:mb-0">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                {headers[cellIndex]}
              </div>
              <div className="text-gray-800 text-base leading-relaxed">
                {cell}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default function BlogBody({ source }: Props) {
  return (
    <div className="max-w-none">
      <MDXRemote 
        source={source} 
        components={{
          // Typography - Medium-inspired
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8 mt-16 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 mt-8 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-5 mt-12 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-4 mt-10">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-6 font-light tracking-wide">
              {children}
            </p>
          ),
          
          // Code styling
          code: ({ children }) => (
            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono text-sm font-medium">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <div className="my-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <pre className="bg-gray-50 text-gray-800 p-6 overflow-x-auto font-mono text-sm leading-relaxed">
                {children}
              </pre>
            </div>
          ),
          
          // Enhanced blockquote
          blockquote: ({ children }) => (
            <div className="my-10 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <blockquote className="pl-8 pr-4 py-2 italic text-gray-700 text-lg md:text-xl leading-relaxed font-light">
                {children}
              </blockquote>
            </div>
          ),
          
          // Lists with better spacing
          ul: ({ children }) => (
            <ul className="my-8 space-y-3 text-gray-800 text-lg md:text-xl font-light leading-relaxed">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-8 space-y-3 text-gray-800 text-lg md:text-xl font-light leading-relaxed list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-800 leading-relaxed ml-6 list-disc relative">
              <span className="absolute -left-6 text-blue-500 font-bold">•</span>
              {children}
            </li>
          ),
          
          // Enhanced links
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-4 transition-all duration-200 hover:decoration-blue-300"
            >
              {children}
            </a>
          ),
          
          // Text formatting
          strong: ({ children }) => (
            <strong className="text-gray-900 font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-700 italic font-light">
              {children}
            </em>
          ),
          
          // Enhanced images
          img: ({ src, alt }) => (
            <div className="my-12 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto object-cover"
              />
              {alt && (
                <div className="px-6 py-3 bg-gray-50 text-gray-600 text-sm italic text-center">
                  {alt}
                </div>
              )}
            </div>
          ),
          
          // Enhanced HTML table components
          table: ({ children }) => (
            <div className="my-12 w-full">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full border-collapse bg-white">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50/80 backdrop-blur-sm">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="text-left py-4 px-6 text-gray-700 font-medium text-sm tracking-wide border-b border-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-4 px-6 text-gray-800 text-base leading-relaxed">
              {children}
            </td>
          ),
          
          // Custom components
          YouTubeEmbed,
          Table: Table,
          
          // Horizontal rule - Medium style three dots
          hr: () => (
            <div className="my-8 flex justify-center items-center">
              <div className="flex space-x-8">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          ),
          
          // Custom callout component
          Callout: ({ children, type = 'info' }: { children: React.ReactNode, type?: 'info' | 'warning' | 'success' | 'error' }) => {
            const styles = {
              info: 'bg-blue-50 border-blue-200 text-blue-800',
              warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              success: 'bg-green-50 border-green-200 text-green-800',
              error: 'bg-red-50 border-red-200 text-red-800'
            };
            
            return (
              <div className={`my-8 p-6 rounded-xl border-l-4 ${styles[type]} shadow-sm`}>
                <div className="text-base leading-relaxed">
                  {children}
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
}