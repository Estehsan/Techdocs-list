'use client';

import React from 'react';
import { marked } from 'marked';
import Image from 'next/image';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const renderer = new marked.Renderer();
  
  // Custom renderer for images
  renderer.image = (href, title, text) => {
    return `<div class="my-4 flex justify-center">
      <img 
        src="${href}" 
        alt="${text || ''}" 
        class="max-w-[300px] max-h-[150px] object-contain"
        loading="lazy"
      />
    </div>`;
  };

  const htmlContent = marked(content, {
    gfm: true,
    breaks: true,
    renderer,
  });

  return (
    <article 
      className="prose prose-slate max-w-none animate-fade-in
        prose-headings:font-bold prose-headings:tracking-tight 
        prose-h1:text-4xl prose-h1:mb-8 prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-purple-800 prose-h1:bg-clip-text prose-h1:text-transparent
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
        prose-code:bg-gray-100 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-gray-800
        prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-gray-100
        prose-blockquote:border-l-4 prose-blockquote:border-purple-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-600 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-600 prose-ol:space-y-2
        prose-li:text-gray-600
        prose-table:min-w-full prose-table:divide-y prose-table:divide-gray-200
        prose-th:px-6 prose-th:py-3 prose-th:bg-gray-50 prose-th:text-xs prose-th:font-medium prose-th:text-gray-500 prose-th:uppercase prose-th:tracking-wider
        prose-td:px-6 prose-td:py-4 prose-td:whitespace-nowrap prose-td:text-sm prose-td:text-gray-600"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 