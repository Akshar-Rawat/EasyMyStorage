import React, { useState } from 'react'

const TopNavBar = ({ currentUser, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="flex justify-between items-center w-full px-margin-desktop h-16 bg-surface/60 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/20 shadow-[0_0_15px_rgba(173,198,255,0.1)]">
      <div className="flex items-center gap-8 flex-1">
        <span className="text-headline-md font-headline-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent shrink-0">Easy My Storage</span>
        
        <div className="hidden md:flex items-center relative max-w-md w-full">
          {/* <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]" data-icon="search">search</span> */}
          <input 
            className="w-full bg-surface-container-high/40 border border-outline-variant/30 rounded-full py-1.5 pl-10 pr-4 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all" 
            placeholder="Search resources..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 text-on-surface-variant hover:bg-surface-variant/40 hover:text-primary transition-all duration-300 rounded-full active:scale-95">
        
          notifications
        </button>
        
        <button className="p-2 text-on-surface-variant hover:bg-surface-variant/40 hover:text-primary transition-all duration-300 rounded-full active:scale-95">
          help
        </button>
        
        <button className="p-2 text-on-surface-variant hover:bg-surface-variant/40 hover:text-primary transition-all duration-300 rounded-full active:scale-95">
          settings
        </button>
        
        <div className="h-8 w-px bg-outline-variant/20 mx-2"></div>
        
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-on-surface-variant hidden sm:block">
            {currentUser?.name}
          </span>
          <div className="relative group">
            <img 
              alt={`${currentUser?.name} profile`} 
              className="w-8 h-8 rounded-full border border-primary/40 p-0.5 cursor-pointer" 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random`}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container rounded-lg shadow-lg border border-outline-variant/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b border-outline-variant/20">
                <p className="text-body-sm font-medium text-on-surface">{currentUser?.name}</p>
                <p className="text-body-sm text-on-surface-variant">{currentUser?.email}</p>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-body-sm rounded-full mt-1">
                  {currentUser?.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 text-body-sm text-error hover:bg-error-container/30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
