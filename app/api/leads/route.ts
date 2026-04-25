export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { scoreLeadQuality, normalizePhone } from '@/lib/lead-quality'
import { sendToSheets } from '@/lib/sheets'
import { notifyNewOrder } from '@/lib/telegram'
import { Prisma } from '@prisma/client'

// GET /api/leads — list with filters + pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const campaign = searchParams.get('campaign')
  const search = searchParams.get('search')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '20', 10)
  const skip = (page - 1) * limit

  const where: Prisma.LeadWhereInput = {}

  if (status && status !== 'all') where.status = status
  if (source && source !== 'all') where.source = source
  if (campaign) where.campaign = { contains: campaign }
  if (dateFrom || dateTo) {
    where.created_at = {}
    if (dateFrom) where.created_at.gte = new Date(dateFrom)
    if (dateTo) {
      const end = new Date(dateTo)
      end.setHours(23, 59, 59, 999)
      where.created_at.lte = end
    }
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { phone: { contains: search } },
    ]
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ])

  return NextResponse.json({ leads, total, page, limit, pages: Math.ceil(total / limit) })
}

// POST /api/leads — create new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, city, address, product_name, quantity, total_price, source, campaign, fbclid } = body

    if (!name || !phone || !city || !product_name) {
      return NextResponse.json({ error: 'الحقول المطلوبة: الاسم، الهاتف، المدينة، المنتج' }, { status: 400 })
    }

    const normalizedPhone = normalizePhone(phone)
    const { score } = await scoreLeadQuality({ phone, address })

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: normalizedPhone,
        city,
        address: address?.trim() || null,
        product_name,
        quantity: parseInt(quantity, 10) || 1,
        total_price: parseFloat(total_price) || 0,
        source: source || 'direct',
        campaign: campaign || null,
        fbclid: fbclid || null,
        quality_score: score,
        status: 'new',
      },
    })

    // Fire-and-forget notifications
    sendToSheets(lead)
    notifyNewOrder(lead)

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/leads]', err)
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 })
  }
}
