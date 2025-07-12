
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  MessageSquare,
  Calendar,
  GraduationCap,
  Heart,
  Settings,
  CheckSquare
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const teacherNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Students', href: '/students' },
  { icon: BookOpen, label: 'Tasks', href: '/tasks' },
  { icon: ClipboardList, label: 'Grades', href: '/grades' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const studentNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: CheckSquare, label: 'My Tasks', href: '/my-tasks' },
  { icon: Heart, label: 'Saved Courses', href: '/saved-courses' },
  { icon: Calendar, label: 'Schedule', href: '/schedule' },
  { icon: GraduationCap, label: 'My Grades', href: '/my-grades' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const navItems = user?.role === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-transform duration-200',
                isActive ? 'scale-110' : 'group-hover:scale-105'
              )} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
