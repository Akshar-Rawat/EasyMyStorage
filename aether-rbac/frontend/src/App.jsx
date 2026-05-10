import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import TopNavBar from './components/TopNavBar'
import UserManagement from './components/UserManagement'
import Auth from './components/Auth'
import { userAPI } from './services/api'

function App() {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const user = userAPI.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    userAPI.logout()
    setCurrentUser(null)
  }

  // Show Auth component if user is not logged in
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <div className="dark bg-background text-on-surface font-body-base antialiased min-h-screen flex overflow-hidden">
      {/* Navigation - handles both desktop sidebar and mobile bottom nav */}
      <Navigation />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TopNavBar */}
        <TopNavBar currentUser={currentUser} onLogout={handleLogout} />
        
        {/* Main Content */}
        <main className="flex-1 p-margin-desktop max-w-[1440px] mx-auto w-full pb-24">
          <UserManagement 
            selectedUsers={selectedUsers} 
            setSelectedUsers={setSelectedUsers} 
          />
        </main>
      </div>
    </div>
  )
}

export default App
