export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/ProductForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()

  return (
    <div>
      <div className="mb-8">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Products</p>
        <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">Edit Product</h1>
        <p className="font-montserrat text-xs text-drakon-muted mt-1">{product.name}</p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
