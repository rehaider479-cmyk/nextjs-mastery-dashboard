'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  LinkIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  timeEstimate: string;
  link?: string;
  motivationalLine?: string;
}

interface Week {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

interface Phase {
  id: string;
  title: string;
  period: string;
  description: string;
  weeks: Week[];
  color: string;
}

const roadmapData: Phase[] = [
  {
    id: 'phase1',
    title: 'Phase 1: Next.js Fundamentals',
    period: 'Jan–Feb 2026',
    description: 'Master the basics of Next.js, routing, layouts, and core concepts.',
    color: 'blue',
    weeks: [
      {
        id: 'week1-2',
        title: 'Week 1–2: Setup + Basics',
        description: 'Install Next.js, learn routing and layouts, build static sites.',
        tasks: [
          {
            id: 'day1',
            title: 'Install Next.js, create app, complete first section of official Next.js Learn course',
            completed: false,
            timeEstimate: '1–2 hours',
            link: 'https://nextjs.org/learn',
            motivationalLine: '"Every expert was once a beginner – start strong!"'
          },
          {
            id: 'day2',
            title: 'Learn routing and layouts. Add navigation to a sample site.',
            completed: false,
            timeEstimate: '1–2 hours'
          },
          {
            id: 'day3',
            title: 'Images and fonts optimization. Deploy to Vercel.',
            completed: false,
            timeEstimate: '1–2 hours',
            link: 'https://vercel.com'
          },
          {
            id: 'day4-5',
            title: 'Build simple static site (portfolio v1). Review and commit to GitHub.',
            completed: false,
            timeEstimate: '3–4 hours'
          },
          {
            id: 'day6-7',
            title: 'Rest/Review – Watch Jack Herrington\'s Next.js 15 Crash Course.',
            completed: false,
            timeEstimate: '2–3 hours',
            link: 'https://www.youtube.com/results?search_query=Jack+Herrington+Next.js+15'
          }
        ]
      },
      {
        id: 'week3-4',
        title: 'Week 3–4: Data Fetching',
        description: 'Learn Server Components, Actions, and streaming.',
        tasks: [
          {
            id: 'week3-4-1',
            title: 'Build blog with MDX and Server Components',
            completed: false,
            timeEstimate: '4–6 hours'
          },
          {
            id: 'week3-4-2',
            title: 'Implement Server Actions for forms',
            completed: false,
            timeEstimate: '2–3 hours'
          },
          {
            id: 'week3-4-3',
            title: 'Add streaming and loading states',
            completed: false,
            timeEstimate: '2–3 hours'
          }
        ]
      },
      {
        id: 'week5-6',
        title: 'Week 5–6: Advanced Features',
        description: 'Master caching, middleware, and optimization.',
        tasks: [
          {
            id: 'week5-6-1',
            title: 'Implement caching strategies',
            completed: false,
            timeEstimate: '3–4 hours'
          },
          {
            id: 'week5-6-2',
            title: 'Build middleware for authentication',
            completed: false,
            timeEstimate: '2–3 hours'
          },
          {
            id: 'week5-6-3',
            title: 'Build Todo app with advanced features',
            completed: false,
            timeEstimate: '4–5 hours'
          }
        ]
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: TypeScript + Tailwind',
    period: 'Mar 2026',
    description: 'Convert all projects to TypeScript and rebuild with Tailwind CSS.',
    color: 'green',
    weeks: [
      {
        id: 'phase2-weeks',
        title: 'Month of TypeScript Mastery',
        description: 'Complete TypeScript conversion and Tailwind integration.',
        tasks: [
          {
            id: 'ts-conversion',
            title: 'Convert all existing projects to TypeScript',
            completed: false,
            timeEstimate: '8–10 hours',
            link: 'https://www.typescriptlang.org/docs/'
          },
          {
            id: 'tailwind-rebuild',
            title: 'Rebuild portfolio and apps with Tailwind CSS',
            completed: false,
            timeEstimate: '6–8 hours',
            link: 'https://tailwindcss.com/docs/installation'
          },
          {
            id: 'ts-advanced',
            title: 'Master advanced TypeScript patterns',
            completed: false,
            timeEstimate: '4–6 hours'
          }
        ]
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: Full-Stack Development',
    period: 'Apr–Jun 2026',
    description: 'Build full-stack applications with databases and authentication.',
    color: 'purple',
    weeks: [
      {
        id: 'phase3-fullstack',
        title: 'Full-Stack Mastery',
        description: 'Database integration, authentication, and payments.',
        tasks: [
          {
            id: 'database-setup',
            title: 'Set up Prisma with database (Neon/Supabase)',
            completed: false,
            timeEstimate: '4–6 hours',
            link: 'https://www.prisma.io/nextjs'
          },
          {
            id: 'auth-integration',
            title: 'Implement Clerk authentication',
            completed: false,
            timeEstimate: '3–4 hours',
            link: 'https://clerk.com/docs/nextjs/getting-started/quickstart'
          },
          {
            id: 'payments',
            title: 'Add Stripe payments integration',
            completed: false,
            timeEstimate: '4–5 hours',
            link: 'https://stripe.com/docs/payments/quickstart'
          },
          {
            id: 'tradepro-clone',
            title: 'Build TradePro clone with full-stack features',
            completed: false,
            timeEstimate: '20–30 hours'
          }
        ]
      }
    ]
  },
  {
    id: 'phase4',
    title: 'Phase 4: Advanced Niches',
    period: 'Jul–Sep 2026',
    description: 'Explore AI integration and advanced Next.js features.',
    color: 'orange',
    weeks: [
      {
        id: 'phase4-ai',
        title: 'AI Integration & Advanced Features',
        description: 'Learn Vercel AI SDK and cutting-edge technologies.',
        tasks: [
          {
            id: 'ai-sdk',
            title: 'Master Vercel AI SDK integration',
            completed: false,
            timeEstimate: '6–8 hours',
            link: 'https://ai-sdk.dev/docs/getting-started/nextjs-app-router'
          },
          {
            id: 'ai-app',
            title: 'Build AI-powered application',
            completed: false,
            timeEstimate: '10–15 hours'
          },
          {
            id: 'ecommerce-features',
            title: 'Add advanced e-commerce features',
            completed: false,
            timeEstimate: '8–12 hours'
          }
        ]
      }
    ]
  },
  {
    id: 'phase5',
    title: 'Phase 5: Earning Phase',
    period: 'Oct–Dec 2026',
    description: 'Portfolio polish, GitHub optimization, and freelance/freelancing.',
    color: 'red',
    weeks: [
      {
        id: 'phase5-earning',
        title: 'Professional Development & Income',
        description: 'Prepare for freelance opportunities and job applications.',
        tasks: [
          {
            id: 'portfolio-polish',
            title: 'Build professional portfolio site',
            completed: false,
            timeEstimate: '8–10 hours'
          },
          {
            id: 'github-optimization',
            title: 'Optimize GitHub profile and repositories',
            completed: false,
            timeEstimate: '4–6 hours'
          },
          {
            id: 'upwork-setup',
            title: 'Set up Upwork/Fiverr profiles and bid on projects',
            completed: false,
            timeEstimate: '6–8 hours'
          },
          {
            id: 'job-applications',
            title: 'Apply for junior developer positions ($70k–$120k)',
            completed: false,
            timeEstimate: 'Ongoing'
          }
        ]
      }
    ]
  }
];

export default function RoadmapPhases() {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase1']));
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['week1-2']));

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const toggleWeek = (weekId: string) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId);
    } else {
      newExpanded.add(weekId);
    }
    setExpandedWeeks(newExpanded);
  };

  const getPhaseColor = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
      green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
      purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
      orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20',
      red: 'border-red-500 bg-red-50 dark:bg-red-900/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          2026 Next.js Mastery Roadmap
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Track your journey from beginner to pro developer
        </div>
      </div>

      <div className="space-y-4">
        {roadmapData.map((phase, phaseIndex) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: phaseIndex * 0.1 }}
          >
            <Card className={`border-l-4 ${getPhaseColor(phase.color)}`}>
              <div
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={() => togglePhase(phase.id)}
              >
                <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedPhases.has(phase.id) ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    )}
                    <div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {phase.period} • {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {phase.weeks.length} {phase.weeks.length === 1 ? 'Week' : 'Weeks'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Phase {phaseIndex + 1}/5
                    </div>
                  </div>
                </div>
                </CardHeader>
              </div>

              <AnimatePresence>
                {expandedPhases.has(phase.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {phase.weeks.map((week) => (
                          <div key={week.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div
                              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between"
                              onClick={() => toggleWeek(week.id)}
                            >
                              <div className="flex items-center gap-3">
                                {expandedWeeks.has(week.id) ? (
                                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                )}
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {week.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {week.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <ClockIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  {week.tasks.length} tasks
                                </span>
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedWeeks.has(week.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-4 pb-4 space-y-3">
                                    {week.tasks.map((task) => (
                                      <div
                                        key={task.id}
                                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                      >
                                        <CheckCircleIcon
                                          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                                            task.completed
                                              ? 'text-green-600'
                                              : 'text-gray-400'
                                          }`}
                                        />
                                        <div className="flex-1 min-w-0">
                                          <p className={`text-sm ${
                                            task.completed
                                              ? 'line-through text-gray-500'
                                              : 'text-gray-900 dark:text-white'
                                          }`}>
                                            {task.title}
                                          </p>
                                          <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                              <ClockIcon className="h-3 w-3" />
                                              {task.timeEstimate}
                                            </div>
                                            {task.link && (
                                              <a
                                                href={task.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                                              >
                                                <LinkIcon className="h-3 w-3" />
                                                Resource
                                              </a>
                                            )}
                                          </div>
                                          {task.motivationalLine && (
                                            <p className="text-xs text-blue-600 italic mt-1">
                                              {task.motivationalLine}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roadmapData.map((phase, index) => {
              const totalTasks = phase.weeks.reduce((acc, week) => acc + week.tasks.length, 0);
              const completedTasks = phase.weeks.reduce((acc, week) =>
                acc + week.tasks.filter(task => task.completed).length, 0
              );
              const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              return (
                <div key={phase.id} className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Phase {index + 1}
                  </div>
                  <Progress value={progress} />
                  <div className="text-xs text-gray-500 mt-1">
                    {completedTasks}/{totalTasks} tasks
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
