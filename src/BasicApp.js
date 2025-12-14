import React, { useState, useEffect } from 'react';

// Professional Task Management App
function BasicApp() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Design Homepage Layout', 
      description: 'Create wireframes and mockups for the new homepage design',
      status: 'todo', 
      priority: 'high',
      createdAt: new Date().toISOString(),
      dueDate: '2024-12-25'
    },
    { 
      id: 2, 
      title: 'Setup Database Connection', 
      description: 'Configure MySQL database and establish secure connections',
      status: 'inprogress', 
      priority: 'medium',
      createdAt: new Date().toISOString(),
      dueDate: '2024-12-20'
    },
    { 
      id: 3, 
      title: 'Write API Documentation', 
      description: 'Document all REST API endpoints with examples',
      status: 'completed', 
      priority: 'low',
      createdAt: new Date().toISOString(),
      dueDate: null
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium', 
    dueDate: '' 
  });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority,
        createdAt: new Date().toISOString(),
        dueDate: newTask.dueDate || null
      }]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
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

  const getTasksByStatus = (status) => {
    let filteredTasks = tasks.filter(task => task.status === status);
    
    // Apply priority filter
    if (filter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filter);
    }
    
    // Apply sorting
    filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    
    return filteredTasks;
  };

  const getTotalStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, progress };
  };

  const isOverdue = (task) => {
    return task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '0',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3b82f6',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    },
    brandText: {
      margin: 0,
      color: '#1e293b',
      fontSize: '24px',
      fontWeight: '700',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '14px',
      margin: '2px 0 0 0'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    filterSelect: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      color: '#374151',
      cursor: 'pointer',
      outline: 'none'
    },
    addButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    statsBar: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0'
    },
    statsContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '16px 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '24px',
      alignItems: 'center'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      color: '#64748b',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    progressContainer: {
      gridColumn: 'span 2'
    },
    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10b981',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '32px 24px'
    },
    board: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px'
    },
    column: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden'
    },
    columnHeader: {
      padding: '20px 24px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    columnTitle: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    taskCount: {
      backgroundColor: '#f1f5f9',
      color: '#475569',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600'
    },
    columnContent: {
      padding: '16px 24px 24px',
      minHeight: '400px'
    },
    task: {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative'
    },
    taskTitle: {
      margin: '0 0 8px 0',
      fontSize: '15px',
      fontWeight: '600',
      color: '#1e293b',
      lineHeight: '1.4'
    },
    taskDescription: {
      margin: '0 0 12px 0',
      fontSize: '13px',
      color: '#64748b',
      lineHeight: '1.4'
    },
    taskMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    priority: {
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    dueDate: {
      fontSize: '12px',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    actionButton: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '500px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
    },
    modalHeader: {
      padding: '24px 24px 0',
      borderBottom: 'none'
    },
    modalTitle: {
      margin: '0 0 8px 0',
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b'
    },
    modalSubtitle: {
      margin: 0,
      fontSize: '14px',
      color: '#64748b'
    },
    modalBody: {
      padding: '24px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '80px'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    modalFooter: {
      padding: '0 24px 24px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#64748b'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: 0.5
    },
    emptyText: {
      fontSize: '14px',
      margin: 0
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#fef2f2', color: '#dc2626', borderColor: '#fecaca' };
      case 'medium': return { backgroundColor: '#fffbeb', color: '#d97706', borderColor: '#fed7aa' };
      case 'low': return { backgroundColor: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' };
      default: return { backgroundColor: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' };
    }
  };

  const getColumnColor = (status) => {
    switch (status) {
      case 'todo': return '#64748b';
      case 'inprogress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#64748b';
    }
  };

  const stats = getTotalStats();

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.brandSection}>
            <div style={styles.logo}>🎯</div>
            <div>
              <h1 style={styles.brandText}>TaskBoard</h1>
              <p style={styles.subtitle}>Professional Task Management</p>
            </div>
          </div>
          
          <div style={styles.headerActions}>
            <select
              style={styles.filterSelect}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <select
              style={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="created">Sort by Created</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
            
            <button 
              style={styles.addButton}
              onClick={() => setShowModal(true)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <span>+</span>
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statsContent}>
          <div style={styles.statItem}>
            <div style={{ ...styles.statNumber, color: '#1e293b' }}>{stats.total}</div>
            <div style={styles.statLabel}>Total Tasks</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ ...styles.statNumber, color: '#64748b' }}>{getTasksByStatus('todo').length}</div>
            <div style={styles.statLabel}>To Do</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ ...styles.statNumber, color: '#3b82f6' }}>{getTasksByStatus('inprogress').length}</div>
            <div style={styles.statLabel}>In Progress</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ ...styles.statNumber, color: '#10b981' }}>{stats.completed}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={styles.progressContainer}>
            <div style={styles.progressLabel}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Overall Progress</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{stats.progress}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${stats.progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.board}>
          {/* To Do Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={{ ...styles.columnTitle, color: getColumnColor('todo') }}>
                📋 To Do
              </h3>
              <span style={styles.taskCount}>{getTasksByStatus('todo').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('todo').length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📝</div>
                  <p style={styles.emptyText}>No tasks to do</p>
                </div>
              ) : (
                getTasksByStatus('todo').map(task => (
                  <div 
                    key={task.id} 
                    style={{
                      ...styles.task,
                      borderLeft: isOverdue(task) ? '4px solid #dc2626' : '4px solid transparent'
                    }}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                    onMouseOut={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                  >
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    {task.description && (
                      <p style={styles.taskDescription}>{task.description}</p>
                    )}
                    <div style={styles.taskMeta}>
                      <span style={{ 
                        ...styles.priority, 
                        ...getPriorityColor(task.priority),
                        border: `1px solid ${getPriorityColor(task.priority).borderColor}`
                      }}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span style={{ 
                          ...styles.dueDate, 
                          color: isOverdue(task) ? '#dc2626' : '#64748b',
                          fontWeight: isOverdue(task) ? '600' : '400'
                        }}>
                          📅 {formatDate(task.dueDate)}
                          {isOverdue(task) && ' (Overdue)'}
                        </span>
                      )}
                    </div>
                    <div style={styles.taskActions}>
                      <button 
                        onClick={() => moveTask(task.id, 'inprogress')}
                        style={{ ...styles.actionButton, backgroundColor: '#3b82f6', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                      >
                        Start
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ ...styles.actionButton, backgroundColor: '#ef4444', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={{ ...styles.columnTitle, color: getColumnColor('inprogress') }}>
                ⚡ In Progress
              </h3>
              <span style={styles.taskCount}>{getTasksByStatus('inprogress').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('inprogress').length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>⚡</div>
                  <p style={styles.emptyText}>No tasks in progress</p>
                </div>
              ) : (
                getTasksByStatus('inprogress').map(task => (
                  <div 
                    key={task.id} 
                    style={{
                      ...styles.task,
                      borderLeft: '4px solid #3b82f6'
                    }}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                    onMouseOut={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                  >
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    {task.description && (
                      <p style={styles.taskDescription}>{task.description}</p>
                    )}
                    <div style={styles.taskMeta}>
                      <span style={{ 
                        ...styles.priority, 
                        ...getPriorityColor(task.priority),
                        border: `1px solid ${getPriorityColor(task.priority).borderColor}`
                      }}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span style={styles.dueDate}>
                          📅 {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                    <div style={styles.taskActions}>
                      <button 
                        onClick={() => moveTask(task.id, 'todo')}
                        style={{ ...styles.actionButton, backgroundColor: '#64748b', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#475569'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#64748b'}
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => moveTask(task.id, 'completed')}
                        style={{ ...styles.actionButton, backgroundColor: '#10b981', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        Complete
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ ...styles.actionButton, backgroundColor: '#ef4444', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={{ ...styles.columnTitle, color: getColumnColor('completed') }}>
                ✅ Completed
              </h3>
              <span style={styles.taskCount}>{getTasksByStatus('completed').length}</span>
            </div>
            <div style={styles.columnContent}>
              {getTasksByStatus('completed').length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🎉</div>
                  <p style={styles.emptyText}>No completed tasks</p>
                </div>
              ) : (
                getTasksByStatus('completed').map(task => (
                  <div 
                    key={task.id} 
                    style={{
                      ...styles.task,
                      borderLeft: '4px solid #10b981',
                      opacity: 0.8
                    }}
                    onMouseOver={(e) => {
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      e.target.style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      e.target.style.opacity = '0.8';
                    }}
                  >
                    <h4 style={{ ...styles.taskTitle, textDecoration: 'line-through' }}>{task.title}</h4>
                    {task.description && (
                      <p style={styles.taskDescription}>{task.description}</p>
                    )}
                    <div style={styles.taskMeta}>
                      <span style={{ 
                        ...styles.priority, 
                        ...getPriorityColor(task.priority),
                        border: `1px solid ${getPriorityColor(task.priority).borderColor}`
                      }}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span style={styles.dueDate}>
                          📅 {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                    <div style={styles.taskActions}>
                      <button 
                        onClick={() => moveTask(task.id, 'inprogress')}
                        style={{ ...styles.actionButton, backgroundColor: '#3b82f6', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                      >
                        Reopen
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ ...styles.actionButton, backgroundColor: '#ef4444', color: 'white' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Create New Task</h3>
              <p style={styles.modalSubtitle}>Add a new task to your board</p>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Task Title *</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Enter a descriptive task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Add more details about this task (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Priority Level</label>
                  <select
                    style={styles.select}
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">🌱 Low Priority</option>
                    <option value="medium">⚡ Medium Priority</option>
                    <option value="high">🔥 High Priority</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Due Date</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            </div>
            
            <div style={styles.modalFooter}>
              <button 
                style={{ 
                  ...styles.button, 
                  backgroundColor: '#f8fafc', 
                  color: '#64748b',
                  border: '1px solid #e2e8f0'
                }}
                onClick={() => setShowModal(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f8fafc'}
              >
                Cancel
              </button>
              <button 
                style={{ 
                  ...styles.button, 
                  backgroundColor: '#3b82f6', 
                  color: 'white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
                onClick={addTask}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
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