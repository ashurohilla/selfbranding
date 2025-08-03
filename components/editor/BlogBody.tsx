import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';

interface Props {
  source: string;
}

// Custom Table component for easier use in MDX
const Table = ({ headers, data }: { headers: string[], data: string[][] }) => (
  <div className="overflow-x-auto my-10 rounded-lg p-[2px] bg-gradient-to-r from-black via-yellow-400 via-pink-500 to-blue-500 shadow-lg">
    <div className="rounded-lg bg-white">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index}
                className="text-left py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wide first:rounded-tl-lg last:rounded-tr-lg"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className="py-4 px-6 text-gray-800 font-serif text-lg leading-relaxed whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function BlogBody({ source }: Props) {
  return (
    <div className="max-w-none md:mx-2 mx-4">
      <MDXRemote 
        source={source} 
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight mb-8 mt-12 font-serif">
              {children}
            </h1>
          ),
            YouTubeEmbed,
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight mb-6 mt-12 font-serif">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight mb-4 mt-8 font-serif">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-800 text-lg leading-relaxed mb-6 font-serif">
              {children}
            </p>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm">
              {children}
            </code>
          ),
          CodeBlock: ({ children }) => (
            <pre className="bg-gray-50 text-gray-800 p-6 rounded-lg my-8 overflow-x-auto border border-gray-200 font-mono text-sm leading-relaxed">
              {children}
            </pre>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-50 text-gray-800 p-6 rounded-lg my-8 overflow-x-auto border border-gray-200 font-mono text-sm leading-relaxed">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 bg-gray-50 p-6 my-8 rounded-r-lg italic text-gray-700 text-lg font-serif">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-6 space-y-2 text-gray-800 text-lg font-serif">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 space-y-2 text-gray-800 text-lg font-serif list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-800 leading-relaxed ml-4 list-disc">
              {children}
            </li>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="text-gray-900 font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-700 italic">
              {children}
            </em>
          ),
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="w-full rounded-lg shadow-sm my-8"
            />
          ),
          // Enhanced HTML table components with gradient border
          table: ({ children }) => (
            <div className="overflow-x-auto my-10 rounded-lg p-[2px] bg-gradient-to-r from-black via-yellow-400 via-pink-500 to-blue-500 shadow-lg">
              <div className="rounded-lg bg-white">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 transition-colors duration-150">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm uppercase tracking-wide first:rounded-tl-lg last:rounded-tr-lg">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-4 px-6 text-gray-800 font-serif text-lg leading-relaxed whitespace-nowrap">
              {children}
            </td>
          ),
          // Custom Table component
          Table: Table,
        }}
      />
    </div>
  );
}