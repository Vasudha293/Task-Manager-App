export const filterAndSortTasks = (tasks, filter, sortBy) => {
  let filteredTasks = [...tasks];

  // Apply filter
  if (filter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === filter);
  }

  // Apply sorting
  filteredTasks.sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      
      case 'created':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Check for duplicates
  const taskTitles = {};
  filteredTasks.forEach(task => {
    const title = task.title.toLowerCase().trim();
    if (taskTitles[title]) {
      task.isDuplicate = true;
      taskTitles[title].isDuplicate = true;
    } else {
      taskTitles[title] = task;
    }
  });

  return filteredTasks;
};

export const generateTaskId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};