import React, { useState } from 'react'
import { userAPI } from '../services/api'

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await userAPI.register(formData)
      if (response.success) {
        onUserAdded(response)
      } else {
        setError(response.error || 'Registration failed')
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', email: '', password: '', role: 'user' })
      setError('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/20 w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
          <h2 className="text-display-md font-display-md text-on-surface">Add New User</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 hover:bg-surface-variant/50 rounded-full transition-colors disabled:opacity-50"
          >close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-body-sm font-medium text-on-surface mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all"
              placeholder="Enter user name"
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-on-surface mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-on-surface mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all"
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-on-surface mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all appearance-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <div className="bg-error-container/30 p-3 rounded-lg border border-error-variant/20">
              <div className="flex items-center gap-2 text-error text-body-sm">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-surface-variant/40 hover:bg-surface-variant/60 text-on-surface rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg font-medium transition-all hover:brightness-110 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                  Creating...
                </div>
              ) : (
                'Create User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal
