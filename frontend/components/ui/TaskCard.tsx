import React from 'react';
import { Task } from '@/types/task';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <GlassCard className="p-4 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleComplete}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-400 hover:border-gray-600'
              }`}
            >
              {task.completed && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>
            <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
          </div>
        </div>
        
        {task.description && (
          <p className="mt-2 text-gray-300">{task.description}</p>
        )}
        
        {task.dueDate && (
          <p className="mt-2 text-sm text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TaskCard;