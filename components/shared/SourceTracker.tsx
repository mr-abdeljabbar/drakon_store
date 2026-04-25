'use client'

import { Suspense } from 'react'
import { useTracking } from '@/hooks/useTracking'

function TrackingInner() {
  useTracking()
  return null
}

export function SourceTracker() {
  return (
    <Suspense fallback={null}>
      <TrackingInner />
    </Suspense>
  )
}
