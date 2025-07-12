
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ClipboardList, MessageSquare, Calendar, GraduationCap } from 'lucide-react';

const TeacherDashboard = () => {
  const { students, tasks, grades, messages } = useDataStore();
  
  const stats = [
    {
      title: 'Students',
      value: students.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Tasks',
      value: tasks.length,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Graded',
      value: grades.length,
      icon: ClipboardList,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Messages',
      value: messages.filter(m => !m.read).length,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.slice(0, 3).map((student) => (
                <div key={student.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.grade}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm font-medium text-green-600">
                      {student.overallGrade}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {task.subject}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { tasks, grades } = useDataStore();

  // Filter tasks and grades for current student
  const myTasks = tasks.filter(task => task.assignedTo.includes(user?.id || ''));
  const myGrades = grades.filter(grade => grade.studentId === user?.id);

  const stats = [
    {
      title: 'Active Tasks',
      value: myTasks.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Completed',
      value: myGrades.length,
      icon: ClipboardList,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Average Grade',
      value: myGrades.length > 0 ? Math.round(myGrades.reduce((acc, grade) => acc + grade.grade, 0) / myGrades.length) + '%' : 'N/A',
      icon: GraduationCap,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Upcoming',
      value: myTasks.filter(task => new Date(task.dueDate) > new Date()).length,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {task.subject}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myGrades.slice(0, 3).map((grade) => {
                const task = tasks.find(t => t.id === grade.taskId);
                return (
                  <div key={grade.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {task?.title || 'Unknown Task'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {grade.feedback}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${
                        grade.grade >= 90 ? 'text-green-600' : 
                        grade.grade >= 80 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {grade.grade}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const { user } = useAuthStore();
  
  return user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
};

export default Dashboard;
