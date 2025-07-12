
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  parentEmail?: string;
  avatar?: string;
  overallGrade: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  assignedTo: string[]; // student IDs
  createdBy: string; // teacher ID
  createdAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  taskId: string;
  grade: number;
  feedback: string;
  gradedBy: string; // teacher ID
  gradedAt: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  studentId?: string;
  sentAt: string;
  read: boolean;
}

interface DataState {
  students: Student[];
  tasks: Task[];
  grades: Grade[];
  messages: Message[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  addGrade: (grade: Omit<Grade, 'id' | 'gradedAt'>) => void;
  sendMessage: (message: Omit<Message, 'id' | 'sentAt' | 'read'>) => void;
  markMessageAsRead: (messageId: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      students: [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          grade: '10th Grade',
          parentEmail: 'parent.alice@example.com',
          overallGrade: 88,
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@example.com',
          grade: '10th Grade',
          parentEmail: 'parent.bob@example.com',
          overallGrade: 92,
        },
        {
          id: '3',
          name: 'Carol Davis',
          email: 'carol@example.com',
          grade: '10th Grade',
          parentEmail: 'parent.carol@example.com',
          overallGrade: 85,
        },
      ],
      tasks: [
        {
          id: '1',
          title: 'Math Assignment - Algebra',
          description: 'Complete exercises 1-20 from chapter 5',
          dueDate: '2024-07-20',
          subject: 'Mathematics',
          assignedTo: ['1', '2', '3'],
          createdBy: 'teacher1',
          createdAt: '2024-07-12',
        },
        {
          id: '2',
          title: 'Science Project - Solar System',
          description: 'Create a presentation about planets',
          dueDate: '2024-07-25',
          subject: 'Science',
          assignedTo: ['1', '2'],
          createdBy: 'teacher1',
          createdAt: '2024-07-10',
        },
      ],
      grades: [
        {
          id: '1',
          studentId: '1',
          taskId: '1',
          grade: 85,
          feedback: 'Good work! Pay attention to decimal places.',
          gradedBy: 'teacher1',
          gradedAt: '2024-07-13',
        },
      ],
      messages: [],
      addStudent: (student) =>
        set((state) => ({
          students: [...state.students, { ...student, id: Math.random().toString(36).substr(2, 9) }],
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString().split('T')[0],
            },
          ],
        })),
      addGrade: (grade) =>
        set((state) => ({
          grades: [
            ...state.grades,
            {
              ...grade,
              id: Math.random().toString(36).substr(2, 9),
              gradedAt: new Date().toISOString(),
            },
          ],
        })),
      sendMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Math.random().toString(36).substr(2, 9),
              sentAt: new Date().toISOString(),
              read: false,
            },
          ],
        })),
      markMessageAsRead: (messageId) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, read: true } : msg
          ),
        })),
    }),
    {
      name: 'data-storage',
    }
  )
);
