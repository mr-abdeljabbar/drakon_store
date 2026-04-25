'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▣' },
  { href: '/admin/leads', label: 'Leads', icon: '◉' },
  { href: '/admin/analytics', label: 'Analytics', icon: '◈' },
  { href: '/admin/products', label: 'Products', icon: '▦' },
]

interface Props {
  onClose?: () => void
}

export function Sidebar({ onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 bg-surface-low border-r border-drakon-border flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-drakon-border relative">
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:hidden text-drakon-muted hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <Link href="/admin" className="flex flex-col items-center" onClick={onClose}>
          <Image
            src="/logo.png"
            alt="DRAKON"
            width={220}
            height={110}
            className="h-24 object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
            style={{ width: 'auto' }}
          />
          <span className="font-montserrat text-xs text-drakon-muted tracking-widest uppercase -mt-2">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 transition-colors group ${
                isActive
                  ? 'bg-gold/10 border border-gold/30 text-gold'
                  : 'text-drakon-muted hover:text-drakon-text hover:bg-surface-mid border border-transparent'
              }`}
            >
              <span className={`text-sm ${isActive ? 'text-gold' : 'text-drakon-muted group-hover:text-gold'}`}>
                {item.icon}
              </span>
              <p className="font-montserrat text-sm font-semibold tracking-wide">{item.label}</p>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-drakon-border space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-drakon-muted hover:text-gold transition-colors"
        >
          <span className="text-xs">←</span>
          <span className="font-montserrat text-xs tracking-wide">Back to Store</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-drakon-muted hover:text-red-400 transition-colors w-full"
        >
          <span className="text-xs">⏻</span>
          <span className="font-montserrat text-xs tracking-wide">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
