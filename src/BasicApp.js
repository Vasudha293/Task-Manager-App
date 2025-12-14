import React, { useState } from 'react';

// Basic Task Management App without external dependencies
function BasicApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Homepage', status: 'todo', priority: 'high' },
    { id: 2, title: 'Setup Database', status: 'inprogress', priority: 'medium' },
    { id: 3, title: 'Write Documentation', status: 'completed', priority: 'low' }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        status: 'todo',
        priority: newTask.priority
      }]);
      setNewTask({ title: '', priority: 'medium' });
      setShowModal(false);
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '20px',
      borderBottom: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
      margin: 0,
      color: '#333',
      fontSize: '24px',
      display: 'inline-block'
    },
    addButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      float: 'right',
      fontSize: '14px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    board: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    column: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    columnTitle: {
      margin: '0 0 15px 0',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    task: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      padding: '15px',
      marginBottom: '10px',
      cursor: 'pointer'
    },
    taskTitle: {
      margin: '0 0 5px 0',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    priority: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '90vw'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '14px'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '14px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#ffebee', color: '#c62828' };
      case 'medium': return { backgroundColor: '#fff3e0', color: '#ef6c00' };
      case 'low': return { backgroundColor: '#e8f5e8', color: '#2e7d32' };
      default: return { backgroundColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.container}>
          <h1 style={styles.title}>🎯 TaskBoard - Task Management</h1>
          <button 
            style={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.board}>
          {/* To Do Column */}
          <div style={styles.column}>
            <h3 style={{ ...styles.columnTitle, color: '#6c757d' }}>📋 To Do ({getTasksByStatus('todo').length})</h3>
            {getTasksByStatus('todo').map(task => (
              <div key={task.id} style={styles.task}>
                <h4 style={styles.taskTitle}>{task.title}</h4>
                <span style={{ ...styles.priority, ...getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => moveTask(task.id, 'inprogress')}
                    style={{ ...styles.button, backgroundColor: '#28a745', color: 'white', marginRight: '5px' }}
                  >
                    Start
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ ...styles.button, backgroundColor: '#dc3545', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* In Progress Column */}
          <div style={styles.column}>
            <h3 style={{ ...styles.columnTitle, color: '#007bff' }}>⚡ In Progress ({getTasksByStatus('inprogress').length})</h3>
            {getTasksByStatus('inprogress').map(task => (
              <div key={task.id} style={styles.task}>
                <h4 style={styles.taskTitle}>{task.title}</h4>
                <span style={{ ...styles.priority, ...getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => moveTask(task.id, 'todo')}
                    style={{ ...styles.button, backgroundColor: '#6c757d', color: 'white', marginRight: '5px' }}
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => moveTask(task.id, 'completed')}
                    style={{ ...styles.button, backgroundColor: '#28a745', color: 'white', marginRight: '5px' }}
                  >
                    Complete
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ ...styles.button, backgroundColor: '#dc3545', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Column */}
          <div style={styles.column}>
            <h3 style={{ ...styles.columnTitle, color: '#28a745' }}>✅ Completed ({getTasksByStatus('completed').length})</h3>
            {getTasksByStatus('completed').map(task => (
              <div key={task.id} style={styles.task}>
                <h4 style={styles.taskTitle}>{task.title}</h4>
                <span style={{ ...styles.priority, ...getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => moveTask(task.id, 'inprogress')}
                    style={{ ...styles.button, backgroundColor: '#007bff', color: 'white', marginRight: '5px' }}
                  >
                    Reopen
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ ...styles.button, backgroundColor: '#dc3545', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Create New Task</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <select
              style={styles.select}
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div style={styles.buttonGroup}>
              <button 
                style={{ ...styles.button, backgroundColor: '#6c757d', color: 'white' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{ ...styles.button, backgroundColor: '#007bff', color: 'white' }}
                onClick={addTask}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasicApp;