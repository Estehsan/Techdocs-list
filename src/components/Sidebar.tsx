import Link from 'next/link';
import { DocNavigation } from '../lib/github';

interface SidebarProps {
  navigation: DocNavigation[];
  currentPath: string;
  repo: string;
}

export default function Sidebar({ navigation, currentPath, repo }: SidebarProps) {
  return (
    <nav className="space-y-1 px-3">
      {navigation.map((item) => (
        <div key={item.path} className="mb-4">
          <Link
            href={`/${repo}?path=${encodeURIComponent(item.path)}`}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              currentPath === item.path
                ? 'bg-purple-50 text-purple-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {item.title}
          </Link>
          {item.children && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-purple-100">
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  href={`/${repo}?path=${encodeURIComponent(child.path)}`}
                  className={`block rounded-lg pl-4 pr-3 py-2 text-sm font-medium transition-all duration-200 ${
                    currentPath === child.path
                      ? 'bg-purple-50 text-purple-700 shadow-sm border-l-2 border-purple-500 -ml-[2px]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
} 