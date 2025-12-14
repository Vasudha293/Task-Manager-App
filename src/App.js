import React, { useState, useEffect } from 'react';

// Import components at the top level
import Navbar from './components/Navbar';
import TaskBoard from './components/TaskBoard';
import TaskModal from './components/TaskModal';
import { taskService } from './services/taskService';

function App() {
  console.log('🚀 App component rendering');
  
  // Always call hooks at the top level
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [componentsLoaded, setComponentsLoaded] = useState(true);

  useEffect(() => {
    // Check if components are available and load tasks
    try {
      loadTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
      setComponentsLoaded(false);
    }
  }, []);

  // If components failed to load, show fallback
  if (!componentsLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h1 style={{ color: '#333', marginBottom: '20px' }}>
            🎯 TaskBoard
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Task Management Application
          </p>
          <p style={{ color: '#888', fontSize: '14px' }}>
            Components are loading... Please refresh the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const loadTasks = async () => {
    try {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      await loadTasks();
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      await loadTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onCreateTask={handleCreateTask}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <TaskBoard 
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onStatusChange={handleStatusChange}
        filter={filter}
        sortBy={sortBy}
      />
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;