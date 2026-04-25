'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MOROCCAN_CITIES, Product } from '@/lib/products'
import { getTracking } from '@/hooks/useTracking'
import { trackFbEvent } from '@/components/shared/FacebookPixel'
import { useQuantity } from './QuantityContext'

interface Props {
  product: Product
}

export function OrderForm({ product }: Props) {
  const router = useRouter()
  const { quantity, setQuantity } = useQuantity()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const totalPrice = product.price * quantity

  useEffect(() => {
    // Track ViewContent on mount
    trackFbEvent('ViewContent', {
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: 'MAD',
    })
  }, [product])

  function handleFormFocus() {
    if (!touched) {
      setTouched(true)
      trackFbEvent('InitiateCheckout', {
        content_name: product.name,
        value: totalPrice,
        currency: 'MAD',
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const tracking = getTracking()

    const payload = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      address: formData.get('address') as string,
      product_name: product.name,
      quantity,
      total_price: totalPrice,
      source: tracking.source || 'direct',
      campaign: tracking.campaign || null,
      fbclid: tracking.fbclid || null,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'حدث خطأ، يرجى المحاولة مجدداً')
        return
      }

      // Fire Facebook Lead event
      trackFbEvent('Lead', {
        value: totalPrice,
        currency: 'MAD',
        content_name: product.name,
      })

      // Redirect to confirmation
      router.push(`/confirmation?product=${encodeURIComponent(product.name)}&price=${totalPrice}&qty=${quantity}`)
    } catch {
      setError('فشل الاتصال بالخادم، يرجى المحاولة مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface-mid border border-drakon-border p-6 md:p-8">
      <h2 className="font-cairo font-bold text-2xl text-drakon-text text-right mb-2">
        إتمام الطلب
      </h2>
      <p className="font-tajawal text-drakon-muted text-right text-sm mb-6">
        سيتصل بك فريقنا خلال 24 ساعة لتأكيد طلبك
      </p>

      {/* Price summary */}
      <div className="flex items-center justify-between flex-row-reverse bg-surface-high px-4 py-3 mb-6 border border-drakon-border">
        <div className="text-right">
          <p className="font-tajawal text-xs text-drakon-muted">{product.name}</p>
          <p className="font-cairo font-bold text-gold text-2xl">
            {totalPrice} <span className="text-base">د.م.</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border border-drakon-border text-drakon-text hover:border-gold transition-colors font-cairo font-bold"
          >
            −
          </button>
          <span className="font-cairo font-bold text-drakon-text w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-8 h-8 flex items-center justify-center border border-drakon-border text-drakon-text hover:border-gold transition-colors font-cairo font-bold"
          >
            +
          </button>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} onFocus={handleFormFocus} noValidate dir="rtl">
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block font-tajawal text-sm text-drakon-muted mb-1">
              الاسم الكامل <span className="text-gold">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="محمد الأمين"
              className="w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-3 font-tajawal text-drakon-text text-right placeholder:text-drakon-muted/50 transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-tajawal text-sm text-drakon-muted mb-1">
              رقم الهاتف <span className="text-gold">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="0612345678"
              className="w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-3 font-tajawal text-drakon-text text-right placeholder:text-drakon-muted/50 transition-colors"
              dir="ltr"
            />
          </div>

          {/* City */}
          <div>
            <label className="block font-tajawal text-sm text-drakon-muted mb-1">
              المدينة <span className="text-gold">*</span>
            </label>
            <select
              name="city"
              required
              className="w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-3 font-tajawal text-drakon-text text-right transition-colors appearance-none"
            >
              <option value="">اختر مدينتك</option>
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-800 text-red-400 font-tajawal text-sm text-right">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gold text-surface-base font-cairo font-bold py-4 text-lg tracking-wide hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'جاري الإرسال...' : 'إتمام الطلب'}
        </button>

        <p className="font-tajawal text-xs text-drakon-muted text-center mt-3">
          🔒 بياناتك محمية ومشفرة — لن تُشارك مع أي جهة
        </p>
      </form>
    </div>
  )
}
