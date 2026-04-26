export type CategorySlug = 'skin' | 'beard' | 'hair' | 'oral' | 'control' | 'supplements'

export interface Category {
  slug: CategorySlug
  en: string
  ar: string
  icon: string
}

export const CATEGORIES: Category[] = [
  { slug: 'skin',        en: 'FACE CARE',          ar: 'العناية بالوجه',   icon: '⚔️' },
  { slug: 'beard',       en: 'BEARD',               ar: 'اللحية',           icon: '🗡️' },
  { slug: 'hair',        en: 'HAIR',                ar: 'الشعر',            icon: '⚡' },
  { slug: 'oral',        en: 'ORAL POWER',          ar: 'قوة الفم',         icon: '🔥' },
  { slug: 'control',     en: 'CONTROL',             ar: 'كونترول',          icon: '💎' },
  { slug: 'supplements', en: 'ELITE SUPPLEMENTS',   ar: 'مكملات النخبة',   icon: '🏆' },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
