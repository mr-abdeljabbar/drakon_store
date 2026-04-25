import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { HeroImageBox } from '@/components/store/HeroImageBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'من نحن | دراكون للعناية الرجالية',
  description: 'من قلب الشوارع المغربية إلى طقوس السيادة. قصة DRAKON ورسالتنا في عناية الرجل الحقيقي.',
}

const PILLARS = [
  {
    num: '01',
    title: 'الجودة المطلقة',
    desc: 'نختار فقط المكونات التي تعمل فعلاً. كل منتج هو نتيجة اختبارات مكثفة وصياغة دقيقة، لأننا نؤمن أن جسمك يستحق الأفضل.',
  },
  {
    num: '02',
    title: 'السيادة الشخصية',
    desc: 'طقوس الصباح هي انتصار يومي تبدأ به يومك. منتجاتنا تحول الروتين إلى قوة حقيقية تشعر بها من أول استخدام.',
  },
  {
    num: '03',
    title: 'الإرث الدائم',
    desc: 'نصنع منتجات تستحق أن تُتذكر. تركيبات تدوم، روائح تُطبع في الذاكرة، وجودة تجعلك تعود إليها مراراً.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-surface-base border-b border-drakon-border relative overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Right: Text */}
              <div className="text-right order-1">
                <p className="font-montserrat text-xs tracking-widest text-gold mb-4 uppercase">
                  DRAKON MEN&apos;S CARE
                </p>
                <h1 className="font-cairo font-bold text-4xl md:text-6xl text-drakon-text leading-tight mb-6">
                  من قلب الشوارع،
                  <span className="block text-gold mt-1">إلى طقوس السيادة</span>
                </h1>
                <p className="font-tajawal text-drakon-muted text-lg leading-relaxed">
                  لم نُبنَ في مكاتب زجاجية أو مختبرات معقمة. وُلدنا في الشارع المغربي الحقيقي،
                  من شعور صادق بأن الرجل يستحق أكثر مما تقدمه الماركات العالمية.
                </p>
                <div className="mt-10 w-24 h-px bg-gold" />
              </div>

              {/* Left: Logo with layered gold effect */}
              <div className="order-2 flex justify-center md:justify-start px-4 md:px-0">
                <div
                  className="relative w-full max-w-sm select-none group"
                  style={{ paddingBottom: 20, paddingLeft: 20 }}
                >
                  {/* Gold depth layer */}
                  <div
                    className="absolute bottom-0 left-0 z-0 transition-all duration-500 group-hover:bottom-[-4px] group-hover:left-[-4px]"
                    style={{
                      top: 20,
                      right: 20,
                      background: 'linear-gradient(135deg, #e6c364 0%, #C9A84C 50%, #b8943a 100%)',
                    }}
                  />
                  {/* Frame + logo */}
                  <div
                    className="relative z-10 bg-surface-mid flex items-center justify-center py-12 px-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_16px_56px_rgba(201,168,76,0.25)]"
                    style={{ border: '4px solid #1e2020', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  >
                    <Image
                      src="/logo.png"
                      alt="DRAKON MEN'S CARE"
                      width={320}
                      height={160}
                      className="w-full object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
                      style={{ height: 'auto' }}
                      priority
                    />
                    {/* Subtle gold overlay glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Badge */}
                  <div className="absolute z-20 -top-3 right-4 bg-black border border-gold px-3 py-1 rotate-12 shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:rotate-6">
                    <span className="font-montserrat text-xs text-gold tracking-widest whitespace-nowrap">
                      SINCE 2024
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* Background watermark */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 font-montserrat font-bold text-[120px] text-white/[0.02] select-none pointer-events-none leading-none">
            DRAKON
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-surface-mid border-b border-drakon-border">
          <div className="max-w-6xl mx-auto px-4 py-14 text-right">
            <div className="max-w-3xl mr-0 ml-auto text-right">
              <p className="font-cairo font-bold text-2xl md:text-3xl text-drakon-text leading-relaxed">
                &ldquo;نصنع أدوات لمن لا يقبلون بأنصاف الحلول.&rdquo;
              </p>
              <p className="font-tajawal text-drakon-muted mt-4 text-base leading-relaxed">
                DRAKON ليس مجرد علامة تجارية. هو موقف يعيشه الرجل الذي يعتني بنفسه لأنه يحترم نفسه،
                لا لأن أحداً طلب منه ذلك أو لأن الموضة تقتضيه.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Pillars */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-right mb-10">
            <p className="font-cairo text-sm text-gold mb-2">فلسفتنا</p>
            <h2 className="font-cairo font-bold text-3xl text-drakon-text">
              طقوس القوة
            </h2>
            <p className="font-tajawal text-drakon-muted mt-2">فلسفة لا تنحني</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.num} className="bg-surface-mid border border-drakon-border p-6 text-right group hover:border-gold/40 transition-colors">
                <span className="font-montserrat text-5xl font-bold text-gold/15 group-hover:text-gold/25 transition-colors block mb-4">
                  {pillar.num}
                </span>
                <h3 className="font-cairo font-bold text-drakon-text text-xl mb-3">{pillar.title}</h3>
                <p className="font-tajawal text-drakon-muted text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="gold-separator mx-4" />

        {/* Moroccan Heritage */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-right order-1">
              <p className="font-cairo text-sm text-gold mb-3">أصالة مغربية</p>
              <h2 className="font-cairo font-bold text-3xl text-drakon-text mb-4">
                جذورنا في المغرب
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="font-tajawal text-drakon-muted leading-relaxed mb-4">
                التميز عندنا ليس شعاراً نرفعه، بل التزام نعيشه في كل تفصيل. مكوناتنا تأتي مباشرة من
                قلب الطبيعة المغربية: زيت أركان معتصر يدوياً، وطين أطلسي نقي، وزيوت عطرية مقطرة
                بطرق تقليدية توارثناها جيلاً بعد جيل.
              </p>
              <p className="font-tajawal text-drakon-muted leading-relaxed">
                نجمع هذا الإرث العريق مع أحدث ما توصلت إليه علوم العناية بالبشرة، لنقدم لك منتجاً
                يحمل روح المغرب ويواكب متطلبات الرجل المعاصر.
              </p>
            </div>

            <div className="order-2 grid grid-cols-2 gap-4">
              {[
                { num: '100%', label: 'مكونات طبيعية' },
                { num: '+10K', label: 'عميل راضٍ' },
                { num: '48h', label: 'توصيل سريع' },
                { num: '3', label: 'منتجات مميزة' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-mid border border-drakon-border p-6 text-center">
                  <p className="font-cairo font-bold text-3xl text-gold mb-2">{stat.num}</p>
                  <p className="font-tajawal text-drakon-muted text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-separator mx-4" />

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Right: Text */}
            <div className="text-right order-1">
              <p className="font-cairo text-sm text-gold mb-3">اكتشف المجموعة</p>
              <h2 className="font-cairo font-bold text-3xl md:text-4xl text-drakon-text mb-4">
                انضم إلى رجال DRAKON
              </h2>
              <p className="font-tajawal text-drakon-muted max-w-lg mb-8 leading-relaxed">
                منتجات صُنعت لمن يعرف أن الاهتمام بالنفس ليس ترفاً، بل هو أول خطوة في طريق الرجل القوي.
              </p>
              <Link
                href="/#products"
                className="inline-block bg-gold text-surface-base font-cairo font-bold px-10 py-4 text-base tracking-wide hover:bg-gold-light transition-colors"
              >
                تسوق الآن
              </Link>
            </div>

            {/* Left: Portrait with HeroImageBox */}
            <div className="order-2 flex justify-center md:justify-start px-4 md:px-0">
              <div className="w-full max-w-xs md:max-w-sm">
                <HeroImageBox
                  src="/about.png"
                  alt="رجل DRAKON"
                  badge="انضم إلينا"
                  goldOffsetX={16}
                  goldOffsetY={16}
                  borderWidth={5}
                  showBadge={true}
                />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
