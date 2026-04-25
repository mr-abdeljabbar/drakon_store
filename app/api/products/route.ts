import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRODUCTS } from '@/lib/products'

export const dynamic = 'force-dynamic'

async function ensureSeeded() {
  const count = await prisma.product.count()
  if (count === 0) {
    await prisma.product.createMany({ data: DEFAULT_PRODUCTS })
  }
}

export async function GET() {
  await ensureSeeded()
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { created_at: 'asc' },
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await prisma.product.create({ data: body })
  return NextResponse.json(product, { status: 201 })
}
