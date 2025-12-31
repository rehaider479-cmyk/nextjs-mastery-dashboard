'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  timeEstimate: string;
  link?: string;
  motivationalLine?: string;
  day: number;
}

export interface WeekData {
  weekNumber: number;
  phaseNumber: number;
  startDate: Date;
  tasks: Task[];
  totalHours: number;
  completedHours: number;
}

interface ProgressStats {
  totalHours: number;
  completedHours: number;
  totalTasks: number;
  completedTasks: number;
  weeklyProgress: number;
  overallProgress: number;
}

interface ProgressState {
  currentWeek: WeekData;
  stats: ProgressStats;
  allWeeks: WeekData[];
}

type ProgressAction =
  | { type: 'TOGGLE_TASK'; taskId: string }
  | { type: 'ADVANCE_WEEK' }
  | { type: 'LOAD_PROGRESS'; state: ProgressState }
  | { type: 'RESET_PROGRESS' };

const STORAGE_KEY = 'nextjs-mastery-progress';

// Sample data for Week 1, Phase 1
const createInitialWeek = (): WeekData => ({
  weekNumber: 1,
  phaseNumber: 1,
  startDate: new Date(2026, 0, 1), // January 1, 2026
  tasks: [
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
  ],
  totalHours: 0, // Will be calculated
  completedHours: 0
});

// Helper function to parse time estimate and get average hours
const parseTimeEstimate = (timeEstimate: string): number => {
  // Extract numbers from strings like "1-2 hours", "30-45 minutes", "1 hour"
  const matches = timeEstimate.match(/(\d+)(?:-(\d+))?\s*(hour|minute)/gi);
  if (!matches) return 0;

  let totalHours = 0;
  matches.forEach(match => {
    const parts = match.match(/(\d+)(?:-(\d+))?\s*(hour|minute)/i);
    if (parts) {
      const min = parseInt(parts[1]);
      const max = parts[2] ? parseInt(parts[2]) : min;
      const unit = parts[3].toLowerCase();
      const avg = (min + max) / 2;

      if (unit === 'hour') {
        totalHours += avg;
      } else if (unit === 'minute') {
        totalHours += avg / 60;
      }
    }
  });

  return Math.round(totalHours * 10) / 10; // Round to 1 decimal place
};

// Calculate stats from current week
const calculateStats = (week: WeekData): ProgressStats => {
  const completedTasks = week.tasks.filter(task => task.completed).length;
  const totalTasks = week.tasks.length;
  const completedHours = week.tasks
    .filter(task => task.completed)
    .reduce((acc, task) => acc + parseTimeEstimate(task.timeEstimate), 0);
  const totalHours = week.tasks.reduce((acc, task) => acc + parseTimeEstimate(task.timeEstimate), 0);
  const weeklyProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const overallProgress = totalHours > 0 ? (completedHours / totalHours) * 100 : 0;

  return {
    totalHours: Math.round(totalHours * 10) / 10,
    completedHours: Math.round(completedHours * 10) / 10,
    totalTasks,
    completedTasks,
    weeklyProgress: Math.round(weeklyProgress),
    overallProgress: Math.round(overallProgress)
  };
};

const progressReducer = (state: ProgressState, action: ProgressAction): ProgressState => {
  switch (action.type) {
    case 'TOGGLE_TASK': {
      const updatedWeek = {
        ...state.currentWeek,
        tasks: state.currentWeek.tasks.map(task =>
          task.id === action.taskId ? { ...task, completed: !task.completed } : task
        )
      };

      const newStats = calculateStats(updatedWeek);
      const updatedWeekWithStats = {
        ...updatedWeek,
        completedHours: newStats.completedHours
      };

      return {
        ...state,
        currentWeek: updatedWeekWithStats,
        stats: newStats
      };
    }

    case 'ADVANCE_WEEK': {
      // For now, just reset to a new week. In a real app, you'd have predefined weeks
      const nextWeekNumber = state.currentWeek.weekNumber + 1;
      const nextPhaseNumber = nextWeekNumber <= 4 ? 1 : 2; // Simple phase calculation

      const newWeek: WeekData = {
        weekNumber: nextWeekNumber,
        phaseNumber: nextPhaseNumber,
        startDate: new Date(state.currentWeek.startDate.getTime() + (7 * 24 * 60 * 60 * 1000)),
        tasks: [], // Empty for now - would load from predefined data
        totalHours: 0,
        completedHours: 0
      };

      return {
        ...state,
        currentWeek: newWeek,
        stats: calculateStats(newWeek)
      };
    }

    case 'LOAD_PROGRESS':
      return action.state;

    case 'RESET_PROGRESS': {
      const initialWeek = createInitialWeek();
      const initialStats = calculateStats(initialWeek);
      return {
        currentWeek: { ...initialWeek, totalHours: initialStats.totalHours },
        stats: initialStats,
        allWeeks: []
      };
    }

    default:
      return state;
  }
};

const ProgressContext = createContext<{
  state: ProgressState;
  dispatch: React.Dispatch<ProgressAction>;
} | null>(null);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(progressReducer, null, () => {
    // Initialize state
    const initialWeek = createInitialWeek();
    const initialStats = calculateStats(initialWeek);

    return {
      currentWeek: { ...initialWeek, totalHours: initialStats.totalHours },
      stats: initialStats,
      allWeeks: []
    };
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        // Convert date strings back to Date objects
        if (parsedState.currentWeek.startDate) {
          parsedState.currentWeek.startDate = new Date(parsedState.currentWeek.startDate);
        }
        dispatch({ type: 'LOAD_PROGRESS', state: parsedState });
      } catch (error) {
        console.error('Failed to load progress from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
