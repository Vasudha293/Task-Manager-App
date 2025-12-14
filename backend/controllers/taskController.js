const db = require('../config/database');

const taskController = {
  // Get all tasks
  async getAllTasks(req, res) {
    try {
      const { priority, status, sort } = req.query;
      
      let query = 'SELECT * FROM tasks WHERE 1=1';
      const params = [];

      if (priority) {
        query += ' AND priority = ?';
        params.push(priority);
      }

      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }

      // Sorting
      switch (sort) {
        case 'due_date':
          query += ' ORDER BY due_date ASC, created_at DESC';
          break;
        case 'priority':
          query += ' ORDER BY FIELD(priority, "high", "medium", "low"), created_at DESC';
          break;
        default:
          query += ' ORDER BY created_at DESC';
      }

      const [rows] = await db.execute(query, params);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  },

  // Get task by ID
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  },

  // Create new task
  async createTask(req, res) {
    try {
      const { title, description, priority, status, due_date } = req.body;
      
      const [result] = await db.execute(
        'INSERT INTO tasks (title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?)',
        [title, description || null, priority || 'medium', status || 'todo', due_date || null]
      );

      const [newTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
      res.status(201).json(newTask[0]);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  // Update task
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, priority, status, due_date } = req.body;

      const [result] = await db.execute(
        'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ?',
        [title, description || null, priority, status, due_date || null, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const [updatedTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
      res.json(updatedTask[0]);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  },

  // Update task status (for drag and drop)
  async updateTaskStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['todo', 'inprogress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const [result] = await db.execute(
        'UPDATE tasks SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const [updatedTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
      res.json(updatedTask[0]);
    } catch (error) {
      console.error('Error updating task status:', error);
      res.status(500).json({ error: 'Failed to update task status' });
    }
  },

  // Delete task
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      
      const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};

module.exports = taskController;