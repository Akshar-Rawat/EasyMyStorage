import React, { useState } from 'react'
import { userAPI } from '../services/api'

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
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
      if (isLogin) {
        // Login
        const response = await userAPI.login({
          email: formData.email,
          password: formData.password
        })
        
        userAPI.storeUser(response.user)
        onLogin(response.user)
      } else {
        // Register
        const response = await userAPI.register(formData)
        
        if (response.success) {
          // Auto-login after successful registration
          const loginResponse = await userAPI.login({
            email: formData.email,
            password: formData.password
          })
          
          userAPI.storeUser(loginResponse.user)
          onLogin(loginResponse.user)
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container/30 p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg border border-outline-variant/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-display-md font-display-md text-on-surface mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-on-surface-variant text-body-sm">
            {isLogin ? 'Sign in to manage users' : 'Register to get started'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex mb-6 bg-surface-container-high/40 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-body-sm font-medium transition-all ${
              isLogin 
                ? 'bg-primary text-on-primary' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-body-sm font-medium transition-all ${
              !isLogin 
                ? 'bg-primary text-on-primary' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-body-sm font-medium text-on-surface mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all"
                placeholder="Enter your name"
              />
            </div>
          )}

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
              placeholder="Enter your email"
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
              className="w-full px-3 py-2 bg-surface-container-high/40 border border-outline-variant/30 rounded-lg text-body-sm focus:border-primary focus:ring-0 transition-all"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
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
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-error-container/30 p-3 rounded-lg border border-error-variant/20">
              <div className="flex items-center gap-2 text-error text-body-sm">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-headline-sm font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
  
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
