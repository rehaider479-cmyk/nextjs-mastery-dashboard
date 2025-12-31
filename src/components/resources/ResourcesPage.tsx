'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface Resource {
  title: string;
  url: string;
  description: string;
  category: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
}

interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  resources: Resource[];
}

const resourceCategories: ResourceCategory[] = [
  {
    id: 'nextjs-core',
    title: 'Next.js Core',
    description: 'Official documentation and core learning resources',
    icon: CodeBracketIcon,
    resources: [
      {
        title: 'Next.js Official Documentation',
        url: 'https://nextjs.org/docs',
        description: 'Complete documentation for Next.js App Router, Server Components, and all features',
        category: 'Official Docs',
        difficulty: 'Beginner',
        estimatedTime: 'Ongoing reference'
      },
      {
        title: 'Next.js Learn Course',
        url: 'https://nextjs.org/learn',
        description: 'Interactive tutorial to learn Next.js from basics to advanced concepts',
        category: 'Official Tutorial',
        difficulty: 'Beginner',
        estimatedTime: '4-6 hours'
      },
      {
        title: 'Next.js 15 Release Notes',
        url: 'https://nextjs.org/blog/next-15',
        description: 'Latest features and improvements in Next.js 15',
        category: 'Release Notes',
        difficulty: 'Intermediate',
        estimatedTime: '30 minutes'
      }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'TypeScript learning resources and documentation',
    icon: CpuChipIcon,
    resources: [
      {
        title: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs/',
        description: 'Official TypeScript documentation and language guide',
        category: 'Official Docs',
        difficulty: 'Beginner',
        estimatedTime: '2-3 hours'
      },
      {
        title: 'React TypeScript Guide',
        url: 'https://react-typescript-cheatsheet.netlify.app/',
        description: 'Comprehensive guide for using TypeScript with React',
        category: 'Guide',
        difficulty: 'Intermediate',
        estimatedTime: '1-2 hours'
      },
      {
        title: 'Udemy: React TypeScript Course',
        url: 'https://www.udemy.com/course/react-typescript-the-practical-guide/',
        description: 'Complete course on building React apps with TypeScript',
        category: 'Course',
        difficulty: 'Intermediate',
        estimatedTime: '15-20 hours'
      }
    ]
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework resources',
    icon: WrenchScrewdriverIcon,
    resources: [
      {
        title: 'Tailwind CSS Documentation',
        url: 'https://tailwindcss.com/docs/installation',
        description: 'Complete Tailwind CSS documentation and guides',
        category: 'Official Docs',
        difficulty: 'Beginner',
        estimatedTime: '2-3 hours'
      },
      {
        title: 'Tailwind CSS Play',
        url: 'https://play.tailwindcss.com',
        description: 'Interactive playground to experiment with Tailwind classes',
        category: 'Tool',
        difficulty: 'Beginner',
        estimatedTime: 'Ongoing'
      },
      {
        title: 'Tailwind UI Components',
        url: 'https://tailwindui.com/',
        description: 'Beautifully designed components built with Tailwind CSS',
        category: 'Component Library',
        difficulty: 'Intermediate',
        estimatedTime: 'As needed'
      }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Backend',
    description: 'Database solutions and backend services',
    icon: CloudIcon,
    resources: [
      {
        title: 'Prisma Documentation',
        url: 'https://www.prisma.io/docs',
        description: 'Next-generation ORM for TypeScript & Node.js',
        category: 'ORM',
        difficulty: 'Intermediate',
        estimatedTime: '3-4 hours'
      },
      {
        title: 'Supabase Docs',
        url: 'https://supabase.com/docs',
        description: 'Open source Firebase alternative with PostgreSQL',
        category: 'Backend as a Service',
        difficulty: 'Intermediate',
        estimatedTime: '2-3 hours'
      },
      {
        title: 'Neon Database',
        url: 'https://neon.tech/docs',
        description: 'Serverless PostgreSQL platform',
        category: 'Database',
        difficulty: 'Intermediate',
        estimatedTime: '1-2 hours'
      }
    ]
  },
  {
    id: 'auth-payments',
    title: 'Authentication & Payments',
    description: 'Auth services and payment processing',
    icon: AcademicCapIcon,
    resources: [
      {
        title: 'Clerk Documentation',
        url: 'https://clerk.com/docs',
        description: 'Complete authentication and user management solution',
        category: 'Authentication',
        difficulty: 'Intermediate',
        estimatedTime: '2-3 hours'
      },
      {
        title: 'Clerk Next.js Quickstart',
        url: 'https://clerk.com/docs/nextjs/getting-started/quickstart',
        description: 'Step-by-step guide for integrating Clerk with Next.js',
        category: 'Quickstart',
        difficulty: 'Beginner',
        estimatedTime: '30-45 minutes'
      },
      {
        title: 'Stripe Payments Quickstart',
        url: 'https://stripe.com/docs/payments/quickstart',
        description: 'Accept payments with Stripe in your Next.js app',
        category: 'Payments',
        difficulty: 'Intermediate',
        estimatedTime: '1-2 hours'
      }
    ]
  },
  {
    id: 'tools-dev',
    title: 'Development Tools',
    description: 'Essential tools and development environment setup',
    icon: WrenchScrewdriverIcon,
    resources: [
      {
        title: 'VS Code Setup Guide',
        url: 'https://code.visualstudio.com/docs/getstarted/getting-started',
        description: 'Essential extensions and settings for Next.js development',
        category: 'Editor',
        difficulty: 'Beginner',
        estimatedTime: '30 minutes'
      },
      {
        title: 'Git Basics',
        url: 'https://git-scm.com/doc',
        description: 'Version control fundamentals for developers',
        category: 'Version Control',
        difficulty: 'Beginner',
        estimatedTime: '1-2 hours'
      },
      {
        title: 'Cursor AI Assistant',
        url: 'https://cursor.sh/',
        description: 'AI-powered code editor with Next.js support',
        category: 'AI Assistant',
        difficulty: 'Beginner',
        estimatedTime: '15 minutes'
      },
      {
        title: 'GitHub Copilot',
        url: 'https://github.com/features/copilot',
        description: 'AI pair programmer for faster development',
        category: 'AI Assistant',
        difficulty: 'Intermediate',
        estimatedTime: 'As needed'
      }
    ]
  },
  {
    id: 'free-learning',
    title: 'Free Learning Resources',
    description: 'FreeCodeCamp and other learning platforms',
    icon: BookOpenIcon,
    resources: [
      {
        title: 'freeCodeCamp JavaScript',
        url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
        description: 'Comprehensive JavaScript algorithms and data structures course',
        category: 'Course',
        difficulty: 'Beginner',
        estimatedTime: '300+ hours'
      },
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        description: 'Comprehensive web development documentation',
        category: 'Reference',
        difficulty: undefined,
        estimatedTime: 'Ongoing'
      },
      {
        title: 'React Documentation',
        url: 'https://react.dev/',
        description: 'Official React documentation and guides',
        category: 'Official Docs',
        difficulty: 'Beginner',
        estimatedTime: '2-3 hours'
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'AI integration and machine learning resources',
    icon: CpuChipIcon,
    resources: [
      {
        title: 'Vercel AI SDK',
        url: 'https://ai-sdk.dev/docs/getting-started/nextjs-app-router',
        description: 'Build AI-powered applications with Next.js',
        category: 'AI Framework',
        difficulty: 'Intermediate',
        estimatedTime: '2-3 hours'
      },
      {
        title: 'OpenAI API',
        url: 'https://platform.openai.com/docs',
        description: 'Integrate GPT models into your applications',
        category: 'AI API',
        difficulty: 'Intermediate',
        estimatedTime: '1-2 hours'
      },
      {
        title: 'Hugging Face',
        url: 'https://huggingface.co/',
        description: 'Open-source AI models and datasets',
        category: 'AI Platform',
        difficulty: 'Advanced',
        estimatedTime: 'As needed'
      }
    ]
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = resourceCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.resources.some(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const displayedCategories = selectedCategory
    ? resourceCategories.filter(cat => cat.id === selectedCategory)
    : filteredCategories;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Advanced': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Learning Resources
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Curated resources for your Next.js journey
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === null ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                All Categories
              </Button>
              {resourceCategories.slice(0, 4).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 gap-6">
        {displayedCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-blue-600" />
                  {category.title}
                  <span className="text-sm font-normal text-gray-500">
                    ({category.resources.length} resources)
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.resources.map((resource) => (
                    <div
                      key={resource.title}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {resource.title}
                        </h4>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-2"
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {resource.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {resource.difficulty && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                          )}
                          {resource.estimatedTime && (
                            <span className="text-xs text-gray-500">
                              {resource.estimatedTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-blue-600" />
            Quick Start Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Week 1 Learning Path
              </h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  Start with Next.js Learn course
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  Set up your development environment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  Build your first Next.js app
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  Deploy to Vercel
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Essential Tools Setup
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  VS Code with Next.js extensions
                </li>
                <li className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  Node.js 18+ installed
                </li>
                <li className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  Git for version control
                </li>
                <li className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  Vercel account for deployment
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
