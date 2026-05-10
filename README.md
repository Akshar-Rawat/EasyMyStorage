# Easy My Storage - RBAC User Management System

A comprehensive Role-Based Access Control (RBAC) user management system built with React frontend and PHP backend.

## Project Structure

### Frontend (React + Vite + TailwindCSS)
```
aether-rbac/frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AddUserModal.jsx          # Add new user modal
│   │   ├── Auth.jsx                  # Authentication component
│   │   ├── BulkActions.jsx           # Bulk selection actions toolbar
│   │   ├── BulkEditModal.jsx        # Bulk edit users modal
│   │   ├── DataTable.jsx            # Users data table
│   │   ├── Navigation.jsx            # Responsive navigation (desktop sidebar + mobile bottom nav)
│   │   ├── TopNavBar.jsx            # Top navigation bar
│   │   ├── UserActionsDropdown.jsx  # Individual user actions dropdown
│   │   └── UserManagement.jsx       # Main user management component
│   ├── services/
│   │   └── api.js                   # API service layer
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── App.css                     # App-specific styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

### Backend (PHP + MySQL)
```
EasyMyStorage/backend/
├── config.php              # Database configuration
├── db.sql                 # Database schema
├── helpers.php             # Utility functions
├── login.php               # User authentication endpoint
├── register.php            # User registration endpoint
├── users.php               # Get users endpoint
└── bulk_operations.php      # Bulk operations endpoint
```

##  Features

### Core Functionality
- **User Authentication**: Login/logout with session management
- **User Management**: Add, edit, delete users
- **Role-Based Access Control**: Admin and User roles
- **Bulk Operations**: Select multiple users for batch operations
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic UI updates without page refresh

### Frontend Features
- **Modern UI**: Material Design inspired with TailwindCSS
- **Responsive Navigation**: Desktop sidebar + mobile bottom navigation
- **Interactive Tables**: Sortable, filterable user data table
- **Modal Dialogs**: Clean, accessible modal forms
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Comprehensive error display and recovery

### Backend Features
- **RESTful API**: Clean JSON endpoints
- **Security**: Password hashing, input validation, CORS
- **Database**: MySQL with proper relationships
- **Error Handling**: Structured error responses
- **Validation**: Server-side input sanitization

## 🛠️ Technology Stack

### Frontend
- **React 19.2.5**: Modern React with hooks
- **Vite 8.0.10**: Fast development build tool
- **TailwindCSS 3.4.19**: Utility-first CSS framework
- **Material Symbols**: Google's icon font
- **ESLint**: Code quality and consistency

### Backend
- **PHP 8.x**: Server-side scripting
- **MySQL**: Relational database
- **PDO**: Database abstraction layer
- **JSON API**: RESTful response format

## 📡 API Endpoints

### Authentication
```http
POST /backend/login.php
POST /backend/register.php
```

### User Management
```http
GET  /backend/users.php?role={role}
POST /backend/bulk_operations.php (delete)
POST /backend/bulk_operations.php (updateStatus)
POST /backend/bulk_operations.php (updateRole)
```

### Request/Response Format
```json
// Login Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Success Response
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "admin"
  }
}

// Error Response
{
  "error": "Invalid email or password"
}
```

##  Database Schema

```sql
CREATE DATABASE IF NOT EXISTS user_management;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Quick Start

### Prerequisites
- **Node.js 16+** and npm
- **XAMPP** or similar PHP/MySQL environment
- **Modern browser** with ES6+ support

### Frontend Setup
```bash
# Navigate to frontend directory
cd aether-rbac/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at:
# http://localhost:5173
```

### Backend Setup
```bash
# Navigate to backend directory in XAMPP htdocs
cd /path/to/xampp/htdocs/EasyMyStorage/backend

# Import database schema
mysql -u root -p < db.sql

# Configure Apache/MySQL in XAMPP Control Panel
# Backend will be available at:
# http://localhost/EasyMyStorage/backend/
```

##  Configuration

### Frontend Configuration
- **API Base URL**: Configure in `src/services/api.js`
```javascript
const API_BASE = 'http://localhost/EasyMyStorage/backend';
```

### Backend Configuration
- **Database**: Update credentials in `backend/config.php`
```php
$host = 'localhost';
$dbname = 'user_management';
$username = 'root';
$password = '';
```

##  UI Components

### Navigation System
- **Desktop**: Fixed sidebar with navigation menu
- **Mobile**: Bottom navigation bar with icon-based menu
- **Responsive**: Automatic switching based on screen size

### User Management
- **Data Table**: Sortable columns, row selection
- **Bulk Actions**: Multi-select with batch operations
- **User Actions**: Individual user edit/delete
- **Add/Edit Forms**: Modal-based user creation and editing

### Authentication Flow
1. **Login**: Email/password authentication
2. **Session**: Server-side session management
3. **Authorization**: Role-based access control
4. **Logout**: Session cleanup and redirect

## 🔒 Security Features

### Frontend Security
- **Input Validation**: Client-side form validation
- **XSS Prevention**: React's built-in protection
- **CSRF Protection**: Token-based API calls

### Backend Security
- **Password Hashing**: bcrypt for secure storage
- **Input Sanitization**: PDO prepared statements
- **CORS Headers**: Proper cross-origin handling
- **Session Management**: Secure session handling

## 🐛 Troubleshooting

### Common Issues

#### Frontend Issues
- **Modal not centered**: Check CSS positioning classes
- **API errors**: Verify backend server is running
- **Font loading**: Ensure Google Fonts access

#### Backend Issues
- **Database connection**: Check XAMPP services
- **CORS errors**: Verify headers in helpers.php
- **404 errors**: Check Apache configuration

### Development Tips
- **Hot reload**: Vite provides instant updates
- **Console errors**: Check browser dev tools
- **Network tab**: Monitor API calls in dev tools

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (bottom navigation)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (sidebar navigation)

### Mobile Optimizations
- **Touch-friendly**: Larger tap targets
- **Bottom navigation**: Easy thumb access
- **Compact tables**: Horizontal scrolling on small screens

## 🔄 Development Workflow

### Code Organization
- **Component-based**: Modular React components
- **Service layer**: Centralized API calls
- **Consistent styling**: TailwindCSS utility classes
- **Error boundaries**: Graceful error handling

### Best Practices
- **Semantic HTML**: Proper element usage
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimization
- **Code quality**: ESLint and modern JavaScript

## 📈 Future Enhancements

### Planned Features
- **User Profiles**: Extended user information
- **Activity Logs**: Audit trail functionality
- **Role Management**: Dynamic role creation
- **API Pagination**: Large dataset handling
- **Export Features**: CSV/PDF data export

### Performance Improvements
- **Code Splitting**: Reduce bundle size
- **Image Optimization**: Lazy loading
- **Caching Strategy**: Browser and server caching
- **Database Indexing**: Query optimization

## 👤 Submitted By
- **Name**: Akshar Rawat
- **Date**: May 2026