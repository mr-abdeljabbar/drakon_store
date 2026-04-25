import Link from 'next/link'
import { HeroImageBox } from './HeroImageBox'
import { HeroTicker } from './HeroTicker'

export function Hero() {
  return (
    <section className="relative bg-surface-base overflow-hidden">
      {/* Gold accent line top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text — right column in RTL */}
          <div className="text-right order-1">
            <p className="font-cairo text-sm tracking-widest text-gold mb-4">
              دراكون للعناية الرجالية
            </p>
            <h1 className="font-cairo font-bold text-4xl md:text-6xl text-drakon-text leading-tight mb-6">
              صُنع للرجل
              <span className="block text-gold mt-1">الحقيقي</span>
            </h1>
            <p className="font-tajawal text-lg text-drakon-muted mb-10 leading-relaxed">
              منتجات عناية فاخرة، مصنوعة بمكونات طبيعية مغربية أصيلة.
              <span className="block mt-1 text-base">لأن الرجل القوي يستحق الأفضل.</span>
            </p>
            {/* Desktop button — centered, hidden on mobile */}
            <div className="hidden md:flex justify-center">
              <Link
                href="/#products"
                className="inline-block bg-gold text-surface-base font-cairo font-bold px-8 py-4 text-base tracking-wide hover:bg-gold-light transition-colors"
              >
                اكتشف المنتجات
              </Link>
            </div>
          </div>

          {/* Image — left column in RTL */}
          <div className="order-2 flex justify-center md:justify-start px-4 md:px-0">
            <div className="w-full max-w-xs md:max-w-full">
              <HeroImageBox
                src="/hero-man.png"
                badge="إصدار محدود"
                goldOffsetX={20}
                goldOffsetY={20}
                borderWidth={6}
                showBadge={true}
              />
            </div>
          </div>

          {/* Mobile button — under image, centered, hidden on desktop */}
          <div className="order-3 md:hidden flex justify-center">
            <Link
              href="/#products"
              className="inline-block bg-gold text-surface-base font-cairo font-bold px-8 py-4 text-base tracking-wide hover:bg-gold-light transition-colors"
            >
              اكتشف المنتجات
            </Link>
          </div>

        </div>
      </div>

      <HeroTicker />
    </section>
  )
}
