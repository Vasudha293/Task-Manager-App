import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import { filterAndSortTasks } from '../utils/taskUtils';

const TaskBoard = ({ tasks, onEditTask, onDeleteTask, onStatusChange, filter, sortBy }) => {
  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'inprogress', title: 'In Progress', status: 'inprogress' },
    { id: 'completed', title: 'Completed', status: 'completed' }
  ];

  const filteredAndSortedTasks = filterAndSortTasks(tasks, filter, sortBy);

  const getTasksByStatus = (status) => {
    return filteredAndSortedTasks.filter(task => task.status === status);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    onStatusChange(parseInt(draggableId), newStatus);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Statistics Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
              <div className="text-sm text-gray-500 font-medium">Total Tasks</div>
            </div>
            <div className="text-center pl-6">
              <div className="text-2xl font-bold text-slate-600">{todoTasks}</div>
              <div className="text-sm text-gray-500 font-medium">To Do</div>
            </div>
            <div className="text-center pl-6">
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-gray-500 font-medium">In Progress</div>
            </div>
            <div className="text-center pl-6">
              <div className="text-2xl font-bold text-emerald-600">{completedTasks}</div>
              <div className="text-sm text-gray-500 font-medium">Completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Project Progress</span>
              <span className="text-sm font-semibold text-gray-900">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={getTasksByStatus(column.status)}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;