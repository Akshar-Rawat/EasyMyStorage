const API_BASE = 'https://easymystorage-production.up.railway.app';

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.error || errorMessage);
    } else {
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

export const userAPI = {
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

      if (result.success && result.user) {
        this.storeUser(result.user);
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

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

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout() {
    localStorage.removeItem('user');
  },

  storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export default userAPI;
