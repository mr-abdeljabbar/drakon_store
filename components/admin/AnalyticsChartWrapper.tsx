'use client'

import dynamic from 'next/dynamic'

const AnalyticsChart = dynamic(
  () => import('@/components/admin/AnalyticsChart').then((m) => m.AnalyticsChart),
  { ssr: false, loading: () => <div className="h-64 bg-surface-mid border border-drakon-border animate-pulse" /> }
)

interface Props {
  daily: { day: string; count: number }[]
  bySource: Record<string, number>
  byCampaign: { campaign: string; count: number }[]
}

export function AnalyticsChartWrapper({ daily, bySource, byCampaign }: Props) {
  return <AnalyticsChart daily={daily} bySource={bySource} byCampaign={byCampaign} />
}
