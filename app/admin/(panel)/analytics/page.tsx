'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const DailyChart     = dynamic(() => import('@/components/admin/AnalyticsChart').then((m) => m.DailyChart),     { ssr: false })
const CampaignBarChart = dynamic(() => import('@/components/admin/AnalyticsChart').then((m) => m.CampaignBarChart), { ssr: false })

interface AnalyticsData {
  overview: {
    total: number
    new: number
    sent: number
    accepted: number
    rejected: number
    conversion_rate: string
  }
  by_source: Record<string, number>
  by_campaign: { campaign: string; count: number }[]
  daily: { day: string; count: number }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [adSpend, setAdSpend] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [])

  const computedCPL = adSpend && data?.overview.total
    ? (parseFloat(adSpend) / data.overview.total).toFixed(2)
    : null

  if (loading) {
    return <div className="text-center py-20 text-drakon-muted font-montserrat text-sm">Loading...</div>
  }
  if (!data) return null

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Insights</p>
        <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">Analytics</h1>
      </div>

      {/* Cost per lead calculator */}
      <div className="bg-surface-mid border border-drakon-border p-5 mb-6">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-4">
          Cost Per Lead Calculator
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest block mb-2">
              Ad Spend (MAD)
            </label>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full bg-surface-high border border-drakon-border text-drakon-text font-mono text-sm px-3 py-2 focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest block mb-2">
              Cost Per Lead
            </label>
            <div className="bg-surface-high border border-gold/30 px-3 py-2 flex items-baseline gap-2">
              <span className="font-montserrat font-bold text-gold text-xl">
                {computedCPL ?? '—'}
              </span>
              {computedCPL && <span className="font-montserrat text-xs text-drakon-muted">MAD</span>}
            </div>
          </div>
          <div>
            <label className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest block mb-2">
              Total Leads
            </label>
            <div className="bg-surface-high border border-drakon-border px-3 py-2">
              <span className="font-montserrat font-bold text-drakon-text text-xl">{data.overview.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total', value: data.overview.total, gold: true },
          { label: 'New', value: data.overview.new },
          { label: 'Sent', value: data.overview.sent },
          { label: 'Accepted', value: data.overview.accepted },
          { label: 'Conversion', value: `${data.overview.conversion_rate}%`, gold: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-mid border border-drakon-border p-4">
            <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`font-montserrat font-bold text-2xl ${stat.gold ? 'text-gold' : 'text-drakon-text'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-surface-mid border border-drakon-border p-5 mb-6">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">Daily Trend</p>
        <p className="font-montserrat text-sm text-drakon-text mb-4">Leads per day — last 30 days</p>
        <DailyChart daily={data.daily} />
      </div>

      {/* Campaign chart */}
      <div className="bg-surface-mid border border-drakon-border p-5 mb-6">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">Campaigns</p>
        <p className="font-montserrat text-sm text-drakon-text mb-4">Top performing campaigns</p>
        {data.by_campaign.length > 0
          ? <CampaignBarChart byCampaign={data.by_campaign} />
          : <p className="font-montserrat text-sm text-drakon-muted text-center py-8">No campaign data yet.</p>
        }
      </div>

      {/* Source breakdown */}
      <div className="bg-surface-mid border border-drakon-border p-5">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-4">Source Breakdown</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.by_source).map(([source, count]) => {
            const pct = data.overview.total > 0 ? ((count / data.overview.total) * 100).toFixed(1) : '0'
            const label = source.charAt(0).toUpperCase() + source.slice(1)
            return (
              <div key={source} className="bg-surface-high border border-drakon-border p-4">
                <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">{label}</p>
                <p className="font-montserrat font-bold text-gold text-2xl">{count}</p>
                <p className="font-montserrat text-xs text-drakon-muted mt-1">{pct}%</p>
                <div className="mt-2 h-1 bg-surface-highest">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
