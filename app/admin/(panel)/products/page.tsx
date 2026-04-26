export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRODUCTS } from '@/lib/products'
import { getCategoryBySlug } from '@/lib/categories'

async function getProducts() {
  const count = await prisma.product.count()
  if (count === 0) await prisma.product.createMany({ data: DEFAULT_PRODUCTS })
  return prisma.product.findMany({ orderBy: { created_at: 'asc' } })
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Catalog</p>
          <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">Products</h1>
        </div>
        <Link href="/admin/products/new"
          className="bg-gold text-surface-base font-montserrat font-bold text-sm px-6 py-3 hover:bg-gold-light transition-colors">
          + New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/admin/products/${p.id}/edit`}
            className="bg-surface-mid border border-drakon-border hover:border-gold transition-colors group">
            <div className="aspect-square bg-surface-high flex items-center justify-center overflow-hidden relative">
              {p.image_url ? (
                <Image src={p.image_url} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-4" />
              ) : (
                <span className="text-5xl opacity-20">
                  {getCategoryBySlug(p.category)?.icon ?? '✨'}
                </span>
              )}
              {p.badge && (
                <span className="absolute top-2 left-2 font-montserrat text-xs bg-gold text-surface-base px-2 py-0.5 uppercase tracking-widest">
                  {p.badge}
                </span>
              )}
              {!p.active && (
                <span className="absolute top-2 right-2 font-montserrat text-xs bg-surface text-drakon-muted border border-drakon-border px-2 py-0.5">
                  Hidden
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-1">
                {getCategoryBySlug(p.category)?.en ?? p.category}
              </p>
              <h3 className="font-montserrat font-bold text-drakon-text text-sm mb-2 leading-tight">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-bold text-gold">{p.price} MAD</span>
                <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-gold border border-gold/40 px-3 py-1.5 rounded-sm bg-gold/5 group-hover:bg-gold group-hover:text-surface-base transition-all duration-200 shadow-sm shadow-gold/10 group-hover:shadow-gold/25">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                  Edit
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-drakon-muted">
          <p className="font-montserrat text-sm">No products yet.</p>
          <Link href="/admin/products/new" className="text-gold hover:underline text-sm mt-2 inline-block">Create your first product →</Link>
        </div>
      )}
    </div>
  )
}
