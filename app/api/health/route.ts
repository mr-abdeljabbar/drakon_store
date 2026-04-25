import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {}

  try {
    results.count = await prisma.lead.count()
    results.db = 'connected'
  } catch (err) {
    return NextResponse.json({ step: 'count', error: String(err) }, { status: 500 })
  }

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const rows = await prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as day, COUNT(*) as count
      FROM "Lead" WHERE created_at >= ${thirtyDaysAgo}::timestamptz
      GROUP BY day ORDER BY day ASC
    `
    results.rawQuery = `ok — ${rows.length} rows`
  } catch (err) {
    return NextResponse.json({ step: 'rawQuery', error: String(err) }, { status: 500 })
  }

  try {
    await prisma.lead.groupBy({ by: ['campaign'], _count: { campaign: true }, orderBy: { _count: { campaign: 'desc' } }, take: 8 })
    results.groupBy = 'ok'
  } catch (err) {
    return NextResponse.json({ step: 'groupBy', error: String(err) }, { status: 500 })
  }

  return NextResponse.json({ ok: true, ...results })
}
