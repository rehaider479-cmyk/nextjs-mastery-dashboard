'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  MapIcon,
  CheckIcon,
  BookOpenIcon,
  FolderIcon,
  HeartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { UserButton, useUser } from '@clerk/nextjs';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Roadmap Phases', href: '/roadmap', icon: MapIcon },
  { name: 'Daily Tasks', href: '/tasks', icon: CheckIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Motivation', href: '/motivation', icon: HeartIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Next.js Mastery
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user?.firstName || 'Developer'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            2026 Learning Journey
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          "Every expert was once a beginner"
        </div>
      </div>
    </div>
  );
}
