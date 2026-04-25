'use client'

import { useState } from 'react'
import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'

const FAQS = [
  {
    q: 'متى يصل طلبي؟',
    a: 'تتم معالجة جميع الطلبات خلال 24 ساعة من تأكيد الطلب. يستغرق التوصيل داخل المغرب من 24 إلى 48 ساعة عمل حسب المدينة.',
  },
  {
    q: 'ما هي طرق الدفع المتاحة؟',
    a: 'نقبل الدفع عند الاستلام (cash on delivery) في جميع مدن المغرب. يمكنك أيضاً الدفع عبر بطاقات الائتمان عند توفر الخيار في منطقتك.',
  },
  {
    q: 'كيف أستخدم زيت اللحية الملكي؟',
    a: 'ضع 3 إلى 5 قطرات في راحة يدك، افركهما معاً لتدفئة الزيت، ثم دلّك لحيتك من الجذور حتى الأطراف. يُستحسن الاستخدام يومياً بعد الاستحمام للحصول على أفضل النتائج.',
  },
  {
    q: 'هل يمكنني إرجاع المنتج؟',
    a: 'لا يمكن إرجاع منتجات العناية الشخصية بعد فتحها لأسباب صحية. أما في حالة وصول المنتج تالفاً أو معيباً، نستبدله فوراً بدون أي تكلفة إضافية.',
  },
  {
    q: 'هل منتجاتكم طبيعية 100%؟',
    a: 'نعم، نستخدم مكونات طبيعية 100% في جميع تركيباتنا. منتجاتنا خالية من البارابين والمواد الكيميائية الضارة، ومختبرة درماتولوجياً لضمان سلامة بشرتك.',
  },
  {
    q: 'هل تشحنون لجميع مدن المغرب؟',
    a: 'نعم، نوصل لجميع مدن ومناطق المملكة المغربية. التوصيل مجاني على جميع الطلبات بدون حد أدنى للطلب.',
  },
  {
    q: 'كيف أتواصل مع فريق خدمة العملاء؟',
    a: 'يمكنك التواصل معنا عبر واتساب على الرقم الموجود في أسفل الصفحة، أو عبر البريد الإلكتروني. فريقنا متاح من الاثنين إلى السبت من 9 صباحاً حتى 9 مساءً.',
  },
  {
    q: 'هل يمكنني طلب كميات كبيرة؟',
    a: 'بالتأكيد! نرحب بالطلبات الكبيرة ونقدم أسعاراً خاصة للكميات. تواصل معنا مباشرة عبر واتساب للحصول على عرض مخصص.',
  },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-drakon-border bg-surface-mid">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
      >
        <span
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-colors font-montserrat text-xs font-bold ${
            open ? 'border-gold text-gold bg-gold/10' : 'border-drakon-border text-drakon-muted'
          }`}
        >
          {open ? '−' : '+'}
        </span>
        <span className="flex-1 font-cairo font-bold text-drakon-text text-sm md:text-base text-right">
          {q}
        </span>
        <span className="font-montserrat text-xs text-gold/50 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-drakon-border/50">
          <p className="font-tajawal text-drakon-muted text-sm leading-relaxed text-right pt-4">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-surface-base border-b border-drakon-border">
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="max-w-6xl mx-auto px-4 py-14 text-right">
            <p className="font-montserrat text-xs tracking-widest text-gold mb-3 uppercase">
              DRAKON MEN&apos;S CARE
            </p>
            <h1 className="font-cairo font-bold text-4xl md:text-5xl text-drakon-text mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="font-tajawal text-drakon-muted text-lg max-w-xl">
              كل ما تحتاج معرفته عن منتجاتنا، الشحن، والسياسات — في مكان واحد.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="bg-surface-mid border border-drakon-border p-8 md:p-12 text-right">
            <div className="border-r-4 border-gold pr-6">
              <h2 className="font-cairo font-bold text-2xl text-drakon-text mb-3">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="font-tajawal text-drakon-muted mb-6">
                فريقنا جاهز للمساعدة. تواصل معنا مباشرة وسنجيبك في أقرب وقت.
              </p>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-surface-base font-cairo font-bold px-8 py-3 hover:bg-gold-light transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.868l6.186-1.622A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.001-1.372l-.36-.213-3.722.976 1.001-3.633-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
