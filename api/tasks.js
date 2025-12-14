const express = require('express');
const cors = require('cors');
const taskRoutes = require('../backend/routes/taskRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Task Management API is running' });
});

module.exports = app;