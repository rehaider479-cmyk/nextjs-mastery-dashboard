'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  FolderIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlayIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const quickStats = [
  {
    title: 'Hours This Week',
    value: '8/14',
    icon: ClockIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    title: 'Projects Built',
    value: '0/7',
    icon: FolderIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    title: 'Freelance Gigs',
    value: '0',
    icon: CurrencyDollarIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
];

const currentWeekTasks = [
  {
    id: 1,
    title: 'Install Next.js and create your first app',
    completed: true,
    timeEstimate: '1-2 hours',
    link: 'https://nextjs.org/learn'
  },
  {
    id: 2,
    title: 'Complete first section of Next.js Learn course',
    completed: true,
    timeEstimate: '2-3 hours',
    link: 'https://nextjs.org/learn'
  },
  {
    id: 3,
    title: 'Learn routing and layouts',
    completed: false,
    timeEstimate: '1-2 hours',
    link: null
  },
  {
    id: 4,
    title: 'Add navigation to sample site',
    completed: false,
    timeEstimate: '1 hour',
    link: null
  },
  {
    id: 5,
    title: 'Build simple static site (portfolio v1)',
    completed: false,
    timeEstimate: '3-4 hours',
    link: null
  }
];

const resources = [
  {
    title: 'Next.js Official Docs',
    url: 'https://nextjs.org/docs',
    description: 'Complete documentation for Next.js'
  },
  {
    title: 'Vercel Deployment',
    url: 'https://vercel.com',
    description: 'Deploy your Next.js apps for free'
  },
  {
    title: 'Next.js Learn Course',
    url: 'https://nextjs.org/learn',
    description: 'Interactive tutorial to learn Next.js'
  }
];

export default function DashboardHome() {
  const completedTasks = currentWeekTasks.filter(task => task.completed).length;
  const totalTasks = currentWeekTasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Your Next.js 2026 Roadmap
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                Let's Crush It! Transform from beginner to pro full-stack developer.
              </p>
              <div className="text-sm text-blue-100">
                "Every expert was once a beginner – start strong!"
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Week Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayIcon className="h-5 w-5 text-blue-600" />
                Current Week Progress - Phase 1, Week 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Week Progress</span>
                    <span>{completedTasks}/{totalTasks} tasks</span>
                  </div>
                  <Progress value={progressPercentage} showLabel />
                </div>

                <div className="space-y-3">
                  {currentWeekTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon
                          className={`h-5 w-5 ${
                            task.completed
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <p className={`text-sm ${
                            task.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {task.timeEstimate}
                          </p>
                        </div>
                      </div>
                      {task.link && (
                        <a
                          href={task.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant="outline">
                  Mark Week Complete & Advance
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Resources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.title} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.description}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
