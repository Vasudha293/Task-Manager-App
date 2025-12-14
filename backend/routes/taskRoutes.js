const express = require('express');
const { body, validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Validation middleware
const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').isIn(['todo', 'inprogress', 'completed']).withMessage('Invalid status'),
  body('due_date').optional().isISO8601().withMessage('Invalid date format')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, handleValidationErrors, taskController.createTask);
router.put('/:id', validateTask, handleValidationErrors, taskController.updateTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;