'use client'

const MESSAGES = [
  'إصدار محدود 🔥 الكمية محدودة – سارع قبل النفاذ',
  'تخفيض %50 لفترة محدودة ⏳',
  'العرض كيسالي اليوم! ماتضيعش الفرصة',
  'فقط اليوم: شحن مجاني 🚚',
  'آخر القطع متبقية 👀',
]

const SEPARATOR = <span className="mx-6 text-gold opacity-60">✦</span>

function TickerContent() {
  return (
    <>
      {MESSAGES.map((msg, i) => (
        <span key={i} className="inline-flex items-center whitespace-nowrap">
          <span className="font-cairo text-xs text-drakon-muted">{msg}</span>
          {SEPARATOR}
        </span>
      ))}
    </>
  )
}

export function HeroTicker() {
  return (
    <div className="bg-surface-mid border-t border-drakon-border overflow-hidden">
      <div
        className="flex items-center py-3"
        style={{ animation: 'ticker 25s linear infinite' }}
      >
        {/* Two copies for seamless loop */}
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
