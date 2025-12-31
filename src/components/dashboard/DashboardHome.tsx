'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import {
  ClockIcon,
  FolderIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlayIcon,
  LinkIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

// Dynamic stats based on progress context
const getQuickStats = (stats: any) => [
  {
    title: 'Hours This Week',
    value: `${stats.completedHours}/${stats.totalHours}`,
    icon: ClockIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    title: 'Tasks Completed',
    value: `${stats.completedTasks}/${stats.totalTasks}`,
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    title: 'Week Progress',
    value: `${stats.weeklyProgress}%`,
    icon: TrophyIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
];

// Tasks are now managed through the progress context

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
  const { state, dispatch } = useProgress();
  const quickStats = getQuickStats(state.stats);

  const handleMarkWeekComplete = () => {
    if (state.stats.weeklyProgress === 100) {
      dispatch({ type: 'ADVANCE_WEEK' });
    } else {
      alert('Complete all tasks first to advance to the next week!');
    }
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickStats.map((stat, index) => (
            <Card key={stat.title}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
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
                Current Week Progress - Phase {state.currentWeek.phaseNumber}, Week {state.currentWeek.weekNumber}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Week Progress</span>
                    <span>{state.stats.completedTasks}/{state.stats.totalTasks} tasks</span>
                  </div>
                  <Progress value={state.stats.weeklyProgress} showLabel />
                </div>

                <div className="space-y-3">
                  {state.currentWeek.tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <CheckCircleIcon
                          className={`h-5 w-5 flex-shrink-0 ${
                            task.completed
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm truncate ${
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
                          className="text-blue-600 hover:text-blue-800 flex-shrink-0 ml-2"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleMarkWeekComplete}
                  disabled={state.stats.weeklyProgress !== 100}
                >
                  {state.stats.weeklyProgress === 100 ? 'Mark Week Complete & Advance' : 'Complete All Tasks First'}
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
