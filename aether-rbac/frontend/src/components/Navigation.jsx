import React, { useState } from 'react'

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('Users')

  const navItems = [
    { name: 'Dashboard', href: '#' },
    { name: 'Users', href: '#', active: true },
    { name: 'Roles', href: '#' },
    { name: 'Logs', href: '#' },
    { name: 'Settings', href: '#' }
  ]

  const mobileNavItems = [
    { name: 'Users', active: true },
    { name: 'Roles', active: false },
    { name: 'History', active: false },
    { name: 'Settings', active: false }
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 sticky top-0 bg-surface-container-low/80 backdrop-blur-2xl border-r border-outline-variant/20 shadow-2xl shadow-surface-lowest/50 z-[60]">
        <div className="flex flex-col h-full py-6 gap-2">
          <div className="px-6 mb-8">
            <div className="text-headline-sm font-headline-sm font-black text-primary uppercase tracking-tighter">Easy My Storage</div>
            <div className="text-on-surface-variant font-body-sm text-[10px] uppercase tracking-widest opacity-60">Storage Made Feasible</div>
          </div>
          
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ease-out group ${
                  item.active
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-4 border-primary shadow-[0_0_10px_rgba(173,198,255,0.15)]'
                    : 'text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface'
                }`}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
              >
                <span className={`font-body-sm text-body-sm ${item.active ? 'font-bold' : ''}`}>{item.name}</span>
              </a>
            ))}
          </nav>
          
          <div className="mt-auto px-4">
            <button className="w-full py-3 px-4 rounded-xl border border-outline-variant/30 bg-surface-container-high/50 hover:bg-surface-variant/40 transition-colors flex items-center justify-between group">
              <span className="text-body-sm font-medium text-primary">System Status</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-2xl border-t border-outline-variant/20 flex justify-around items-center h-16 z-50 px-6">
        {mobileNavItems.map((item) => (
          <button
            key={item.name}
            className={`flex flex-col items-center gap-1 ${
              item.active ? 'text-primary' : 'text-on-surface-variant'
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </>
  )
}

export default Navigation
