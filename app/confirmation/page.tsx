'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const product = params.get('product') ?? 'المنتج'
  const price = params.get('price') ?? '0'
  const qty = params.get('qty') ?? '1'

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Gold top line */}
        <div className="h-1 bg-gold mb-12" />

        {/* Icon */}
        <div className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <Image
              src="/logo.png"
              alt="DRAKON"
              width={480}
              height={240}
              className="h-60 object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
              style={{ width: 'auto' }}
            />
        </div>

        {/* Brand */}
        <p className="font-montserrat font-bold text-gold tracking-widest uppercase text-sm mb-6">
          DRAKON MEN'S CARE
        </p>

        {/* Thank you */}
        <h1 className="font-cairo font-bold text-3xl text-drakon-text mb-4">
          شكراً لطلبك!
        </h1>
        <p className="font-tajawal text-drakon-muted text-lg mb-8 leading-relaxed">
          تم استلام طلبك بنجاح.
          <br />
          سيتصل بك فريقنا قريباً لتأكيد الطلب.
        </p>

        {/* Order summary */}
        <div className="bg-surface-mid border border-drakon-border p-6 mb-8 text-right">
          <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest mb-4">
            ملخص الطلب
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="font-cairo font-bold text-gold">{price} د.م.</span>
            <span className="font-tajawal text-drakon-text text-sm">{product}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-tajawal text-drakon-muted text-sm">مجاني</span>
            <span className="font-tajawal text-drakon-muted text-sm">التوصيل</span>
          </div>
          <div className="border-t border-drakon-border mt-3 pt-3 flex justify-between items-center">
            <span className="font-cairo font-bold text-gold text-xl">{price} د.م.</span>
            <span className="font-tajawal text-drakon-text font-bold">المجموع</span>
          </div>
          <p className="font-tajawal text-xs text-drakon-muted mt-2">الكمية: {qty}</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-10 text-right">
          {[
            { step: '01', text: 'مراجعة طلبك من فريقنا' },
            { step: '02', text: 'الاتصال بك لتأكيد العنوان' },
            { step: '03', text: 'الشحن خلال 24 ساعة' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4 justify-start">
              <span className="font-montserrat text-xs text-gold bg-gold/10 border border-gold/30 w-8 h-8 flex items-center justify-center flex-shrink-0">
                {item.step}
              </span>
              <span className="font-tajawal text-sm text-drakon-muted">{item.text}</span>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block border border-gold text-gold font-cairo font-bold px-8 py-3 hover:bg-gold hover:text-surface-base transition-colors"
        >
          العودة للمتجر
        </Link>

        <p className="font-tajawal text-xs text-drakon-muted mt-6">
          للاستفسار يمكنك التواصل معنا عبر واتساب
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-base" />}>
      <ConfirmationContent />
    </Suspense>
  )
}
