// API service functions for task operations
import { Task } from '@/types/task';
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';

/**
 * Fetch all tasks for the authenticated user
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiGet('/tasks');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.tasks || [];
};

/**
 * Create a new task
 */
export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Task> => {
  const response = await apiPost('/tasks', taskData);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to create task: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Update an existing task
 */
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await apiPut(`/tasks/${id}`, taskData);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update task: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Delete a task
 */
export const deleteTask = async (id: string): Promise<void> => {
  const response = await apiDelete(`/tasks/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to delete task: ${response.status} ${response.statusText}`);
  }
};

/**
 * Toggle task completion status
 */
export const toggleTaskCompletion = async (id: string, completed: boolean): Promise<Task> => {
  const response = await apiPut(`/tasks/${id}`, { completed });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update task: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
};