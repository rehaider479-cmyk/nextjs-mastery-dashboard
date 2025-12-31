'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { motion } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import {
  CheckCircleIcon,
  ClockIcon,
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';


export default function TaskTracker() {
  const { state, dispatch } = useProgress();
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const toggleTask = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', taskId });
  };

  const getTasksForDay = (day: number) => {
    return state.currentWeek.tasks.filter(task => task.day === day);
  };

  const getDayProgress = (day: number) => {
    const dayTasks = getTasksForDay(day);
    const completedTasks = dayTasks.filter(task => task.completed).length;
    return dayTasks.length > 0 ? (completedTasks / dayTasks.length) * 100 : 0;
  };

  const markWeekComplete = () => {
    if (state.stats.weeklyProgress === 100) {
      dispatch({ type: 'ADVANCE_WEEK' });
      // Reset selected day to 1 for new week
      setSelectedDay(1);
    } else {
      alert('Complete all tasks first to advance to the next week!');
    }
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daily Task Tracker
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Phase {state.currentWeek.phaseNumber}, Week {state.currentWeek.weekNumber}
        </div>
      </div>

      {/* Week Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayIcon className="h-5 w-5 text-blue-600" />
            Week {state.currentWeek.weekNumber} Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{state.stats.completedTasks}/{state.stats.totalTasks} tasks</span>
              </div>
              <Progress value={state.stats.weeklyProgress} showLabel />
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {daysOfWeek.map((day, index) => {
                const dayNumber = index + 1;
                const progress = getDayProgress(dayNumber);
                const isSelected = selectedDay === dayNumber;
                const hasTasks = getTasksForDay(dayNumber).length > 0;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(dayNumber)}
                    disabled={!hasTasks}
                    className={`p-2 sm:p-3 rounded-lg border text-center transition-colors ${
                      !hasTasks
                        ? 'opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {day}
                    </div>
                    <div className={`text-base sm:text-lg font-bold ${
                      isSelected ? 'text-blue-600' : 'text-gray-900 dark:text-white'
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
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>Day {selectedDay} Tasks</span>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {getTasksForDay(selectedDay).length} tasks • {state.stats.completedHours}h completed
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
      {state.stats.weeklyProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-xs sm:max-w-sm"
        >
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <TrophyIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-green-900 dark:text-green-100 text-sm sm:text-base">
                    Week {state.currentWeek.weekNumber} Complete! 🎉
                  </h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    Ready to advance to the next phase?
                  </p>
                </div>
                <Button onClick={markWeekComplete} size="sm" className="flex-shrink-0">
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
