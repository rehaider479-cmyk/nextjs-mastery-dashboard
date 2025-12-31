'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  timeEstimate: string;
  link?: string;
  motivationalLine?: string;
  day: number;
}

interface WeekData {
  weekNumber: number;
  startDate: Date;
  tasks: Task[];
}

// Sample data for Week 1, Phase 1
const week1Tasks: Task[] = [
  {
    id: 'day1-task1',
    title: 'Install Next.js and create your first app',
    completed: false,
    timeEstimate: '1-2 hours',
    link: 'https://nextjs.org/learn',
    motivationalLine: '"Every expert was once a beginner – start strong!"',
    day: 1
  },
  {
    id: 'day1-task2',
    title: 'Complete first section of Next.js Learn course',
    completed: false,
    timeEstimate: '2-3 hours',
    link: 'https://nextjs.org/learn',
    day: 1
  },
  {
    id: 'day2-task1',
    title: 'Learn routing and layouts',
    completed: false,
    timeEstimate: '1-2 hours',
    day: 2
  },
  {
    id: 'day2-task2',
    title: 'Add navigation to sample site',
    completed: false,
    timeEstimate: '1 hour',
    day: 2
  },
  {
    id: 'day3-task1',
    title: 'Images and fonts optimization',
    completed: false,
    timeEstimate: '1-2 hours',
    link: 'https://nextjs.org/docs/basic-features/image-optimization',
    day: 3
  },
  {
    id: 'day3-task2',
    title: 'Deploy to Vercel',
    completed: false,
    timeEstimate: '30-45 minutes',
    link: 'https://vercel.com',
    day: 3
  },
  {
    id: 'day4-task1',
    title: 'Build simple static site (portfolio v1) - Part 1',
    completed: false,
    timeEstimate: '2-3 hours',
    day: 4
  },
  {
    id: 'day5-task1',
    title: 'Build simple static site (portfolio v1) - Part 2',
    completed: false,
    timeEstimate: '2-3 hours',
    day: 5
  },
  {
    id: 'day5-task2',
    title: 'Review code and commit to GitHub',
    completed: false,
    timeEstimate: '1 hour',
    day: 5
  },
  {
    id: 'day6-task1',
    title: 'Watch Jack Herrington\'s Next.js 15 Crash Course',
    completed: false,
    timeEstimate: '2-3 hours',
    link: 'https://www.youtube.com/results?search_query=Jack+Herrington+Next.js+15',
    day: 6
  },
  {
    id: 'day7-task1',
    title: 'Rest and review completed work',
    completed: false,
    timeEstimate: '1-2 hours',
    motivationalLine: '"Code 1-2 hours daily: Consistency beats intensity."',
    day: 7
  }
];

const currentWeek: WeekData = {
  weekNumber: 1,
  startDate: new Date(2026, 0, 1), // January 1, 2026
  tasks: week1Tasks
};

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>(currentWeek.tasks);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksForDay = (day: number) => {
    return tasks.filter(task => task.day === day);
  };

  const getDayProgress = (day: number) => {
    const dayTasks = getTasksForDay(day);
    const completedTasks = dayTasks.filter(task => task.completed).length;
    return dayTasks.length > 0 ? (completedTasks / dayTasks.length) * 100 : 0;
  };

  const getWeekProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  };

  const markWeekComplete = () => {
    // In a real app, this would advance to the next week
    alert('Week completed! Ready to advance to Week 2.');
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daily Task Tracker
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Phase 1, Week {currentWeek.weekNumber}
        </div>
      </div>

      {/* Week Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayIcon className="h-5 w-5 text-blue-600" />
            Week {currentWeek.weekNumber} Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{tasks.filter(t => t.completed).length}/{tasks.length} tasks</span>
              </div>
              <Progress value={getWeekProgress()} showLabel />
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day, index) => {
                const dayNumber = index + 1;
                const progress = getDayProgress(dayNumber);
                const isSelected = selectedDay === dayNumber;
                const isToday = dayNumber === 1; // For demo purposes

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(dayNumber)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {day}
                    </div>
                    <div className={`text-lg font-bold ${
                      isToday ? 'text-blue-600' : 'text-gray-900 dark:text-white'
                    }`}>
                      {dayNumber}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tasks */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Day {selectedDay} Tasks</span>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {getTasksForDay(selectedDay).length} tasks
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getTasksForDay(selectedDay).length > 0 ? (
              <div className="space-y-4">
                {getTasksForDay(selectedDay).map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5"
                    >
                      <CheckCircleIcon
                        className={`h-5 w-5 ${
                          task.completed
                            ? 'text-green-600'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-relaxed ${
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
                        <p className="text-xs text-blue-600 italic mt-2">
                          {task.motivationalLine}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Day Progress */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Day {selectedDay} Progress
                    </span>
                    <span className="text-sm text-gray-500">
                      {getTasksForDay(selectedDay).filter(t => t.completed).length}/{getTasksForDay(selectedDay).length} completed
                    </span>
                  </div>
                  <Progress value={getDayProgress(selectedDay)} />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No tasks scheduled for Day {selectedDay}</p>
                <p className="text-sm">Take a well-deserved rest day!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Week Completion */}
      {getWeekProgress() === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    Week {currentWeek.weekNumber} Complete! 🎉
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Ready to advance to the next phase?
                  </p>
                </div>
                <Button onClick={markWeekComplete} size="sm">
                  Advance Week
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
