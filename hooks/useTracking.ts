'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const STORAGE_KEY = 'drakon_tracking'

export interface TrackingData {
  source: string
  campaign: string
  fbclid: string
}

export function useTracking(): void {
  const searchParams = useSearchParams()

  useEffect(() => {
    const fbclid = searchParams.get('fbclid') ?? ''
    const utmSource = searchParams.get('utm_source') ?? ''
    const utmCampaign = searchParams.get('utm_campaign') ?? ''

    if (fbclid || utmSource || utmCampaign) {
      const data: TrackingData = {
        source: utmSource || (fbclid ? 'facebook' : 'direct'),
        campaign: utmCampaign,
        fbclid,
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [searchParams])
}

export function getTracking(): TrackingData {
  if (typeof window === 'undefined') return { source: 'direct', campaign: '', fbclid: '' }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { source: 'direct', campaign: '', fbclid: '' }
}
