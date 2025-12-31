'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  SparklesIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

const motivationalQuotes: Quote[] = [
  {
    id: '1',
    text: "AI isn't replacing devs—it's making the skilled ones unstoppable. Grind on!",
    author: "Tech Wisdom",
    category: "AI & Future"
  },
  {
    id: '2',
    text: "From basic HTML to $100/hour freelance: You've got this. Every expert was once a beginner.",
    author: "Success Mindset",
    category: "Career Growth"
  },
  {
    id: '3',
    text: "Code 1–2 hours daily: Consistency beats intensity. Build the habit, master the craft.",
    author: "Learning Philosophy",
    category: "Consistency"
  },
  {
    id: '4',
    text: "Build real shit—tutorials are just the warm-up. Ship projects that solve problems.",
    author: "Developer Wisdom",
    category: "Building"
  },
  {
    id: '5',
    text: "Next.js is thriving in 2026—level up and cash in. The framework is eating the world.",
    author: "Tech Trends",
    category: "Opportunities"
  },
  {
    id: '6',
    text: "Your first portfolio might suck, but your tenth will be incredible. Keep building.",
    author: "Growth Mindset",
    category: "Improvement"
  },
  {
    id: '7',
    text: "Freelance at $50–$100/hour isn't a dream—it's your next 6 months of focused learning.",
    author: "Financial Freedom",
    category: "Income Goals"
  },
  {
    id: '8',
    text: "Debugging is where the real learning happens. Embrace the struggle, master the code.",
    author: "Problem Solving",
    category: "Learning"
  },
  {
    id: '9',
    text: "TypeScript doesn't slow you down—it prevents disasters. Invest in type safety early.",
    author: "Best Practices",
    category: "Quality"
  },
  {
    id: '10',
    text: "Deploy early, deploy often. Real users > perfect code. Get feedback, iterate fast.",
    author: "Product Development",
    category: "Shipping"
  },
  {
    id: '11',
    text: "Open source your projects. Your code could help someone else's journey.",
    author: "Community",
    category: "Contribution"
  },
  {
    id: '12',
    text: "Stack Overflow is your friend, but understanding the why is your superpower.",
    author: "Deep Learning",
    category: "Mastery"
  },
  {
    id: '13',
    text: "Your GitHub is your resume. Clean commits, good documentation, real projects.",
    author: "Professionalism",
    category: "Branding"
  },
  {
    id: '14',
    text: "Mobile-first isn't optional—it's essential. Design for the smallest screen first.",
    author: "Responsive Design",
    category: "UX/UI"
  },
  {
    id: '15',
    text: "APIs are the bridges between ideas and reality. Learn to build and consume them.",
    author: "Full-Stack",
    category: "Integration"
  }
];

const milestones = [
  {
    id: 'week1',
    title: 'Week 1 Complete',
    description: 'First Next.js app deployed to Vercel',
    icon: RocketLaunchIcon,
    reward: '🏆 First Deployment Badge'
  },
  {
    id: 'phase1',
    title: 'Phase 1 Complete',
    description: 'Mastered Next.js fundamentals',
    icon: CpuChipIcon,
    reward: '🚀 Fundamentals Master'
  },
  {
    id: 'first-freelance',
    title: 'First Freelance Gig',
    description: '$50+ earned from coding',
    icon: CurrencyDollarIcon,
    reward: '💰 Money Maker'
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio v2 Launched',
    description: 'Professional portfolio with TypeScript',
    icon: SparklesIcon,
    reward: '✨ Portfolio Pro'
  }
];

const achievements = [
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Code for 7 consecutive days',
    progress: 5,
    total: 7,
    icon: StarIcon
  },
  {
    id: 'projects-3',
    title: 'Project Builder',
    description: 'Complete 3 projects',
    progress: 0,
    total: 3,
    icon: LightBulbIcon
  },
  {
    id: 'hours-50',
    title: 'Time Master',
    description: 'Log 50 hours of coding',
    progress: 8,
    total: 50,
    icon: HeartIcon
  }
];

export default function MotivationSection() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(motivationalQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  const changeQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsAnimating(false);
    }, 150);
  };

  useEffect(() => {
    // Set initial random quote
    setCurrentQuote(getRandomQuote());
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Stay Motivated
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Daily inspiration for your Next.js mastery journey
        </p>
      </div>

      {/* Featured Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-4xl mb-4">💭</div>
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
                  "{currentQuote.text}"
                </blockquote>
                <div className="text-blue-100">
                  <p className="font-medium">{currentQuote.author}</p>
                  <p className="text-sm opacity-80">{currentQuote.category}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <Button
                onClick={changeQuote}
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                Achievements & Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <achievement.icon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <milestone.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {milestone.description}
                      </p>
                      <div className="text-sm font-medium text-green-600">
                        {milestone.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Motivation Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LightBulbIcon className="h-5 w-5 text-yellow-500" />
              Daily Motivation Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Learning Mindset</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Every bug is a learning opportunity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Compare yourself to yesterday, not others
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Small daily progress compounds massively
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Success Habits</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Code 1-2 hours daily, no exceptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Build projects that interest you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Share your progress online
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quote Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quote Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(motivationalQuotes.map(q => q.category))).map((category) => (
                <button
                  key={category}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
