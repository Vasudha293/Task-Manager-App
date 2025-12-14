-- Task Management Database Schema
CREATE DATABASE IF NOT EXISTS trello_clone_app;
USE trello_clone_app;

-- Tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('todo', 'inprogress', 'completed') DEFAULT 'todo',
    due_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_due_date (due_date),
    INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO tasks (title, description, priority, status, due_date) VALUES
('Design Homepage Layout', 'Create wireframes and mockups for the new homepage design', 'high', 'todo', '2024-12-20'),
('Implement User Authentication', 'Set up login and registration functionality', 'high', 'inprogress', '2024-12-18'),
('Write Unit Tests', 'Add comprehensive test coverage for core components', 'medium', 'todo', '2024-12-25'),
('Update Documentation', 'Review and update API documentation', 'low', 'completed', NULL),
('Setup CI/CD Pipeline', 'Configure automated testing and deployment', 'medium', 'todo', '2024-12-22'),
('Optimize Database Queries', 'Review and improve slow database operations', 'high', 'inprogress', '2024-12-19');