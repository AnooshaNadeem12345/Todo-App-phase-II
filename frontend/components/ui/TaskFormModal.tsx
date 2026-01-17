'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard3D from '../3d/TaskCard3D';
import GlassCard from './GlassCard';

interface TaskFormModalProps {
  task?: Task | null;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<boolean>;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onClose, onSave }) => {
  const isEditing = !!task;
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>({
    title: task?.title || '',
    description: task?.description || '',
    completed: task?.completed || false,
    dueDate: task?.dueDate || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Update form data when task prop changes
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false,
        dueDate: task.dueDate || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false,
        dueDate: '',
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (formData.dueDate && isNaN(Date.parse(formData.dueDate))) {
      newErrors.dueDate = 'Invalid date format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSaving(true);
    try {
      const success = await onSave(formData);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-4xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-black/20 border ${
                      errors.title ? 'border-red-500' : 'border-white/30'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Task title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-red-400 text-sm">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Task description"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-black/20 border ${
                      errors.dueDate ? 'border-red-500' : 'border-white/30'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-red-400 text-sm">{errors.dueDate}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5 rounded"
                  />
                  <label className="font-medium">Mark as completed</label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
              
              {/* 3D Preview Section */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4">3D Preview</h3>
                <div className="w-full h-64 bg-black/20 rounded-lg flex items-center justify-center">
                  <TaskCard3D
                    task={{
                      id: 'preview',
                      title: formData.title || 'New Task',
                      description: formData.description,
                      completed: formData.completed,
                      dueDate: formData.dueDate,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      userId: 'preview'
                    }}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onToggleComplete={() => {}}
                  />
                </div>
                <p className="mt-4 text-gray-400 text-sm text-center">
                  This is a preview of how your task will appear in 3D
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskFormModal;