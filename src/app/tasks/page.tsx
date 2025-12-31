import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskTracker from '@/components/tasks/TaskTracker';

export default function TasksPage() {
  return (
    <DashboardLayout>
      <TaskTracker />
    </DashboardLayout>
  );
}
