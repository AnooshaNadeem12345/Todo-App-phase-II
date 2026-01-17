// Types for the 3D Todo Frontend application

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  preferences?: {
    theme?: 'light' | 'dark';
    [key: string]: any;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  userId: string; // Foreign key linking to the user who owns the task
}