import React from 'react'

const UserActionsDropdown = ({ userId, isActive, onToggle, onAction }) => {
  const handleAction = (action) => {
    onAction(action, userId)
  }

  if (!isActive) return null

  return (
    <div className="dropdown-menu absolute right-0 top-full mt-1 w-48 bg-surface-container rounded-lg shadow-lg border border-outline-variant/20 z-50">
      <button
        onClick={() => handleAction('edit')}
        className="w-full text-left px-3 py-2 text-body-sm text-on-surface hover:bg-surface-variant/40 transition-colors flex items-center gap-2"
      >
        Edit User
      </button>
      <button
        onClick={() => handleAction('view')}
        className="w-full text-left px-3 py-2 text-body-sm text-on-surface hover:bg-surface-variant/40 transition-colors flex items-center gap-2"
      >
        View Details
      </button>
      <button
        onClick={() => handleAction('delete')}
        className="w-full text-left px-3 py-2 text-body-sm text-error hover:bg-error-container/30 transition-colors flex items-center gap-2"
      >
        Delete User
      </button>
    </div>
  )
}

export default UserActionsDropdown
