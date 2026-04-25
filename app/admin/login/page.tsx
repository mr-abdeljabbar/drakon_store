'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="DRAKON"
            width={200}
            height={100}
            className="h-24 object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
            style={{ width: 'auto' }}
          />
        </div>

        <div className="bg-surface-mid border border-drakon-border p-8">
          <h1 className="font-cairo font-bold text-xl text-drakon-text text-center mb-2">
            Admin Panel
          </h1>
          <p className="text-drakon-muted text-sm text-center mb-8">
            Sign in to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-drakon-muted mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@drakon.ma"
                className="w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-3 text-drakon-text placeholder:text-drakon-muted/50 transition-colors"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm text-drakon-muted mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-3 text-drakon-text placeholder:text-drakon-muted/50 transition-colors"
                dir="ltr"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-surface-base font-bold py-3 tracking-wide hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-drakon-muted text-xs mt-6">
          DRAKON MEN&apos;S CARE © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
