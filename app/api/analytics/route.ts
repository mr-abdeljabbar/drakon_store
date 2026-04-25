export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [
    totalLeads,
    statusCounts,
    sourceCounts,
    campaignCounts,
    recentLeads,
    dailyLeads,
  ] = await Promise.all([
    prisma.lead.count(),

    prisma.lead.groupBy({
      by: ['status'],
      _count: { status: true },
    }),

    prisma.lead.groupBy({
      by: ['source'],
      _count: { source: true },
    }),

    prisma.lead.groupBy({
      by: ['campaign'],
      _count: { campaign: true },
      orderBy: { _count: { campaign: 'desc' } },
      take: 10,
    }),

    prisma.lead.findMany({
      orderBy: { created_at: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        phone: true,
        city: true,
        product_name: true,
        status: true,
        source: true,
        campaign: true,
        quality_score: true,
        created_at: true,
      },
    }),

    // Raw daily count for last 30 days (SQLite compatible)
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT
        strftime('%Y-%m-%d', created_at) as day,
        COUNT(*) as count
      FROM "Lead"
      WHERE created_at >= ${thirtyDaysAgo.toISOString()}
      GROUP BY day
      ORDER BY day ASC
    `,
  ])

  const statusMap: Record<string, number> = {}
  statusCounts.forEach((s) => { statusMap[s.status] = s._count.status })

  const sourceMap: Record<string, number> = {}
  sourceCounts.forEach((s) => { sourceMap[s.source] = s._count.source })

  const accepted = statusMap['accepted'] ?? 0
  const conversionRate = totalLeads > 0 ? ((accepted / totalLeads) * 100).toFixed(1) : '0'

  return NextResponse.json({
    overview: {
      total: totalLeads,
      new: statusMap['new'] ?? 0,
      sent: statusMap['sent'] ?? 0,
      accepted,
      rejected: statusMap['rejected'] ?? 0,
      conversion_rate: conversionRate,
    },
    by_source: sourceMap,
    by_campaign: campaignCounts.map((c) => ({
      campaign: c.campaign ?? 'مباشر',
      count: c._count.campaign,
    })),
    daily: dailyLeads.map((d) => ({
      day: d.day,
      count: Number(d.count),
    })),
    recent_leads: recentLeads,
  })
}
