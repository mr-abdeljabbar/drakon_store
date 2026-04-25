'use client'

import { useQuantity } from './QuantityContext'

interface Props {
  price: number
  productName: string
}

export function MobileCartBar({ price, productName }: Props) {
  const { quantity: qty, setQuantity: setQty } = useQuantity()
  const total = price * qty

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-drakon-border">
      {/* Price + quantity row */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1">
        {/* Total price */}
        <div className="flex items-baseline gap-1">
          <span className="font-cairo font-bold text-gold text-xl">{total}</span>
          <span className="font-cairo text-gold text-sm">د.م.</span>
        </div>

        {/* Quantity control */}
        <div className="flex items-center gap-3 bg-surface-mid border border-drakon-border px-2 py-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-7 h-7 flex items-center justify-center text-drakon-muted hover:text-gold transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="font-cairo font-bold text-drakon-text text-sm w-5 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-7 h-7 flex items-center justify-center text-drakon-muted hover:text-gold transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>

        {/* Cart icon */}
        <div className="flex items-center gap-1 text-drakon-muted">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span className="font-cairo text-xs font-bold text-gold bg-gold/20 rounded-full w-5 h-5 flex items-center justify-center">{qty}</span>
        </div>
      </div>

      {/* Order button */}
      <div className="px-4 pb-3">
        <a
          href="#order-form"
          className="block w-full bg-gold text-surface-base font-cairo font-bold text-center py-3 text-base tracking-wide hover:bg-gold-light transition-colors"
        >
          اطلب الآن
        </a>
      </div>
    </div>
  )
}
