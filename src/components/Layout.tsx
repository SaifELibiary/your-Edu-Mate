
import { ReactNode } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 transition-all duration-200">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
