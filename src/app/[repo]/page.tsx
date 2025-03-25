import React from 'react';
import { GitHubService } from '../../lib/github';
import { notFound } from 'next/navigation';
import MarkdownContent from './MarkdownContent';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

interface PageProps {
  params: {
    repo: string;
  };
  searchParams: {
    path?: string;
  };
}

async function getDocData(repo: string, path?: string) {
  const org = process.env.GITHUB_ORG || '';
  const token = process.env.GITHUB_TOKEN;
  const service = new GitHubService(org, token);
  
  try {
    const [content, navigation] = await Promise.all([
      service.getDocContent(repo, path || 'docs/index.md'),
      service.getDocNavigation(repo),
    ]);

    return { content, navigation };
  } catch (error) {
    console.error('Error fetching documentation:', error);
    notFound();
  }
}

export default async function DocPage({ params, searchParams }: PageProps) {
  const { content, navigation } = await getDocData(params.repo, searchParams.path);
  const currentPath = searchParams.path || 'docs/index.md';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-64 flex-shrink-0 border-r border-purple-100 bg-white/80 backdrop-blur-sm">
          <div className="h-full overflow-y-auto py-6 px-3">
            <div className="mb-6 px-3">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Documentation</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">{params.repo}</div>
            </div>
            <Sidebar
              navigation={navigation}
              currentPath={currentPath}
              repo={params.repo}
            />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8">
              <MarkdownContent content={content} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 