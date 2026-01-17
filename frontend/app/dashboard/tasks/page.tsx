'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import TaskCard3D from '@/components/3d/TaskCard3D';
import TaskFormModal from '@/components/ui/TaskFormModal';
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import Spinner3D from '@/components/3d/Spinner3D';
import { toast } from 'sonner';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await apiGet('/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks || []);
        } else {
          toast.error('Failed to load tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error loading tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Handle creating a new task
  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      const response = await apiPost('/tasks', taskData);
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        toast.success('Task created successfully');
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to create task');
        return false;
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task');
      return false;
    }
  };

  // Handle updating a task
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await apiPut(`/tasks/${updatedTask.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
        dueDate: updatedTask.dueDate
      });
      
      if (response.ok) {
        const updatedTaskData = await response.json();
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTaskData : t));
        toast.success('Task updated successfully');
        setEditingTask(null);
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update task');
        return false;
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
      return false;
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await apiDelete(`/tasks/${taskId}`);
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  // Handle toggling task completion
  const handleToggleComplete = async (task: Task) => {
    try {
      const response = await apiPut(`/tasks/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
        toast.success(`Task marked as ${updatedTask.completed ? 'complete' : 'incomplete'}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update task status');
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast.error('Error updating task status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner3D size={1.5} color="#6366f1" speed={2} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <div className="flex space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
            className="bg-black/20 border border-white/30 rounded-lg px-4 py-2"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Add Task
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No tasks found. Create your first task!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard3D
              key={task.id}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleComplete={() => handleToggleComplete(task)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskFormModal
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSave={(taskData) => {
            if (editingTask) {
              return handleUpdateTask({ ...editingTask, ...taskData });
            } else {
              return handleCreateTask(taskData);
            }
          }}
        />
      )}
    </div>
  );
}