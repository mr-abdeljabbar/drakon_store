export interface Feature { icon: string; title: string; desc: string }
export interface Ingredient { name: string; desc: string }

export interface Product {
  slug: string
  name: string
  name_fr: string
  description: string
  description_fr: string
  price: number
  original_price: number
  category: 'beard' | 'hair' | 'skin'
  badge?: string
  image_url?: string
  features: Feature[]
  ingredients: Ingredient[]
}

export interface DbProduct {
  id: string
  slug: string
  name: string
  subtitle: string
  description: string
  price: number
  original_price: number
  category: string
  badge: string
  image_url: string
  features: string
  ingredients: string
  active: boolean
}

export function parseFeatures(json: string): Feature[] {
  try { return JSON.parse(json) } catch { return [] }
}

export function parseIngredients(json: string): Ingredient[] {
  try { return JSON.parse(json) } catch { return [] }
}

export const DEFAULT_PRODUCTS = [
  {
    slug: 'beard-oil',
    name: 'زيت اللحية الملكي',
    subtitle: 'المجموعة المميزة',
    description: 'تركيبة طبيعية فاخرة لنمو لحية أكثر كثافة وصحة، برائحة العود والأرز المغربي',
    price: 250,
    original_price: 350,
    category: 'beard',
    badge: 'NEW ARRIVAL',
    image_url: '',
    features: JSON.stringify([
      { icon: '💧', title: 'ترطيب عميق', desc: 'مزيج من الزيوت الطبيعية لترطيب 24 ساعة' },
      { icon: '🌿', title: 'تنشيط النمو', desc: 'محفزات طبيعية لحية أكثف وأقوى' },
      { icon: '✨', title: 'عطر ملكي', desc: 'رائحة العود والأرز المغربي الفاخر' },
    ]),
    ingredients: JSON.stringify([
      { name: 'زيت الأرغان المغربي', desc: 'ترطيب فائق ومغذي طبيعي للبشرة' },
      { name: 'فيتامين E', desc: 'حماية البشرة ومنع التهيج' },
    ]),
  },
  {
    slug: 'charcoal-cleanser',
    name: 'غسول الفحم النشط',
    subtitle: 'المجموعة المميزة',
    description: 'غسول قوي بالفحم النشط لتنظيف عميق ومشرق للبشرة الرجالية',
    price: 85,
    original_price: 120,
    category: 'skin',
    badge: 'BEST SELLER',
    image_url: '',
    features: JSON.stringify([
      { icon: '🖤', title: 'تنظيف عميق', desc: 'الفحم النشط يمتص الشوائب والدهون' },
      { icon: '💦', title: 'ترطيب متوازن', desc: 'لا يجفف البشرة بعد الغسيل' },
      { icon: '⚡', title: 'إشراق فوري', desc: 'بشرة مشرقة ومنتعشة من أول استخدام' },
    ]),
    ingredients: JSON.stringify([
      { name: 'الفحم النشط', desc: 'امتصاص الشوائب والزيوت الزائدة' },
      { name: 'حمض الهيالورونيك', desc: 'الحفاظ على رطوبة البشرة' },
    ]),
  },
  {
    slug: 'rice-shampoo',
    name: 'شامبو الأرز الملكي',
    subtitle: 'المجموعة المميزة',
    description: 'شامبو مغذي بمستخلص الأرز الياباني لشعر أقوى ولامع',
    price: 120,
    original_price: 160,
    category: 'hair',
    badge: 'POPULAR',
    image_url: '',
    features: JSON.stringify([
      { icon: '🌾', title: 'تقوية الشعر', desc: 'بروتين الأرز يقوي الشعر من الجذور' },
      { icon: '✨', title: 'لمعان طبيعي', desc: 'يمنح الشعر لمعاناً وملمساً ناعماً' },
      { icon: '🌿', title: 'مكونات طبيعية', desc: 'خالٍ من الكبريتات والبارابين' },
    ]),
    ingredients: JSON.stringify([
      { name: 'مستخلص الأرز الياباني', desc: 'بروتينات تقوي الشعر وتمنع تكسره' },
      { name: 'زيت الأرغان', desc: 'ترطيب وتلميع طبيعي للشعر' },
    ]),
  },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'beard-oil',
    name: 'زيت اللحية الملكي',
    name_fr: 'Huile à Barbe Royale',
    description: 'تركيبة طبيعية فاخرة لنمو لحية أكثر كثافة وصحة، برائحة العود والأرز المغربي',
    description_fr: 'Formule naturelle de luxe pour une barbe plus dense et plus saine',
    price: 250,
    original_price: 350,
    category: 'beard',
    badge: 'NEW ARRIVAL',
    features: [
      { icon: '💧', title: 'ترطيب عميق', desc: 'مزيج من الزيوت الطبيعية لترطيب 24 ساعة' },
      { icon: '🌿', title: 'تنشيط النمو', desc: 'محفزات طبيعية لحية أكثف وأقوى' },
      { icon: '✨', title: 'عطر ملكي', desc: 'رائحة العود والأرز المغربي الفاخر' },
    ],
    ingredients: [
      { name: 'زيت الأرغان المغربي', desc: 'ترطيب فائق ومغذي طبيعي للبشرة' },
      { name: 'فيتامين E', desc: 'حماية البشرة ومنع التهيج' },
    ],
  },
  {
    slug: 'charcoal-cleanser',
    name: 'غسول الفحم النشط',
    name_fr: 'Nettoyant au Charbon Actif',
    description: 'غسول قوي بالفحم النشط لتنظيف عميق ومشرق للبشرة الرجالية',
    description_fr: 'Nettoyant puissant au charbon pour un nettoyage profond',
    price: 85,
    original_price: 120,
    category: 'skin',
    badge: 'BEST SELLER',
    features: [
      { icon: '🖤', title: 'تنظيف عميق', desc: 'الفحم النشط يمتص الشوائب والدهون' },
      { icon: '💦', title: 'ترطيب متوازن', desc: 'لا يجفف البشرة بعد الغسيل' },
      { icon: '⚡', title: 'إشراق فوري', desc: 'بشرة مشرقة ومنتعشة من أول استخدام' },
    ],
    ingredients: [
      { name: 'الفحم النشط', desc: 'امتصاص الشوائب والزيوت الزائدة' },
      { name: 'حمض الهيالورونيك', desc: 'الحفاظ على رطوبة البشرة' },
    ],
  },
  {
    slug: 'rice-shampoo',
    name: 'شامبو الأرز الملكي',
    name_fr: 'Shampooing au Riz Royal',
    description: 'شامبو مغذي بمستخلص الأرز الياباني لشعر أقوى ولامع',
    description_fr: 'Shampooing nourrissant à l\'extrait de riz japonais',
    price: 120,
    original_price: 160,
    category: 'hair',
    badge: 'POPULAR',
    features: [
      { icon: '🌾', title: 'تقوية الشعر', desc: 'بروتين الأرز يقوي الشعر من الجذور' },
      { icon: '✨', title: 'لمعان طبيعي', desc: 'يمنح الشعر لمعاناً وملمساً ناعماً' },
      { icon: '🌿', title: 'مكونات طبيعية', desc: 'خالٍ من الكبريتات والبارابين' },
    ],
    ingredients: [
      { name: 'مستخلص الأرز الياباني', desc: 'بروتينات تقوي الشعر وتمنع تكسره' },
      { name: 'زيت الأرغان', desc: 'ترطيب وتلميع طبيعي للشعر' },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export const MOROCCAN_CITIES = [
  'الدار البيضاء',
  'الرباط',
  'سلا',
  'فاس',
  'مراكش',
  'أكادير',
  'طنجة',
  'مكناس',
  'وجدة',
  'القنيطرة',
  'تطوان',
  'الجديدة',
  'العيون',
  'بني ملال',
  'خريبكة',
  'سطات',
  'ناظور',
  'آسفي',
  'المحمدية',
  'الحسيمة',
  'تازة',
  'الراشيدية',
  'زاكورة',
  'إنزكان',
  'تيزنيت',
  'طاطا',
  'ورزازات',
  'الصويرة',
  'بركان',
  'الفقيه بن صالح',
  'قلعة السراغنة',
  'ابن جرير',
  'برشيد',
  'بنسليمان',
  'الخميسات',
  'سيدي قاسم',
  'سيدي سليمان',
  'القصر الكبير',
  'لاراش',
  'أصيلة',
  'شفشاون',
  'العرائش',
  'الدريوش',
  'جرسيف',
  'تاوريرت',
  'فجيج',
  'ميدلت',
  'إفران',
  'أزرو',
  'خنيفرة',
  'الرحامنة',
  'تارودانت',
  'طيفلت',
  'تمارة',
  'مولاي يعقوب',
  'صفرو',
  'بولمان',
  'ريصانة',
  'سيدي بنور',
  'أزيلال',
  'دمنات',
  'إمنتانوت',
  'تنغير',
  'الرصيصة',
  'كلميم',
  'سيدي إفني',
  'طانطان',
  'السمارة',
  'بوجدور',
  'الداخلة',
  'أخرى',
]
