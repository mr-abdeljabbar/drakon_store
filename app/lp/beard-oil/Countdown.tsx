'use client'

import { useEffect, useState } from 'react'

const DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours per session
const STORAGE_KEY = 'drakon_lp_countdown'

function getTarget(): number {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return parseInt(stored, 10)
  } catch {}
  const target = Date.now() + DURATION_MS
  try { sessionStorage.setItem(STORAGE_KEY, String(target)) } catch {}
  return target
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Countdown() {
  const [time, setTime] = useState({ h: 1, m: 59, s: 59 })
  const [expired, setExpired] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = getTarget()

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setExpired(true); return }
      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted || expired) return null

  const urgent = time.h === 0 && time.m < 30
  const numClass = urgent
    ? 'text-red-400'
    : 'text-gold'

  return (
    <div className="bg-surface-base border border-drakon-border p-4 md:p-5" dir="rtl">
      {/* Header row — RTL context makes flex-start = right; icon last in DOM = left */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{urgent ? '🔥' : '⏳'}</span>
        <p className="font-cairo font-bold text-drakon-text text-sm">
          {urgent ? 'ينتهي العرض قريباً!' : 'سعر خاص لفترة محدودة، ينتهي خلال'}
        </p>
      </div>

      {/* Timer — centered on mobile, right-aligned on desktop; explicit LTR for digits */}
      <div className="flex items-end justify-center gap-3 md:gap-4" dir="ltr">

        {/* Hours */}
        <div className="flex flex-col items-center gap-1">
          <span className={`font-cairo font-black text-4xl md:text-5xl leading-none tabular-nums ${numClass}`}>
            {pad(time.h)}
          </span>
          <span className="font-tajawal text-xs text-drakon-muted">ساعة</span>
        </div>

        <span className={`font-cairo font-black text-3xl md:text-4xl mb-3 ${numClass}`}>:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-1">
          <span className={`font-cairo font-black text-4xl md:text-5xl leading-none tabular-nums ${numClass}`}>
            {pad(time.m)}
          </span>
          <span className="font-tajawal text-xs text-drakon-muted">دقيقة</span>
        </div>

        <span className={`font-cairo font-black text-3xl md:text-4xl mb-3 ${numClass}`}>:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center gap-1">
          <span className={`font-cairo font-black text-4xl md:text-5xl leading-none tabular-nums ${numClass}`}>
            {pad(time.s)}
          </span>
          <span className="font-tajawal text-xs text-drakon-muted">ثانية</span>
        </div>

      </div>
    </div>
  )
}
