import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateCsv } from '@/lib/csv'
import { Prisma } from '@prisma/client'

// POST /api/export — export leads as CSV + mark as sent
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { statuses, dateFrom, dateTo, source, markAsSent = true } = body

    const where: Prisma.LeadWhereInput = {}

    if (statuses && statuses.length > 0) {
      where.status = { in: statuses as string[] }
    }
    if (source && source !== 'all') {
      where.source = source as string
    }
    if (dateFrom || dateTo) {
      where.created_at = {}
      if (dateFrom) where.created_at.gte = new Date(dateFrom)
      if (dateTo) {
        const end = new Date(dateTo)
        end.setHours(23, 59, 59, 999)
        where.created_at.lte = end
      }
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
    })

    if (leads.length === 0) {
      return NextResponse.json({ error: 'لا توجد عملاء مطابقون للفلاتر المحددة' }, { status: 404 })
    }

    const csv = generateCsv(leads)

    // Mark exported leads as "sent"
    if (markAsSent) {
      const ids = leads
        .filter((l) => l.status === 'new')
        .map((l) => l.id)
      if (ids.length > 0) {
        await prisma.lead.updateMany({
          where: { id: { in: ids } },
          data: { status: 'sent' },
        })
      }
    }

    const filename = `drakon-leads-${new Date().toISOString().split('T')[0]}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Exported-Count': String(leads.length),
      },
    })
  } catch (err) {
    console.error('[POST /api/export]', err)
    return NextResponse.json({ error: 'خطأ في التصدير' }, { status: 500 })
  }
}

// GET /api/export/count — preview export count
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const statuses = searchParams.getAll('status')
  const source = searchParams.get('source')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')

  const where: Prisma.LeadWhereInput = {}
  if (statuses.length > 0) where.status = { in: statuses as string[] }
  if (source && source !== 'all') where.source = source as string
  if (dateFrom || dateTo) {
    where.created_at = {}
    if (dateFrom) where.created_at.gte = new Date(dateFrom)
    if (dateTo) {
      const end = new Date(dateTo)
      end.setHours(23, 59, 59, 999)
      where.created_at.lte = end
    }
  }

  const count = await prisma.lead.count({ where })
  return NextResponse.json({ count })
}
