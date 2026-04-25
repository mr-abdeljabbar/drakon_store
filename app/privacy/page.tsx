import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | دراكون للعناية الرجالية',
  description: 'نحمي بياناتك بنفس القوة التي نحمي بها هويتنا. اقرأ سياسة الخصوصية الخاصة بـ DRAKON.',
}

const SECTIONS = [
  {
    num: '01',
    title: 'حماية البيانات',
    icon: '🔒',
    content: [
      'نجمع فقط ما نحتاجه حقاً: اسمك، رقم هاتفك، وعنوانك للتوصيل. لا شيء أكثر من ذلك، ولا تتبع مخفي من أي نوع.',
      'بياناتك تُخزَّن على خوادم مشفرة ومحمية بجدران حماية متعددة الطبقات. نتعامل معها باحترام كامل ولا نستخدمها إلا لإتمام طلبك والتواصل الضروري معك.',
      'لا نحتفظ بأي معلومات خاصة ببطاقات الدفع على خوادمنا. كل عمليات الدفع تتم عبر بوابات آمنة بتشفير SSL من الدرجة الأولى.',
    ],
  },
  {
    num: '02',
    title: 'سياسة الكوكيز',
    icon: '🍪',
    content: [
      'نستخدم كوكيز أساسية تُمكِّنك من إتمام طلباتك وتسجيل دخولك بشكل سلس. هذه الكوكيز ضرورية لتشغيل الموقع وتجربة جيدة لك.',
      'نستخدم أيضاً كوكيز تحليلية تساعدنا على فهم ما يُعجبك وما يمكن تحسينه، حتى نقدم لك تجربة أفضل في كل زيارة.',
      'في أي وقت تريد، يمكنك إيقاف الكوكيز من إعدادات متصفحك. بعض ميزات الموقع قد تتأثر بذلك، لكن الخيار دائماً بيدك.',
    ],
  },
  {
    num: '03',
    title: 'حقوقك القانونية',
    icon: '⚖️',
    content: [
      'حق الوصول منحوح لك في أي لحظة. يمكنك طلب نسخة كاملة من جميع بياناتك الشخصية المحفوظة لدينا وسنُرسلها إليك فوراً.',
      'إن أردت أن نحذف كل شيء، فهذا حقك الكامل. نمسح بياناتك بشكل نهائي وشامل من أنظمتنا دون أي تردد.',
      'إن وجدت أي خطأ في بياناتك، أخبرنا فقط وسنُصحح المعلومات في الحال. دقة بياناتك مسؤوليتنا قبل أن تكون حقك.',
    ],
  },
]

export default function PrivacyPage() {
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
              سياسة الخصوصية
            </h1>
            <p className="font-tajawal text-drakon-muted text-lg max-w-xl">
              نحمي بياناتك بنفس الجدية التي نحمي بها جودة منتجاتنا. لا تنازلات، لا استثناءات.
            </p>
            <p className="font-montserrat text-xs text-drakon-muted/60 mt-4 tracking-wide">
              آخر تحديث: 2024
            </p>
          </div>
        </section>

        {/* Intro Statement */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-surface-mid border border-gold/30 p-6 md:p-8 text-right">
            <p className="font-cairo font-bold text-xl text-gold mb-2">الشفافية المطلقة</p>
            <p className="font-tajawal text-drakon-muted leading-relaxed mb-6">
              هذه السياسة ليست مجرد نص قانوني نضعه لأن الجميع يفعل ذلك. هي ميثاق أخلاقي نلتزم به
              أمامك يومياً. نبني علاقتنا معك على ثلاثة مبادئ لا نتنازل عنها أبداً:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: '01', title: 'بياناتك ملكك وحدك' },
                { num: '02', title: 'تشفير من المستوى العسكري' },
                { num: '03', title: 'لا نبيع بياناتك أبداً' },
              ].map((rule) => (
                <div key={rule.num} className="flex items-center gap-3 border-r-2 border-gold/40 pr-4">
                  <span className="font-montserrat text-gold font-bold text-sm flex-shrink-0">{rule.num}</span>
                  <p className="font-cairo font-bold text-drakon-text text-sm flex-1 text-right">{rule.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbered Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="flex flex-col gap-8">
            {SECTIONS.map((section) => (
              <div key={section.num} className="bg-surface-mid border border-drakon-border text-right">
                {/* Section header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-drakon-border">
                  <span className="font-montserrat text-4xl font-bold text-gold/20 flex-shrink-0">{section.num}</span>
                  <span className="text-2xl flex-shrink-0">{section.icon}</span>
                  <h2 className="font-cairo font-bold text-xl text-drakon-text">{section.title}</h2>
                </div>
                {/* Section content */}
                <div className="px-6 py-6 flex flex-col gap-4">
                  {section.content.map((para, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                      <p className="font-tajawal text-drakon-muted text-sm leading-relaxed flex-1 text-right">{para}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="bg-surface-base border border-drakon-border p-8 text-right">
            <h3 className="font-cairo font-bold text-xl text-drakon-text mb-2">
              لديك سؤال عن بياناتك؟
            </h3>
            <p className="font-tajawal text-drakon-muted text-sm mb-5">
              إن أردت الوصول إلى بياناتك أو حذفها أو تصحيحها، تواصل معنا مباشرة وسنتعامل مع طلبك بأولوية قصوى.
            </p>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-surface-base font-cairo font-bold px-8 py-3 hover:bg-gold-light transition-colors text-sm"
            >
              تواصل معنا
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
