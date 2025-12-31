'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { motion } from 'framer-motion';
import {
  FolderIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  phase: string;
  estimatedHours: number;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  priority: 'high' | 'medium' | 'low';
  completionPercentage: number;
}

const projects: Project[] = [
  {
    id: 'portfolio-v1',
    title: 'Portfolio Site v1',
    description: 'Simple static portfolio website showcasing basic HTML/CSS skills',
    status: 'not-started',
    phase: 'Phase 1, Week 1',
    estimatedHours: 8,
    technologies: ['HTML', 'CSS', 'Next.js'],
    priority: 'high',
    completionPercentage: 0
  },
  {
    id: 'blog-mdx',
    title: 'MDX Blog',
    description: 'Blog application with MDX support and Server Components',
    status: 'not-started',
    phase: 'Phase 1, Week 3-4',
    estimatedHours: 12,
    technologies: ['Next.js', 'MDX', 'Tailwind CSS'],
    priority: 'high',
    completionPercentage: 0
  },
  {
    id: 'todo-app',
    title: 'Todo App',
    description: 'Full-featured todo application with advanced caching',
    status: 'not-started',
    phase: 'Phase 1, Week 5-6',
    estimatedHours: 15,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    priority: 'high',
    completionPercentage: 0
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio Site v2 (TypeScript)',
    description: 'Portfolio rebuilt with TypeScript and advanced Tailwind',
    status: 'not-started',
    phase: 'Phase 2',
    estimatedHours: 10,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    priority: 'medium',
    completionPercentage: 0
  },
  {
    id: 'tradepro-clone',
    title: 'TradePro Clone',
    description: 'Full-stack trading platform with authentication and payments',
    status: 'not-started',
    phase: 'Phase 3',
    estimatedHours: 40,
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Clerk', 'Stripe'],
    priority: 'high',
    completionPercentage: 0
  },
  {
    id: 'ai-chat-app',
    title: 'AI Chat Application',
    description: 'AI-powered chat app using Vercel AI SDK',
    status: 'not-started',
    phase: 'Phase 4',
    estimatedHours: 20,
    technologies: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'OpenAI'],
    priority: 'medium',
    completionPercentage: 0
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce site with advanced features',
    status: 'not-started',
    phase: 'Phase 4-5',
    estimatedHours: 35,
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    priority: 'low',
    completionPercentage: 0
  }
];

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    color: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
    icon: ClockIcon
  },
  'in-progress': {
    label: 'In Progress',
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    icon: CodeBracketIcon
  },
  'completed': {
    label: 'Completed',
    color: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    icon: CheckCircleIcon
  }
};

const priorityConfig = {
  high: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
  low: 'text-green-600 bg-green-50 dark:bg-green-900/20'
};

export default function ProjectsTracker() {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredProjects = projectList.filter(project => {
    if (filterStatus !== 'all' && project.status !== filterStatus) return false;
    if (filterPriority !== 'all' && project.priority !== filterPriority) return false;
    return true;
  });

  const updateProjectStatus = (projectId: string, status: Project['status']) => {
    setProjectList(projects =>
      projects.map(project =>
        project.id === projectId
          ? { ...project, status, completionPercentage: status === 'completed' ? 100 : project.completionPercentage }
          : project
      )
    );
  };

  const updateProjectUrls = (projectId: string, type: 'github' | 'live', url: string) => {
    setProjectList(projects =>
      projects.map(project =>
        project.id === projectId
          ? {
              ...project,
              ...(type === 'github' ? { githubUrl: url } : { liveUrl: url })
            }
          : project
      )
    );
  };

  const getStats = () => {
    const total = projectList.length;
    const completed = projectList.filter(p => p.status === 'completed').length;
    const inProgress = projectList.filter(p => p.status === 'in-progress').length;
    const notStarted = projectList.filter(p => p.status === 'not-started').length;
    const totalHours = projectList.reduce((acc, p) => acc + p.estimatedHours, 0);
    const completedHours = projectList
      .filter(p => p.status === 'completed')
      .reduce((acc, p) => acc + p.estimatedHours, 0);

    return { total, completed, inProgress, notStarted, totalHours, completedHours };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Project Tracker
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Build real projects to master Next.js
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FolderIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completed}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <CodeBracketIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgress}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <GlobeAltIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Hours Built
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedHours}/{stats.totalHours}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[project.priority]}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status and Progress */}
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].color}`}>
                    {(() => {
                      const IconComponent = statusConfig[project.status].icon;
                      return <IconComponent className="h-3 w-3 inline mr-1" />;
                    })()}
                    {statusConfig[project.status].label}
                  </div>
                  <span className="text-sm text-gray-500">
                    {project.estimatedHours}h estimated
                  </span>
                </div>

                {project.status === 'in-progress' && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.completionPercentage}%</span>
                    </div>
                    <Progress value={project.completionPercentage} />
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* URLs */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="GitHub repository URL"
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProjectUrls(project.id, 'github', e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Live demo URL"
                      value={project.liveUrl || ''}
                      onChange={(e) => updateProjectUrls(project.id, 'live', e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Phase */}
                <div className="text-xs text-gray-500">
                  {project.phase}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project.status === 'not-started' && (
                    <Button
                      size="sm"
                      onClick={() => updateProjectStatus(project.id, 'in-progress')}
                      className="flex-1"
                    >
                      Start Project
                    </Button>
                  )}
                  {project.status === 'in-progress' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProjectStatus(project.id, 'not-started')}
                      >
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateProjectStatus(project.id, 'completed')}
                        className="flex-1"
                      >
                        Mark Complete
                      </Button>
                    </>
                  )}
                  {project.status === 'completed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProjectStatus(project.id, 'in-progress')}
                      className="w-full"
                    >
                      Reopen Project
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
