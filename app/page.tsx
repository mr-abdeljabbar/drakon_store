export const dynamic = 'force-dynamic'

import { Header } from '@/components/store/Header'
import { Hero } from '@/components/store/Hero'
import { ProductsGrid } from '@/components/store/ProductsGrid'
import { HeroImageBox } from '@/components/store/HeroImageBox'
import { Footer } from '@/components/store/Footer'
import { DEFAULT_PRODUCTS, parseFeatures, parseIngredients } from '@/lib/products'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getProducts() {
  const count = await prisma.product.count()
  if (count === 0) await prisma.product.createMany({ data: DEFAULT_PRODUCTS })
  return prisma.product.findMany({ where: { active: true }, orderBy: { created_at: 'asc' } })
}

export default async function HomePage() {
  const dbProducts = await getProducts()
  const products = dbProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    name_fr: '',
    description: p.description,
    description_fr: '',
    price: p.price,
    original_price: p.original_price,
    category: p.category as 'beard' | 'hair' | 'skin',
    badge: p.badge || undefined,
    image_url: p.image_url || undefined,
    features: parseFeatures(p.features),
    ingredients: parseIngredients(p.ingredients),
  }))
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Products Section */}
        <section id="products" className="max-w-6xl mx-auto px-4 py-16">
          {/* Section header */}
          <div className="text-right mb-10">
            <p className="font-cairo text-sm text-gold mb-2">
              المجموعة المميزة
            </p>
            <h2 className="font-cairo font-bold text-3xl text-drakon-text">
              منتجاتنا المميزة
            </h2>
          </div>

          <ProductsGrid products={products} />
        </section>

        {/* Gold separator */}
        <div className="gold-separator mx-4" />

        {/* Trust section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🌿', title: 'مكونات طبيعية', desc: 'نختار أجود المكونات الطبيعية المغربية الأصيلة' },
              { icon: '🔬', title: 'مختبر درماتولوجياً', desc: 'تركيبات مجربة ومعتمدة طبياً لسلامة بشرتك' },
              { icon: '🚀', title: 'توصيل سريع', desc: 'نوصل لجميع مدن المغرب خلال 24-48 ساعة' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-surface-mid border border-drakon-border text-right">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-cairo font-bold text-drakon-text text-lg mb-2">{item.title}</h3>
                <p className="font-tajawal text-sm text-drakon-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured CTA */}
        {(() => {
          const featured = products.find((p) => p.slug === 'beard-oil') ?? products[0]
          if (!featured) return null
          return (
            <section className="bg-surface-base border-y border-drakon-border">
              <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                  {/* Image */}
                  <div className="flex justify-center md:justify-start px-6 md:px-0">
                    <div className="w-full max-w-xs md:max-w-sm">
                      <HeroImageBox
                        src={featured.image_url || '/hero-man.png'}
                        badge="عرض محدود"
                        goldOffsetX={16}
                        goldOffsetY={16}
                        borderWidth={5}
                        showBadge={true}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-right">
                    <p className="font-cairo text-sm text-gold mb-4">عرض محدود</p>
                    <h2 className="font-cairo font-bold text-3xl md:text-4xl text-drakon-text mb-4">
                      {featured.name}
                    </h2>
                    <p className="font-tajawal text-drakon-muted text-lg mb-2">
                      <span className="line-through text-drakon-muted/50 ml-2">{featured.original_price} د.م.</span>
                      <span className="text-gold font-cairo font-bold text-2xl">{featured.price} د.م.</span>
                    </p>
                    <p className="font-tajawal text-sm text-drakon-muted mb-8">
                      توصيل مجاني — الكميات محدودة
                    </p>
                    <Link
                      href={`/product/${featured.slug}`}
                      className="inline-block bg-gold text-surface-base font-cairo font-bold px-10 py-4 text-lg tracking-wide hover:bg-gold-light transition-colors"
                    >
                      اطلب الآن
                    </Link>
                  </div>

                </div>
              </div>
            </section>
          )
        })()}
      </main>
      <Footer />
    </>
  )
}
