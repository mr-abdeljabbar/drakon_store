'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface" dir="ltr">

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, fixed on desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:static md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-surface-low border-b border-drakon-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-drakon-muted hover:text-gold transition-colors mr-2"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-montserrat text-xs text-drakon-muted tracking-widest uppercase">
              Live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-drakon-muted hidden sm:block">
              {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="font-montserrat text-xs text-gold border border-gold/30 px-2 py-1">
              ADMIN
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
