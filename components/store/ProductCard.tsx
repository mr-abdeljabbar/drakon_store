import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <div className="group bg-surface-mid border border-drakon-border hover:border-gold transition-colors flex flex-col">
      {/* Clickable image area */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-surface-high flex items-center justify-center overflow-hidden relative">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-4"
            />
          ) : (
            <div className="text-6xl opacity-30">
              {product.category === 'beard' ? '🧔' : product.category === 'hair' ? '💈' : '✨'}
            </div>
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 font-montserrat text-xs bg-gold text-surface-base px-2 py-1 tracking-widest uppercase">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 text-right flex flex-col flex-1">
        <p className="font-cairo text-xs text-drakon-muted mb-1">
          {product.category === 'beard' ? 'لحية' : product.category === 'hair' ? 'شعر' : 'بشرة'}
        </p>
        <h3 className="font-cairo font-bold text-drakon-text text-lg mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="font-tajawal text-sm text-drakon-muted mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 justify-end mb-4">
          {product.original_price > product.price && (
            <span className="font-cairo text-drakon-muted text-sm line-through">
              {product.original_price} د.م.
            </span>
          )}
          <span className="font-cairo font-bold text-gold text-xl">{product.price}</span>
          <span className="font-cairo text-gold text-sm">د.م.</span>
        </div>

        {/* CTA button */}
        <Link
          href={`/product/${product.slug}`}
          className="block w-full bg-gold text-surface-base font-cairo font-bold text-center py-3 text-sm tracking-wide hover:bg-gold-light transition-colors"
        >
          اطلب الآن
        </Link>
      </div>
    </div>
  )
}
