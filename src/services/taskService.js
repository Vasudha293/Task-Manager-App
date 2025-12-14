// Mock service for demonstration - replace with actual API calls
class TaskService {
  constructor() {
    this.tasks = this.loadFromLocalStorage();
    this.nextId = this.getNextId();
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      return JSON.parse(stored);
    }
    // Default sample tasks
    return [
      {
        id: 1,
        title: 'Design Homepage Layout',
        description: 'Create wireframes and mockups for the new homepage design',
        priority: 'high',
        status: 'todo',
        dueDate: '2024-12-20',
        createdAt: '2024-12-14T10:00:00Z'
      },
      {
        id: 2,
        title: 'Implement User Authentication',
        description: 'Set up login and registration functionality',
        priority: 'high',
        status: 'inprogress',
        dueDate: '2024-12-18',
        createdAt: '2024-12-13T14:30:00Z'
      },
      {
        id: 3,
        title: 'Write Unit Tests',
        description: 'Add comprehensive test coverage for core components',
        priority: 'medium',
        status: 'todo',
        dueDate: '2024-12-25',
        createdAt: '2024-12-12T09:15:00Z'
      },
      {
        id: 4,
        title: 'Update Documentation',
        description: 'Review and update API documentation',
        priority: 'low',
        status: 'completed',
        dueDate: null,
        createdAt: '2024-12-10T16:45:00Z'
      }
    ];
  }

  getNextId() {
    return Math.max(...this.tasks.map(t => t.id), 0) + 1;
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  async getAllTasks() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.tasks];
  }

  async createTask(taskData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newTask = {
      id: this.nextId++,
      ...taskData,
      createdAt: new Date().toISOString()
    };
    
    this.tasks.push(newTask);
    this.saveToLocalStorage();
    return newTask;
  }

  async updateTask(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...taskData };
      this.saveToLocalStorage();
      return this.tasks[index];
    }
    throw new Error('Task not found');
  }

  async updateTaskStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.status = status;
      this.saveToLocalStorage();
      return task;
    }
    throw new Error('Task not found');
  }

  async deleteTask(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const deletedTask = this.tasks.splice(index, 1)[0];
      this.saveToLocalStorage();
      return deletedTask;
    }
    throw new Error('Task not found');
  }
}

export const taskService = new TaskService();