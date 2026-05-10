import React, { useState, useEffect } from 'react'
import DataTable from './DataTable'
import BulkActions from './BulkActions'
import AddUserModal from './AddUserModal'
import { userAPI } from '../services/api'

const UserManagement = ({ selectedUsers, setSelectedUsers }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Statuses',
    role: 'All Roles',
    lastActive: 'Any Time'
  })
  
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([])

  // Format created_at timestamp to relative time
  const formatLastActive = (createdAt) => {
    const date = new Date(createdAt)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Fetch users from API
  const fetchUsers = async (roleFilter = null) => {
    try {
      setLoading(true)
      setError(null)
      const response = await userAPI.getUsers(roleFilter)
      
      // Transform API data to match frontend structure
      const transformedUsers = response.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: 'Active', // Default status since API doesn't include it
        lastActive: formatLastActive(user.created_at), // Format created_at to relative time
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=36`,
        created_at: user.created_at // Keep original timestamp for reference
      }))
      
      setUsers(transformedUsers)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Refetch users when role filter changes
  useEffect(() => {
    const roleFilter = filters.role === 'All Roles' ? null : 
                      filters.role.toLowerCase() === 'admin' ? 'admin' : 
                      filters.role.toLowerCase() === 'user' ? 'user' : null
    fetchUsers(roleFilter)
  }, [filters.role])

  // Apply filters to users
  useEffect(() => {
    let filtered = [...users]
    
    // Search filter
    if (filters.search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    // Status filter (all users are 'Active' in current implementation)
    if (filters.status !== 'All Statuses') {
      filtered = filtered.filter(user => user.status === filters.status)
    }
    
    // Role filter
    if (filters.role !== 'All Roles') {
      filtered = filtered.filter(user => 
        user.role.toLowerCase() === filters.role.toLowerCase()
      )
    }
    
    setFilteredUsers(filtered)
  }, [users, filters.search, filters.status, filters.role])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleAddUser = () => {
    setShowAddUserModal(true)
  }

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false)
  }

  const handleUserAdded = (newUser) => {
    fetchUsers() // Refresh the user list
    setShowAddUserModal(false)
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-display-lg font-display-lg text-on-surface">User Management</h1>
            <p className="text-on-surface-variant text-body-base opacity-70 sm:text-sm">Oversee system access levels and user permissions across the core architecture.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all text-body-base font-medium active:scale-95 w-full sm:w-auto justify-center sm:justify-start ${
                showFilters 
                  ? 'bg-primary/10 border-primary/30 text-primary' 
                  : 'border-outline-variant hover:bg-surface-variant/40 text-on-surface'
              }`}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <button 
              onClick={handleAddUser}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-headline-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto justify-center sm:justify-start"
            >
  
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Filtering UI */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-surface-container/30 p-4 rounded-xl border border-outline-variant/20 backdrop-blur-sm animate-in slide-in-from-top-4 duration-300">
        <div className="space-y-2">
          <label className="text-label-mono text-[10px] text-outline-variant uppercase">Search Name/Email</label>
          <div className="relative">
          
            <input 
              className="w-full bg-surface-container-high/40 border border-outline-variant/30 rounded-lg py-2 pl-9 pr-3 text-body-sm focus:border-primary focus:ring-0 transition-all" 
              placeholder="Search..." 
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-mono text-[10px] text-outline-variant uppercase">Account Status</label>
          <select 
            className="w-full bg-surface-container-high/40 border border-outline-variant/30 rounded-lg py-2 px-3 text-body-sm focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface-variant"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
            <option>Pending</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-mono text-[10px] text-outline-variant uppercase">Role Type</label>
          <select 
            className="w-full bg-surface-container-high/40 border border-outline-variant/30 rounded-lg py-2 px-3 text-body-sm focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface-variant"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-label-mono text-[10px] text-outline-variant uppercase">Last Active Range</label>
          <select 
            className="w-full bg-surface-container-high/40 border border-outline-variant/30 rounded-lg py-2 px-3 text-body-sm focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface-variant"
            value={filters.lastActive}
            onChange={(e) => handleFilterChange('lastActive', e.target.value)}
          >
            <option>Any Time</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Over 90 Days</option>
          </select>
        </div>
      </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="bg-surface-container/30 p-8 rounded-xl border border-outline-variant/20 backdrop-blur-sm text-center">
          <div className="inline-flex items-center gap-2 text-on-surface-variant">\
            Loading users...
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-error-container/30 p-8 rounded-xl border border-error-variant/20 backdrop-blur-sm text-center">
          <div className="inline-flex items-center gap-2 text-error">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
          <button 
            onClick={() => fetchUsers()}
            className="mt-4 px-4 py-2 bg-error text-on-error rounded-lg hover:bg-error/90 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Modern Data Table Card with Multi-Select */}
      {!loading && !error && (
        <DataTable 
          users={filteredUsers.length > 0 ? filteredUsers : users} 
          selectedUsers={selectedUsers} 
          setSelectedUsers={setSelectedUsers} 
        />
      )}

      {/* Bulk Actions Floating Bar */}
      {selectedUsers.length > 0 && (
        <BulkActions 
          selectedUsers={selectedUsers} 
          setSelectedUsers={setSelectedUsers} 
        />
      )}

      {/* Add User Modal */}
      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={handleCloseAddUserModal}
        onUserAdded={handleUserAdded}
      />
    </>
  )
}

export default UserManagement
