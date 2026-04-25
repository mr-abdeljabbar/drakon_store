export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalLeads,
      statusCounts,
      sourceCounts,
      campaignCounts,
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

      prisma.$queryRaw<{ day: string; count: bigint }[]>`
        SELECT
          TO_CHAR(created_at, 'YYYY-MM-DD') as day,
          COUNT(*) as count
        FROM "Lead"
        WHERE created_at >= ${thirtyDaysAgo}::timestamptz
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
    })
  } catch (err) {
    console.error('[analytics] error:', err)
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}
