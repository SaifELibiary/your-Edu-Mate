
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Filter, Clock, Users, Star, Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  saved: boolean;
}

const SavedCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete React Development Course',
      description: 'Master React from basics to advanced concepts including hooks, context, and testing.',
      instructor: 'Dr. Sarah Johnson',
      duration: '40 hours',
      students: 2450,
      rating: 4.8,
      progress: 65,
      thumbnail: '/placeholder.svg',
      category: 'Programming',
      level: 'Intermediate',
      saved: true
    },
    {
      id: '2',
      title: 'Advanced Mathematics for Engineers',
      description: 'Comprehensive calculus and linear algebra course designed for engineering students.',
      instructor: 'Prof. Michael Chen',
      duration: '60 hours',
      students: 1200,
      rating: 4.6,
      progress: 30,
      thumbnail: '/placeholder.svg',
      category: 'Mathematics',
      level: 'Advanced',
      saved: true
    },
    {
      id: '3',
      title: 'Introduction to Data Science',
      description: 'Learn Python, statistics, and machine learning fundamentals.',
      instructor: 'Dr. Emily Rodriguez',
      duration: '35 hours',
      students: 3200,
      rating: 4.9,
      progress: 80,
      thumbnail: '/placeholder.svg',
      category: 'Data Science',
      level: 'Beginner',
      saved: true
    },
    {
      id: '4',
      title: 'Digital Marketing Masterclass',
      description: 'Complete guide to modern digital marketing strategies and tools.',
      instructor: 'Mark Thompson',
      duration: '25 hours',
      students: 1800,
      rating: 4.7,
      progress: 15,
      thumbnail: '/placeholder.svg',
      category: 'Marketing',
      level: 'Intermediate',
      saved: true
    }
  ];

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory && course.saved;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Courses</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Your bookmarked courses for easy access
            </p>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            {filteredCourses.length} saved courses
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search saved courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className="capitalize whitespace-nowrap"
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-blue-500 dark:text-blue-400" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg text-gray-900 dark:text-white leading-tight">
                      {course.title}
                    </CardTitle>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-medium">Instructor: {course.instructor}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                      <Button variant="outline" size="icon">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No saved courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start exploring courses and save your favorites'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SavedCourses;
