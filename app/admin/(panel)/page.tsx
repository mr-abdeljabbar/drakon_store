export const dynamic = 'force-dynamic'

import dynamic from 'next/dynamic'
import { StatsCard } from '@/components/admin/StatsCard'
import { prisma } from '@/lib/prisma'

const AnalyticsChart = dynamic(
  () => import('@/components/admin/AnalyticsChart').then((m) => m.AnalyticsChart),
  { ssr: false, loading: () => <div className="h-64 bg-surface-mid border border-drakon-border animate-pulse" /> }
)

async function getAnalytics() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [total, statusCounts, sourceCounts, campaignCounts, recentLeads, dailyLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.lead.groupBy({ by: ['source'], _count: { source: true } }),
    prisma.lead.groupBy({
      by: ['campaign'],
      _count: { campaign: true },
      orderBy: { _count: { campaign: 'desc' } },
      take: 8,
    }),
    prisma.lead.findMany({
      orderBy: { created_at: 'desc' },
      take: 8,
      select: { id: true, name: true, phone: true, city: true, product_name: true, status: true, source: true, campaign: true, quality_score: true, total_price: true, created_at: true },
    }),
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as day, COUNT(*) as count
      FROM "Lead" WHERE created_at >= ${thirtyDaysAgo}::timestamptz
      GROUP BY day ORDER BY day ASC
    `,
  ])

  const statusMap: Record<string, number> = {}
  statusCounts.forEach((s) => { statusMap[s.status] = s._count.status })

  const sourceMap: Record<string, number> = {}
  sourceCounts.forEach((s) => { sourceMap[s.source] = s._count.source })

  const accepted = statusMap['accepted'] ?? 0
  const conversionRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : '0'

  return {
    total,
    statusMap,
    sourceMap,
    accepted,
    conversionRate,
    byCampaign: campaignCounts.map((c) => ({ campaign: c.campaign ?? 'Direct', count: c._count.campaign })),
    recentLeads,
    daily: dailyLeads.map((d) => ({ day: d.day, count: Number(d.count) })),
  }
}

const STATUS_BADGE: Record<string, string> = { new: 'badge-new', sent: 'badge-sent', accepted: 'badge-accepted', rejected: 'badge-rejected' }
const STATUS_LABEL: Record<string, string> = { new: 'New', sent: 'Sent', accepted: 'Accepted', rejected: 'Rejected' }

export default async function Page() {
  const data = await getAnalytics()

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Overview</p>
        <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Leads" value={data.total} accent />
        <StatsCard title="New" value={data.statusMap['new'] ?? 0} subtitle="Awaiting follow-up" />
        <StatsCard title="Accepted" value={data.accepted} subtitle="Confirmed leads" />
        <StatsCard title="Conversion" value={`${data.conversionRate}%`} subtitle="Accepted / Total" />
      </div>

      {/* Charts */}
      <div className="mb-8">
        <AnalyticsChart
          daily={data.daily}
          bySource={data.sourceMap}
          byCampaign={data.byCampaign}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source breakdown */}
        <div className="bg-surface-mid border border-drakon-border p-5">
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-4">
            Sources
          </p>
          <div className="space-y-3">
            {Object.entries(data.sourceMap)
              .sort(([, a], [, b]) => b - a)
              .map(([source, count]) => {
                const pct = data.total > 0 ? Math.round((count / data.total) * 100) : 0
                const label = source.charAt(0).toUpperCase() + source.slice(1)
                return (
                  <div key={source}>
                    <div className="flex justify-between mb-1">
                      <span className="font-montserrat text-xs text-drakon-muted">{count} leads</span>
                      <span className="font-montserrat text-xs text-drakon-text">{label}</span>
                    </div>
                    <div className="h-1 bg-surface-highest">
                      <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Recent leads */}
        <div className="lg:col-span-2 bg-surface-mid border border-drakon-border p-5">
          <div className="flex items-center justify-between mb-4">
            <a href="/admin/leads" className="font-montserrat text-xs text-gold hover:underline">
              View All →
            </a>
            <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">
              Recent Leads
            </p>
          </div>
          <div className="space-y-2">
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-drakon-border/30 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={STATUS_BADGE[lead.status]}>{STATUS_LABEL[lead.status] ?? lead.status}</span>
                  <span className="font-mono text-xs text-drakon-muted">{lead.phone}</span>
                </div>
                <div className="text-right">
                  <p className="font-montserrat text-sm text-drakon-text font-semibold">{lead.name}</p>
                  <p className="font-montserrat text-xs text-drakon-muted">{lead.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
