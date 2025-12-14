import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ column, tasks, onEditTask, onDeleteTask }) => {
  const getColumnStyle = (status) => {
    switch (status) {
      case 'todo':
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          header: 'text-slate-700',
          count: 'bg-slate-100 text-slate-600',
          dragOver: 'bg-slate-100'
        };
      case 'inprogress':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          header: 'text-blue-700',
          count: 'bg-blue-100 text-blue-600',
          dragOver: 'bg-blue-100'
        };
      case 'completed':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          header: 'text-emerald-700',
          count: 'bg-emerald-100 text-emerald-600',
          dragOver: 'bg-emerald-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          header: 'text-gray-700',
          count: 'bg-gray-100 text-gray-600',
          dragOver: 'bg-gray-100'
        };
    }
  };

  const style = getColumnStyle(column.status);

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-semibold text-lg ${style.header}`}>{column.title}</h3>
        <span className={`${style.count} text-xs font-medium px-3 py-1 rounded-full`}>
          {tasks.length}
        </span>
      </div>
      
      <Droppable droppableId={column.status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] space-y-4 transition-colors ${
              snapshot.isDraggingOver ? style.dragOver : ''
            }`}
          >
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">No tasks</p>
                <p className="text-xs text-gray-400 mt-1">Drag tasks here</p>
              </div>
            )}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;