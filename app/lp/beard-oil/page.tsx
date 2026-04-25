import type { Metadata } from 'next'
import Image from 'next/image'
import { QuantityProvider } from '@/components/store/QuantityContext'
import { LpOrderForm } from './LpOrderForm'
import { Countdown } from './Countdown'

export const metadata: Metadata = {
  title: 'طقوس القوة — زيت اللحية الملكي | DRAKON',
  description: 'زيت اللحية الملكي دراكون — الأرغان الخالص، العود الملكي، خشب الصندل. 250 درهم. الدفع عند الاستلام. توصيل لجميع مدن المغرب.',
}

const HERO_IMG    = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxKkcq17uRysIVOkquc1CkxQxJ54p9m2LukPAyI5rLI3LqoCgU1xGbeCEsapGiwsw7V0lXn9cVAJmcwCA-H4FWDFmb4bUaXhyL6aBQ6D5LnVfZJt_Hn0p-vZaMS-9OQTFLA6mWYTIwVRkF2r3ris1lssv5jRUbmxg1wLUtN0J44qyHrphoFjGR2-m2QCYIY2cuyoMDXLxS3XA4RbPh5pMPS7HofmYPVtdCJQlcmD1oM4If75ZEEbVO3yhWAyhgdfT-y6GkFh2Ji5Y'
const ARGAN_IMG   = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG4EzsgCDvSpkOVf0O09NDeRq5mNnFNrYUVJ_XV6v1V2ly-yNp7zJGiHBWznFzPqc2-LMWtXvrD8Rjy8vWXR3LntprQl_B9fcwASdwy--iRS_e2s05r979M9Z4_O2OiLEGrTQSawQWLE5HeRNg5kD9IcPxTNmahnK0uNX808Q8BRSAq3Icdr8nFqh723VnFGzgL4WEsBhK1WuNRSZMfLzbGBWf85Y3jJryQp_wewQNPuSs1P4X3VHL8iey0LWsuXjOCLQOW9Ia8Xw'
const OUD_IMG     = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeM-eazBMOm3SmsE6RTlMKUhkhJnLdAHU9g2ApiSBYgKNnbBrfY912AJfUrTj7_s9Vt6UmKcbemRSzwNxnMB-_so20jKmjqPxFprSNmvufBNe-90LwI5tXH7IiW6lV4IW7j6YkPAFrNpyJiUbVmrOVDaXq1g-tqCV6Z1ulgtfDO8mdRQlIe6dhONo8XBuO7YX6dO0M7RwShcjeV-H7sKoTbuc-BhxQxy-ZQ4yTw_-MG_NYluCs-SCCXA7hhQGn9OqevwTiKyxWs04'
const SANDAL_IMG  = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT7nokqu4aM5Ruccw7cWc5h2zb4IeVVeJNSoxaR4s0h5tMLVqiIxkeZFouJ9aXbBXj4FL00J9RKU4X-s_NTrKVoGHHU3EWiVmDZlgz9B-rm1sFZ_9RGwFY4IQmAcg6jbvjmbwDb2cVSTaAv7BOHazB4MwoI7cY3IXR2wNESoCYc9Kq3IM5Lg7dq4alv4pFaz9djdyohQCcf7aZQ07ns_pnIYvtMUPmLXnTKU3pEORdLRzZhEi-z4HmuDJJBDm_aXBlfY0H63LkhIA'

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const LOGO_FILTER = 'brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]'

const product = {
  slug: 'beard-oil',
  name: 'زيت اللحية الملكي',
  name_fr: '',
  description: 'تركيبة طبيعية فاخرة لنمو لحية أكثر كثافة وصحة، برائحة العود والأرز المغربي',
  description_fr: '',
  price: 250,
  original_price: 350,
  category: 'beard' as const,
  badge: 'NEW ARRIVAL',
  features: [],
  ingredients: [],
}

const INGREDIENTS = [
  { img: ARGAN_IMG,  name: 'أرغان خالص', desc: 'ذهب المغرب السائل لترطيب لا يضاهى.' },
  { img: OUD_IMG,    name: 'عود ملكي',   desc: 'رائحة عميقة تترك أثراً في كل مكان تمر به.' },
  { img: SANDAL_IMG, name: 'خشب الصندل', desc: 'لتهدئة البشرة ومنع التهيج تحت اللحية.' },
]

const BENEFITS = [
  'توصيل سريع لجميع مدن المغرب',
  'الدفع عند الاستلام',
  'ضمان استرجاع خلال 30 يوماً',
]

const TRUST_BADGES = ['مختبر درماتولوجياً', 'مكونات طبيعية 100%', 'توصيل مجاني']

export default function BeardOilLandingPage() {
  return (
    <QuantityProvider>
      <div className="bg-surface text-drakon-text min-h-screen overflow-x-hidden">

        {/* ══ FIXED NAV — matches homepage Header height exactly ══ */}
        <header className="fixed top-0 right-0 w-full z-50 bg-surface border-b border-drakon-border">
          <div className="max-w-6xl mx-auto px-4 h-36 flex items-center justify-between">
            <Image
              src="/logo.png"
              alt="DRAKON MEN'S CARE"
              width={300}
              height={140}
              className={`h-32 object-contain ${LOGO_FILTER}`}
              style={{ width: 'auto' }}
              priority
              loading="eager"
            />
            <a
              href="#order"
              className="bg-gold text-surface-base font-cairo font-bold text-sm px-6 py-3 hover:bg-gold-light transition-colors tracking-wide"
            >
              اطلب الآن
            </a>
          </div>
        </header>

        {/* pt-36 matches the fixed nav height (h-36 = 144px) */}
        <main className="pt-36">

          {/* ══ HERO ══ */}
          <section className="relative min-h-[85vh] flex flex-col justify-end border-b border-drakon-border">
            {/* ── Background image ── */}
            <div className="absolute inset-0 z-0">
              <Image
                src={HERO_IMG}
                alt="رجل بلحية قوية في إضاءة درامية"
                fill
                className="object-contain grayscale contrast-125 brightness-50"
                priority
                sizes="100vw"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: GRAIN_SVG }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>

            {/* ── Hero text ── */}
            <div className="relative z-10 max-w-6xl mx-auto w-full px-4 pb-14 md:pb-16">
              <div className="md:max-w-xl text-right">
                <span className="inline-block bg-gold text-surface-base px-4 py-1 -rotate-2 font-montserrat font-bold text-xs tracking-widest uppercase mb-4">
                  إصدار محدود
                </span>
                <h1
                  className="font-cairo font-black leading-[0.88] tracking-tight text-drakon-text mb-5"
                  style={{ fontSize: 'clamp(56px, 12vw, 88px)' }}
                >
                  طقوس<br />القوة
                </h1>
                <p className="font-tajawal text-lg text-drakon-muted max-w-sm mb-8 leading-relaxed">
                  الزيوت العادية تلمع فقط. زيت دراكون يبني الهيبة. للرجل الذي لا يقبل الحلول الوسط.
                </p>
                <a
                  href="#order"
                  className="inline-block bg-gold text-surface-base font-cairo font-bold px-10 py-4 text-lg tracking-wide hover:bg-gold-light transition-colors"
                >
                  تسوق الإصدار المحدود
                </a>
              </div>
            </div>
          </section>

          {/* ══ PROBLEM / SOLUTION ══ */}
          <section className="bg-surface-base border-b border-drakon-border py-14 md:py-16">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="relative pt-7">
                <span className="absolute top-0 right-0 bg-gold text-surface-base px-3 py-1 font-montserrat font-bold text-xs tracking-widest uppercase">
                  لماذا نحن؟
                </span>
                <div className="border border-drakon-border p-6 md:p-8 bg-surface-mid h-full text-right">
                  <h2 className="font-cairo font-bold text-2xl md:text-3xl mb-4 text-gold">
                    الزيوت العادية تفشل.
                  </h2>
                  <p className="font-tajawal text-drakon-muted leading-relaxed">
                    معظم الزيوت في السوق هي مجرد دهون رخيصة تسد المسام وتترك لحيتك دهنية.
                    تفتقر إلى العمق، تفتقر إلى الثبات، وتفتقر إلى الشخصية.
                  </p>
                </div>
              </div>

              <div className="border border-gold/30 p-6 md:p-8 bg-surface-mid text-right">
                <h2 className="font-cairo font-bold text-2xl md:text-3xl mb-4 text-drakon-text italic">
                  اختيار الألفا.
                </h2>
                <p className="font-tajawal text-drakon-muted leading-relaxed">
                  دراكون هو نتاج هندسة عطرية دقيقة. نستخدم فقط أندر المكونات الطبيعية
                  التي تتغلغل في جذور الشعر لتعطيك كثافة حقيقية ورائحة تفرض وجودها.
                </p>
              </div>

            </div>
          </section>

          {/* ══ TESTIMONIAL — gold bg on mobile only ══ */}
          <section className="bg-gold md:bg-surface-base border-b border-drakon-border py-14 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              {/* Card: dark on mobile (against gold bg), slightly elevated on desktop */}
              <div className="bg-surface-base md:bg-surface-mid border border-black md:border-drakon-border p-8 md:p-10 text-right">
                <span className="text-gold text-5xl block leading-none mb-4 select-none font-serif">
                  &ldquo;
                </span>
                <p className="font-cairo font-bold text-xl md:text-2xl text-drakon-text mb-6 leading-relaxed">
                  هذا ليس مجرد زيت، إنه سلاح في روتيني اليومي.
                  الرائحة قوية والنتائج لا يمكن إنكارها.
                </p>
                {/* Attribution: name right (start in RTL), decorative line left */}
                <div className="flex items-center gap-4">
                  <span className="font-cairo font-bold text-drakon-muted text-sm">
                    أحمد العراقي، بطل كمال الأجسام
                  </span>
                  <div className="flex-1 h-px bg-drakon-border" />
                </div>
              </div>
            </div>
          </section>

          {/* ══ INGREDIENTS ══ */}
          <section className="bg-surface border-b border-drakon-border py-14 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-right mb-10">
                <p className="font-cairo text-sm text-gold mb-2">تركيبة فاخرة</p>
                <h2 className="font-cairo font-bold text-3xl text-drakon-text">المكونات الخام</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INGREDIENTS.map(({ img, name, desc }) => (
                  <div key={name} className="bg-surface-mid border border-drakon-border hover:border-gold/40 transition-colors overflow-hidden">

                    {/* ── Ingredient image — 4:3 ratio, easily resizable ── */}
                    <div className="relative aspect-[4/3] border-b border-drakon-border overflow-hidden">
                      <Image
                        src={img}
                        alt={name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>

                    {/* ── Ingredient info ── */}
                    <div className="p-5 text-right">
                      <h3 className="font-cairo font-bold text-xl text-gold mb-2">{name}</h3>
                      <p className="font-tajawal text-sm text-drakon-muted leading-relaxed">{desc}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ PRICING + ORDER FORM ══ */}
          <section id="order" className="bg-surface-mid border-b border-drakon-border py-14 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Value proposition — right column in RTL */}
                <div className="flex flex-col gap-6 text-right">
                  <p className="font-cairo text-sm text-gold">عرض محدود</p>
                  <h2 className="font-cairo font-bold text-3xl text-drakon-text">
                    زيت اللحية الملكي
                  </h2>

                  {/* Product image — white mat frame with gold shadow offset */}
                  <div className="relative w-full aspect-square bg-white border-2 border-gold shadow-[8px_8px_0px_0px_#C9A84C] overflow-hidden">
                    <Image
                      src="/products/1776981352299.png"
                      alt="زيت اللحية الملكي دراكون"
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                    {/* Badge */}
                    <span className="absolute top-0 left-0 z-10 font-montserrat text-xs bg-gold text-surface-base px-3 py-1.5 tracking-widest uppercase">
                      NEW ARRIVAL
                    </span>
                  </div>

                  {/* Price: current (right/start in RTL), old strikethrough (left) */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-cairo font-bold text-gold text-5xl">250</span>
                    <span className="font-cairo text-gold text-2xl">د.م.</span>
                    <span className="font-cairo text-drakon-muted text-xl line-through">350 د.م.</span>
                  </div>

                  {/* Benefits — icon first in DOM = right in RTL, text to its left */}
                  <ul className="flex flex-col gap-3">
                    {BENEFITS.map((b) => (
                      <li key={b} className="flex items-center gap-3 font-tajawal text-drakon-muted text-sm">
                        <span className="text-gold text-base leading-none flex-shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="gold-separator" />

                  {/* Trust badges — right-aligned, icon before text in DOM */}
                  <div className="flex flex-wrap gap-3">
                    {TRUST_BADGES.map((t) => (
                      <span key={t} className="font-tajawal text-xs border border-drakon-border text-drakon-muted px-3 py-1">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Order form — left column in RTL */}
                <div className="flex flex-col gap-4">
                  <Countdown />
                  <LpOrderForm product={product} />
                </div>

              </div>
            </div>
          </section>

        </main>

        {/* ══ FOOTER ══ */}
        <footer className="bg-surface-base border-t border-drakon-border py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <Image
              src="/logo.png"
              alt="DRAKON MEN'S CARE"
              width={200}
              height={94}
              className={`h-20 object-contain ${LOGO_FILTER}`}
              style={{ width: 'auto' }}
            />
            <nav className="flex flex-wrap justify-center gap-6">
              {[
                { href: '/',                   label: 'الرئيسية' },
                { href: '/product/beard-oil',  label: 'صفحة المنتج' },
                { href: '/faq',                label: 'الأسئلة الشائعة' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </footer>

        {/* ══ STICKY BOTTOM CTA ══ */}
        <div className="fixed bottom-0 right-0 w-full bg-surface border-t border-drakon-border z-[60]">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <a
              href="#order"
              className="flex items-center justify-between bg-gold text-surface-base font-cairo font-bold px-8 py-4 text-base tracking-wide hover:bg-gold-light transition-colors"
            >
              {/* Icon first in DOM = right in RTL */}
              <span className="text-xl flex-shrink-0">🚚</span>
              <span>اطلب الآن · الدفع عند الاستلام</span>
            </a>
          </div>
        </div>

        <div className="h-20" />

      </div>
    </QuantityProvider>
  )
}
