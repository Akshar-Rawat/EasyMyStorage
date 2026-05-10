import React, { useState } from 'react'
import { userAPI } from '../services/api'
import BulkEditModal from './BulkEditModal'

const BulkActions = ({ selectedUsers, setSelectedUsers }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClearSelection = () => {
    setSelectedUsers([])
  }

  const handleBulkAction = async (action) => {
    try {
      setLoading(true)
      
      switch (action) {
        case 'updateStatus':
        case 'assignRole':
          setShowEditModal(true)
          break
          
        case 'deleteUsers':
          if (confirm(`Are you sure you want to delete ${selectedUsers.length} selected user(s)?`)) {
            const userIds = selectedUsers.map(user => user.id)
            const result = await userAPI.bulkDelete(userIds)
            alert(result.message || `Successfully deleted ${result.deletedCount} user(s)`)
            setSelectedUsers([])
          }
          break
          
        default:
          console.log('Unknown action:', action)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUsersUpdated = () => {
    window.location.reload()
  }

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-row items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 bg-surface-container-highest/95 backdrop-blur-xl border border-primary/40 rounded-2xl shadow-2xl shadow-primary/20 animate-in slide-in-from-bottom-8 duration-300 max-w-[90vw] sm:max-w-none">
      <div className="flex items-center gap-2 px-0 sm:pr-4 sm:border-r sm:border-outline-variant/30">
        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary flex items-center justify-center text-[10px] font-bold shadow-lg">{selectedUsers.length}</span>
        <span className="text-body-sm font-medium text-on-surface">Selected</span>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all duration-200 text-body-sm font-medium"
          onClick={() => handleBulkAction('updateStatus')}
        >
          <span className="hidden sm:inline">Update Status</span>
          <span className="sm:hidden">Status</span>
        </button>
        
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 transition-all duration-200 text-body-sm font-medium"
          onClick={() => handleBulkAction('assignRole')}
        >
          <span className="hidden sm:inline">Assign Role</span>
          <span className="sm:hidden">Role</span>
        </button>
        
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error-container/20 hover:bg-error-container/30 text-error border border-error/30 transition-all duration-200 text-body-sm font-medium"
          onClick={() => handleBulkAction('deleteUsers')}
        >
          <span className="hidden sm:inline">Delete Users</span>
          <span className="sm:hidden">Delete</span>
        </button>
      </div>
      
      <div className="px-0 sm:pl-4 sm:border-l sm:border-outline-variant/30">
        <button 
          className="p-2 hover:bg-surface-variant/50 rounded-full transition-all duration-200 text-on-surface-variant hover:text-error"
          onClick={handleClearSelection}
          title="Clear selection"
          disabled={loading}
        >close
        </button>
      </div>

      <BulkEditModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        selectedUsers={selectedUsers}
        onUsersUpdated={handleUsersUpdated}
      />
    </div>
  )
}

export default BulkActions
