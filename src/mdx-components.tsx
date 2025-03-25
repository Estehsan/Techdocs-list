import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-2 border-b pb-2 border-purple-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4 text-lg">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link 
        href={href || '#'} 
        className="text-purple-600 hover:text-purple-800 underline decoration-2 decoration-purple-200 hover:decoration-purple-500 transition-colors duration-200"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-600">{children}</li>
    ),
    img: ({ src, alt }) => (
      <div className="my-4 overflow-hidden rounded-lg">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={400}
          height={200}
          className="w-auto h-auto max-h-[200px] object-contain mx-auto"
          style={{ maxWidth: '400px' }}
        />
      </div>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-400 pl-4 my-4 italic text-gray-700 bg-purple-50 py-2 px-3 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-purple-700 px-1.5 py-0.5 rounded-md text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 shadow-inner">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-t border-gray-100">
        {children}
      </td>
    ),
    ...components,
  };
} 