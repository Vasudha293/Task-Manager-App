import React, { useState } from 'react';

// Exact replica of the TaskBoard UI from the image
function BasicApp() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Design Homepage Layout', 
      description: 'Create wireframes and mockups for the new homepage design',
      status: 'todo', 
      priority: 'high',
      dueDate: 'Dec 20'
    },
    { 
      id: 2, 
      title: 'Implement User Authentication', 
      description: 'Set up login and registration functionality',
      status: 'inprogress', 
      priority: 'high',
      dueDate: 'Dec 18'
    },
    { 
      id: 3, 
      title: 'Update Documentation', 
      description: 'Review and update API documentation',
      status: 'completed', 
      priority: 'low',
      dueDate: null
    },
    { 
      id: 4, 
      title: 'Write Unit Tests', 
      description: 'Add comprehensive test coverage for core components',
      status: 'todo', 
      priority: 'medium',
      dueDate: null
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium'
  });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority,
        dueDate: null
      }]);
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowModal(false);
    }
  };



  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getTotalStats = () => {
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'inprogress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, todo, inProgress, completed, progress };
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#f7f8fc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '32px',
      height: '32px',
      backgroundColor: '#4285f4',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    brandText: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      margin: '2px 0 0 0'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    filterButton: {
      padding: '8px 16px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: 'white',
      fontSize: '14px',
      color: '#666',
      cursor: 'pointer'
    },
    newTaskButton: {
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    statsSection: {
      backgroundColor: 'white',
      padding: '32px 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    },
    statItem: {
      textAlign: 'center',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: '#1a1a1a'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
      margin: 0,
      whiteSpace: 'nowrap'
    },
    divider: {
      width: '1px',
      height: '60px',
      backgroundColor: '#e0e0e0',
      margin: '0 8px'
    },
    progressSection: {
      textAlign: 'right',
      minWidth: '220px',
      flex: '0 0 220px'
    },
    progressLabel: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
      textAlign: 'left'
    },
    progressBar: {
      width: '200px',
      height: '8px',
      backgroundColor: '#e8f0fe',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '4px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#34a853',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    progressPercent: {
      fontSize: '14px',
      color: '#1a1a1a',
      fontWeight: '500',
      textAlign: 'right'
    },
    container: {
      padding: '32px 40px'
    },
    board: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '24px'
    },
    column: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    columnHeader: {
      padding: '20px 24px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    columnTitle: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#1a1a1a',
      margin: 0
    },
    taskCount: {
      fontSize: '14px',
      color: '#666'
    },
    columnContent: {
      padding: '16px 24px 24px'
    },
    task: {
      border: '1px solid #f0f0f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: 'white'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    taskTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1a1a1a',
      margin: 0,
      flex: 1
    },
    taskActions: {
      display: 'flex',
      gap: '8px'
    },
    taskAction: {
      width: '20px',
      height: '20px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#666'
    },
    taskDescription: {
      fontSize: '12px',
      color: '#666',
      lineHeight: '1.4',
      marginBottom: '12px'
    },
    taskFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    priorityBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    dueDate: {
      fontSize: '12px',
      color: '#666'
    },
    overdue: {
      color: '#ea4335',
      fontWeight: '500'
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
      borderRadius: '8px',
      padding: '24px',
      width: '400px',
      maxWidth: '90vw'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#1a1a1a'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#1a1a1a',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      minHeight: '80px',
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },
    cancelButton: {
      padding: '10px 20px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: 'white',
      color: '#666',
      fontSize: '14px',
      cursor: 'pointer'
    },
    createButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#4285f4',
      color: 'white',
      fontSize: '14px',
      cursor: 'pointer'
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#fce8e6', color: '#d73027' };
      case 'medium': return { backgroundColor: '#fff4e6', color: '#f57c00' };
      case 'low': return { backgroundColor: '#e8f5e8', color: '#2e7d32' };
      default: return { backgroundColor: '#f5f5f5', color: '#666' };
    }
  };

  const stats = getTotalStats();

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.brandSection}>
          <div style={styles.logo}>📋</div>
          <div>
            <h1 style={styles.brandText}>TaskBoard</h1>
            <p style={styles.subtitle}>Project Management</p>
          </div>
        </div>
        
        <div style={styles.headerActions}>
          <button style={styles.filterButton}>All Priority</button>
          <button style={styles.filterButton}>Recently Created</button>
          <button 
            style={styles.newTaskButton}
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.total}</div>
          <div style={styles.statLabel}>Total Tasks</div>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.todo}</div>
          <div style={styles.statLabel}>To Do</div>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.inProgress}</div>
          <div style={styles.statLabel}>In Progress</div>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.completed}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
      </div>

      {/* Task Board */}
      <div style={styles.container}>
        <div style={styles.board}>
          {/* To Do Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}>To Do</h3>
              <span style={styles.taskCount}>{getTasksByStatus('todo').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('todo').map(task => (
                <div key={task.id} style={styles.task}>
                  <div style={styles.taskHeader}>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    <div style={styles.taskActions}>
                      <button style={styles.taskAction}>📝</button>
                      <button style={styles.taskAction} onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                  </div>
                  <p style={styles.taskDescription}>{task.description}</p>
                  <div style={styles.taskFooter}>
                    <span style={{ 
                      ...styles.priorityBadge, 
                      ...getPriorityColor(task.priority) 
                    }}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span style={styles.dueDate}>📅 {task.dueDate}</span>
                    )}
                  </div>
                  {task.status === 'todo' && task.dueDate === 'Dec 20' && (
                    <div style={{ ...styles.dueDate, ...styles.overdue, marginTop: '8px' }}>
                      ⚠️ Task is overdue
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}>In Progress</h3>
              <span style={styles.taskCount}>{getTasksByStatus('inprogress').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('inprogress').map(task => (
                <div key={task.id} style={styles.task}>
                  <div style={styles.taskHeader}>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    <div style={styles.taskActions}>
                      <button style={styles.taskAction}>📝</button>
                      <button style={styles.taskAction} onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                  </div>
                  <p style={styles.taskDescription}>{task.description}</p>
                  <div style={styles.taskFooter}>
                    <span style={{ 
                      ...styles.priorityBadge, 
                      ...getPriorityColor(task.priority) 
                    }}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span style={styles.dueDate}>📅 {task.dueDate}</span>
                    )}
                  </div>
                  {task.status === 'inprogress' && task.dueDate === 'Dec 18' && (
                    <div style={{ ...styles.dueDate, ...styles.overdue, marginTop: '8px' }}>
                      ⚠️ Past overdue
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}>Completed</h3>
              <span style={styles.taskCount}>{getTasksByStatus('completed').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('completed').map(task => (
                <div key={task.id} style={styles.task}>
                  <div style={styles.taskHeader}>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    <div style={styles.taskActions}>
                      <button style={styles.taskAction}>📝</button>
                      <button style={styles.taskAction} onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                  </div>
                  <p style={styles.taskDescription}>{task.description}</p>
                  <div style={styles.taskFooter}>
                    <span style={{ 
                      ...styles.priorityBadge, 
                      ...getPriorityColor(task.priority) 
                    }}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Create New Task</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Task Title</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                style={styles.textarea}
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>
              <select
                style={styles.select}
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.createButton}
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