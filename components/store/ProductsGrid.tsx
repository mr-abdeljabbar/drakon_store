'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/lib/products'

const TABS = [
  { label: 'الكل',   value: 'all' },
  { label: 'اللحية', value: 'beard' },
  { label: 'الشعر',  value: 'hair' },
  { label: 'البشرة', value: 'skin' },
]

interface Props {
  products: Product[]
}

export function ProductsGrid({ products }: Props) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active)

  return (
    <>
      {/* Category tabs */}
      <div className="flex gap-2 mb-8 justify-start overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`font-tajawal text-sm px-4 py-2 whitespace-nowrap transition-colors ${
              active === tab.value
                ? 'bg-gold text-surface-base font-bold'
                : 'border border-drakon-border text-drakon-muted hover:border-gold hover:text-gold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
        {filtered.length === 0 && (
          <p className="font-tajawal text-drakon-muted text-sm col-span-full text-center py-10">
            لا توجد منتجات في هذه الفئة
          </p>
        )}
      </div>
    </>
  )
}
