'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MOROCCAN_CITIES, Product } from '@/lib/products'
import { getTracking } from '@/hooks/useTracking'
import { trackFbEvent } from '@/components/shared/FacebookPixel'
import { useQuantity } from '@/components/store/QuantityContext'

interface Props { product: Product }

export function LpOrderForm({ product }: Props) {
  const router = useRouter()
  const { quantity, setQuantity } = useQuantity()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const totalPrice = product.price * quantity

  useEffect(() => {
    trackFbEvent('ViewContent', {
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: 'MAD',
    })
  }, [product])

  function handleFocus() {
    if (!touched) {
      setTouched(true)
      trackFbEvent('InitiateCheckout', { content_name: product.name, value: totalPrice, currency: 'MAD' })
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
      address: null,
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
      trackFbEvent('Lead', { value: totalPrice, currency: 'MAD', content_name: product.name })
      router.push(`/confirmation?product=${encodeURIComponent(product.name)}&price=${totalPrice}&qty=${quantity}`)
    } catch {
      setError('فشل الاتصال بالخادم، يرجى المحاولة مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-4 border-gold bg-[#1f1f1f] shadow-[4px_4px_0px_0px_#C9A84C] p-6 md:p-8">
      <h2 className="font-cairo font-black text-2xl text-[#e2e2e2] mb-2 text-right">
        سجّل طلبك الآن
      </h2>
      <p className="font-tajawal text-sm text-[#d0c5b2] mb-6 text-right">
        سيتصل بك فريقنا خلال ساعات لتأكيد الطلب وتنسيق التوصيل
      </p>

      {/* Quantity + price — flex in RTL: first elem on right, second on left */}
      <div className="flex items-center justify-between bg-[#282a2b] px-4 py-3 mb-6 border-2 border-[#4d4637]">
        {/* Price on the right (start in RTL) */}
        <div className="text-right">
          <p className="font-tajawal text-xs text-[#d0c5b2]">{product.name}</p>
          <p className="font-cairo font-black text-gold text-2xl">
            {totalPrice} <span className="text-base font-normal">درهم</span>
          </p>
        </div>
        {/* Quantity controls on the left (end in RTL) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 border-2 border-[#4d4637] text-[#e2e2e2] hover:border-gold transition-colors font-cairo font-bold text-lg flex items-center justify-center"
          >−</button>
          <span className="font-cairo font-bold text-[#e2e2e2] w-8 text-center text-lg">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-9 h-9 border-2 border-[#4d4637] text-[#e2e2e2] hover:border-gold transition-colors font-cairo font-bold text-lg flex items-center justify-center"
          >+</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} onFocus={handleFocus} noValidate dir="rtl" className="flex flex-col gap-4">
        <div>
          <label className="block font-tajawal text-sm text-[#d0c5b2] mb-1.5">
            الاسم الكامل <span className="text-gold">*</span>
          </label>
          <input
            name="name" type="text" required
            placeholder="محمد الأمين"
            className="w-full bg-[#282a2b] border-b-2 border-[#4d4637] focus:border-gold outline-none px-3 py-3 font-tajawal text-[#e2e2e2] text-right placeholder:text-[#d0c5b2]/40 transition-colors"
          />
        </div>

        <div>
          <label className="block font-tajawal text-sm text-[#d0c5b2] mb-1.5">
            رقم الهاتف <span className="text-gold">*</span>
          </label>
          <input
            name="phone" type="tel" required
            placeholder="0612345678"
            className="w-full bg-[#282a2b] border-b-2 border-[#4d4637] focus:border-gold outline-none px-3 py-3 font-tajawal text-[#e2e2e2] placeholder:text-[#d0c5b2]/40 transition-colors"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block font-tajawal text-sm text-[#d0c5b2] mb-1.5">
            المدينة <span className="text-gold">*</span>
          </label>
          <select
            name="city" required
            className="w-full bg-[#282a2b] border-b-2 border-[#4d4637] focus:border-gold outline-none px-3 py-3 font-tajawal text-[#e2e2e2] text-right transition-colors appearance-none"
          >
            <option value="">اختر مدينتك</option>
            {MOROCCAN_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-900/20 border border-red-800 text-red-400 font-tajawal text-sm text-right">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-gold text-[#131313] font-cairo font-black py-4 text-xl border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'جاري الإرسال...' : 'اطلب الآن'}
        </button>

        <p className="font-tajawal text-xs text-[#d0c5b2] text-center">
          🔒 بياناتك محمية ومشفرة ولن تُشارك مع أي جهة
        </p>
      </form>
    </div>
  )
}
