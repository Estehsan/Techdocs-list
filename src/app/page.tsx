import React from 'react';
import { GitHubService, TechDoc } from '../lib/github';
import Header from '../components/Header';

async function getTechDocs(): Promise<TechDoc[]> {
  const org = process.env.GITHUB_ORG || '';
  const token = process.env.GITHUB_TOKEN;
  const githubService = new GitHubService(org, token);
  return githubService.getTechDocs();
}

export default async function Home() {
  const techDocs = await getTechDocs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Technical Documentation
          </h1>
          <p className="text-gray-600 mb-12 text-lg">
            Browse our collection of technical documentation and guides
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techDocs.map((doc) => (
              <a
                key={doc.repository}
                href={doc.path}
                className="group block"
              >
                <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                        {doc.title}
                      </h2>
                      <p className="text-gray-500 mt-1 text-sm">
                        {doc.repository}
                      </p>
                      <p className="text-gray-400 mt-2 text-xs">
                        Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 