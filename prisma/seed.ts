import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const names = [
  'محمد أمين', 'عبد الرحيم بنعلي', 'يوسف الإدريسي', 'رشيد المنصوري',
  'أحمد بوعزة', 'كريم الزياني', 'سمير الشرقي', 'عمر الطاهر',
  'نور الدين بركات', 'إسماعيل الفاسي', 'عادل بنسعيد', 'محمد الأمين',
  'عبد اللطيف القاسمي', 'هشام العلوي', 'أيوب الخطيب', 'طارق بوشتا',
  'وليد الحسيني', 'زكريا العمراني', 'بدر الدين السوسي', 'حمزة المراكشي',
  'ياسين الأحمدي', 'سعد الغازي', 'مصطفى البقالي', 'إبراهيم التازي',
  'رضا الوردي', 'حسن مصطفى', 'خالد بنيحيى', 'فاروق الصبيري',
  'نبيل العسري', 'جمال الدين رحموني',
]

const phones = [
  '+212661234567', '+212671234568', '+212651234569', '+212601234570',
  '+212671111222', '+212661332211', '+212651443322', '+212601554433',
  '+212671665544', '+212661776655', '+212651887766', '+212601998877',
  '+212671009988', '+212661120099', '+212651231100', '+212601342211',
  '+212671453322', '+212661564433', '+212651675544', '+212601786655',
  '+212671897766', '+212661908877', '+212651019988', '+212601130099',
  '+212671241100', '+212661352211', '+212651463322', '+212601574433',
  '+212671685544', '+212661796655',
]

const cities = [
  'الدار البيضاء', 'الرباط', 'مراكش', 'فاس', 'أكادير',
  'طنجة', 'مكناس', 'وجدة', 'القنيطرة', 'تطوان',
]

const products = ['زيت اللحية الملكي', 'غسول الفحم النشط', 'شامبو الأرز الملكي']
const prices: Record<string, number> = {
  'زيت اللحية الملكي': 250,
  'غسول الفحم النشط': 85,
  'شامبو الأرز الملكي': 120,
}

const sources = ['facebook', 'facebook', 'facebook', 'instagram', 'instagram', 'direct', 'tiktok'] as const
const statuses = ['new', 'new', 'new', 'sent', 'accepted', 'rejected'] as const
const qualities = ['high', 'high', 'medium', 'medium', 'low'] as const
const campaigns = [
  'ramadan-2024', 'summer-promo', 'beard-care', null, null,
  'instagram-reel', 'facebook-video', 'retargeting', null,
]

function randomItem<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(Math.floor(Math.random() * 20) + 2)
  d.setMinutes(Math.floor(Math.random() * 60))
  return d
}

async function main() {
  console.log('🌱 Seeding database with 30 demo leads...')

  await prisma.lead.deleteMany()

  const leads = names.map((name, i) => {
    const product = randomItem(products)
    const qty = Math.random() > 0.7 ? 2 : 1
    const source = randomItem(sources)
    const campaign = randomItem(campaigns)

    return {
      name,
      phone: phones[i],
      city: randomItem(cities),
      address: Math.random() > 0.4 ? `حي ${randomItem(['السلام', 'النور', 'الفتح', 'المحمدي'])}, شارع رقم ${Math.floor(Math.random() * 50) + 1}` : null,
      product_name: product,
      quantity: qty,
      total_price: prices[product] * qty,
      source,
      campaign: campaign ?? null,
      fbclid: source === 'facebook' ? `FB.${Math.random().toString(36).slice(2, 12)}` : null,
      status: randomItem(statuses),
      quality_score: randomItem(qualities),
      created_at: daysAgo(Math.floor(Math.random() * 30)),
    }
  })

  for (const lead of leads) {
    await prisma.lead.create({ data: lead })
  }

  const total = await prisma.lead.count()
  console.log(`✅ Seeded ${total} leads successfully.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
