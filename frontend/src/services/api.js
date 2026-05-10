// API Base URL - Update this to match your backend location
const API_BASE = 'http://backendhost.free.nf';

// Helper function to handle API responses and errors
async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.error || errorMessage);
    } else {
      // Handle non-JSON responses (like HTML error pages)
      const text = await response.text();
      if (text.includes('Connection') || text.includes('Cannot connect') || response.status === 0) {
        throw new Error('Cannot connect to backend server. Please ensure the backend is running.');
      } else {
        throw new Error(`${errorMessage}: ${response.status} ${response.statusText}`);
      }
    }
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Expected JSON response but received: ${text.substring(0, 100)}...`);
  }
}

// API service for user management
export const userAPI = {
  // Register a new user
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      return await handleResponse(response, 'Registration failed');
    } catch (error) {
      throw error;
    }
  },

  // Bulk operations
  async bulkDelete(userIds) {
    try {
      const response = await fetch(`${API_BASE}/bulk_operations.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          userIds: userIds
        }),
      });
      
      return await handleResponse(response, 'Delete failed');
    } catch (error) {
      throw error;
    }
  },

  async bulkUpdateStatus(userIds, status) {
    try {
      const response = await fetch(`${API_BASE}/bulk_operations.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateStatus',
          userIds: userIds,
          status: status
        }),
      });
      
      return await handleResponse(response, 'Status update failed');
    } catch (error) {
      throw error;
    }
  },

  async bulkUpdateRole(userIds, role) {
    try {
      const response = await fetch(`${API_BASE}/bulk_operations.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateRole',
          userIds: userIds,
          role: role
        }),
      });
      
      return await handleResponse(response, 'Role update failed');
    } catch (error) {
      throw error;
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const result = await handleResponse(response, 'Login failed');
      
      // Store user data on successful login
      if (result.success && result.user) {
        this.storeUser(result.user);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get users with optional role filter
  async getUsers(roleFilter = null) {
    try {
      const url = roleFilter ? 
        `${API_BASE}/users.php?role=${roleFilter}` : 
        `${API_BASE}/users.php`;
      
      const response = await fetch(url);
      
      return await handleResponse(response, 'Failed to fetch users');
    } catch (error) {
      throw error;
    }
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout user
  logout() {
    localStorage.removeItem('user');
  },

  // Store user in localStorage
  storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export default userAPI;
