import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-all duration-200 ${
            snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : 'shadow-sm'
          } ${isOverdue ? 'ring-2 ring-red-200' : ''}`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-gray-900 text-base leading-tight flex-1 pr-2">
              {task.title}
            </h4>
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Description */}
          {task.description && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
              {task.description}
            </p>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={`text-xs font-medium ${
                  isOverdue ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {format(new Date(task.dueDate), 'MMM dd')}
                </span>
              </div>
            )}
          </div>
          
          {/* Duplicate Warning */}
          {task.isDuplicate && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Duplicate task detected</span>
            </div>
          )}
          
          {/* Overdue Warning */}
          {isOverdue && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-md border border-red-200">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>Task is overdue</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;