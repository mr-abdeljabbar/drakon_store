import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/leads/[id] — update status or notes
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, notes } = body

    const data: Record<string, unknown> = {}
    if (status) data.status = status
    if (notes !== undefined) data.notes = notes

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'لا توجد بيانات للتحديث' }, { status: 400 })
    }

    const lead = await prisma.lead.update({
      where: { id },
      data,
    })

    return NextResponse.json({ success: true, lead })
  } catch (err) {
    console.error('[PATCH /api/leads/[id]]', err)
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 })
  }
}

// GET /api/leads/[id] — get single lead
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lead = await prisma.lead.findUnique({ where: { id } })
  if (!lead) return NextResponse.json({ error: 'العميل غير موجود' }, { status: 404 })
  return NextResponse.json(lead)
}
