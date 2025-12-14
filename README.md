# Task Management Web Application

A modern task management application similar to Trello, built with React, Tailwind CSS, and MySQL.

## Features

- **Drag & Drop Interface**: Move tasks between columns (To-Do, In-Progress, Completed)
- **Task Management**: Create, edit, delete, and organize tasks
- **Priority System**: High, Medium, Low priority levels with color coding
- **Due Date Tracking**: Set due dates and get overdue notifications
- **Filtering & Sorting**: Filter by priority and sort by date, priority, or creation time
- **Duplicate Detection**: Automatically detect and flag duplicate tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Beautiful DnD** - Drag and drop functionality
- **Axios** - HTTP client for API calls
- **Date-fns** - Date manipulation library

### Backend
- **Node.js & Express** - RESTful API server
- **MySQL** - Relational database
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## Project Structure

```
task-management-app/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar with filters
│   │   ├── TaskBoard.js       # Main board with drag-drop
│   │   ├── TaskColumn.js      # Individual columns
│   │   ├── TaskCard.js        # Task cards with actions
│   │   └── TaskModal.js       # Create/edit task modal
│   ├── services/
│   │   └── taskService.js     # API service layer
│   ├── utils/
│   │   └── taskUtils.js       # Utility functions
│   └── App.js                 # Main application component
├── backend/
│   ├── controllers/
│   │   └── taskController.js  # API controllers
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── config/
│   │   └── database.js        # Database configuration
│   └── server.js              # Express server
└── database/
    └── schema.sql             # MySQL database schema
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Database Setup

1. **Install MySQL** and create a database:
```sql
CREATE DATABASE trello_clone_app;
```

2. **Run the schema** to create tables:
```bash
mysql -u root -p trello_clone_app < database/schema.sql
```

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
cp .env.example .env
```

4. **Configure database connection** in `.env`:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=trello_clone_app
```

5. **Start the backend server**:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to project root**:
```bash
cd ..
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filtering)
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status (for drag-drop)
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters
- `priority` - Filter by priority (low, medium, high)
- `status` - Filter by status (todo, inprogress, completed)
- `sort` - Sort by (created, due_date, priority)

## Usage

### Creating Tasks
1. Click the "New Task" button in the navigation
2. Fill in the task details (title, description, priority, due date)
3. Click "Create Task"

### Managing Tasks
- **Edit**: Click the pencil icon on any task card
- **Delete**: Click the trash icon on any task card
- **Move**: Drag tasks between columns to change status
- **Filter**: Use the priority filter in the navigation
- **Sort**: Use the sort dropdown to organize tasks

### Features in Detail

#### Drag & Drop
Tasks can be dragged between the three columns:
- **To-Do**: New tasks waiting to be started
- **In-Progress**: Tasks currently being worked on
- **Completed**: Finished tasks

#### Priority System
- **High Priority**: Red badge, urgent tasks
- **Medium Priority**: Yellow badge, normal tasks
- **Low Priority**: Green badge, non-urgent tasks

#### Due Date Management
- Tasks show due dates in a readable format
- Overdue tasks are highlighted in red
- Tasks without due dates don't show date information

#### Duplicate Detection
- Tasks with identical titles are automatically flagged
- Duplicate badge appears on affected tasks
- Helps maintain task organization

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Code Structure

The application follows a component-based architecture:

- **App.js**: Main application state and API integration
- **Components**: Reusable UI components with specific responsibilities
- **Services**: API communication layer
- **Utils**: Helper functions for filtering, sorting, and data manipulation

### Styling
- Tailwind CSS for responsive design
- Custom color scheme with primary blue theme
- Mobile-first responsive approach
- Consistent spacing and typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.