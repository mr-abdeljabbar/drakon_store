export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import { OrderForm } from '@/components/store/OrderForm'
import { prisma } from '@/lib/prisma'
import { parseFeatures, parseIngredients, DEFAULT_PRODUCTS } from '@/lib/products'
import { getCategoryBySlug } from '@/lib/categories'
import type { CategorySlug } from '@/lib/categories'
import { ProductCard } from '@/components/store/ProductCard'
import { MobileCartBar } from '@/components/store/MobileCartBar'
import { QuantityProvider } from '@/components/store/QuantityContext'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

async function getProduct(slug: string) {
  const count = await prisma.product.count()
  if (count === 0) await prisma.product.createMany({ data: DEFAULT_PRODUCTS })
  return prisma.product.findUnique({ where: { slug, active: true } })
}

async function getOtherProducts(slug: string) {
  return prisma.product.findMany({
    where: { active: true, NOT: { slug } },
    orderBy: { created_at: 'asc' },
    take: 1,
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'المنتج غير موجود' }
  return {
    title: `${product.name} — دراكون للعناية الرجالية`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const otherDbProducts = await getOtherProducts(slug)
  const otherProducts = otherDbProducts.map((p) => ({
    slug: p.slug, name: p.name, name_fr: '', description: p.description,
    description_fr: '', price: p.price, original_price: p.original_price,
    category: p.category as CategorySlug,
    badge: p.badge || undefined, image_url: p.image_url || undefined,
    features: parseFeatures(p.features), ingredients: parseIngredients(p.ingredients),
  }))

  const features = parseFeatures(product.features)
  const ingredients = parseIngredients(product.ingredients)
  const discount = product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <QuantityProvider>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 justify-start mb-8 font-tajawal text-sm text-drakon-muted">
          <a href="/" className="hover:text-gold transition-colors">الرئيسية</a>
          <span>/</span>
          <a href="/#products" className="hover:text-gold transition-colors">المنتجات</a>
          <span>/</span>
          <span className="text-drakon-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: Product Info */}
          <div className="text-right">
            {product.badge && (
              <span className="inline-block font-montserrat text-xs bg-gold text-surface-base px-3 py-1 tracking-widest uppercase mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="font-cairo font-bold text-3xl md:text-4xl text-drakon-text leading-tight mb-2">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="font-cairo text-sm text-drakon-muted mb-6">{product.subtitle}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-row-reverse mb-6">
              <span className="font-cairo font-bold text-gold text-4xl">
                {product.price}<span className="text-2xl mr-1">د.م.</span>
              </span>
              {product.original_price > product.price && (
                <>
                  <span className="font-cairo text-drakon-muted line-through text-xl">
                    {product.original_price} د.م.
                  </span>
                  <span className="font-montserrat text-xs bg-gold/20 text-gold border border-gold/30 px-2 py-0.5">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="font-tajawal text-drakon-muted leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-cairo font-bold text-drakon-text text-lg mb-4">المميزات الرئيسية</h3>
                <div className="grid grid-cols-1 gap-3">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 flex-row-reverse bg-surface-mid p-4 border border-drakon-border">
                      <span className="text-2xl flex-shrink-0">{f.icon}</span>
                      <div className="flex-1 text-right">
                        <p className="font-cairo font-bold text-drakon-text text-sm">{f.title}</p>
                        <p className="font-tajawal text-drakon-muted text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="mb-8">
                <h3 className="font-cairo font-bold text-drakon-text text-lg mb-4">المكونات الرئيسية</h3>
                <div className="flex flex-col gap-3">
                  {ingredients.map((ing, i) => (
                    <div key={i} className="flex items-start gap-3 flex-row-reverse border-r-2 border-gold pr-4">
                      <div className="flex-1 text-right">
                        <p className="font-cairo font-bold text-drakon-text text-sm">{ing.name}</p>
                        <p className="font-tajawal text-drakon-muted text-xs mt-0.5">{ing.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex gap-3 flex-row-reverse flex-wrap justify-center">
              {['مختبر درماتولوجياً', 'مكونات طبيعية', 'توصيل مجاني'].map((b) => (
                <span key={b} className="font-tajawal text-xs border border-drakon-border text-drakon-muted px-3 py-1">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Product image + Order form */}
          <div>
            {/* Product image */}
            <div className="bg-surface-mid border border-drakon-border aspect-square flex items-center justify-center mb-6 relative overflow-hidden">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" />
              ) : (
                <>
                  <div className="text-9xl opacity-20">
                    {getCategoryBySlug(product.category)?.icon ?? '✨'}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="font-montserrat font-bold text-2xl tracking-widest text-gold/40 uppercase">DRAKON</p>
                    <p className="font-cairo text-sm text-drakon-muted/30 mt-1">{product.name}</p>
                  </div>
                </>
              )}
            </div>

            {/* Order form */}
            <div id="order-form">
              <OrderForm product={{ slug: product.slug, name: product.name, price: product.price, original_price: product.original_price, category: product.category as CategorySlug, badge: product.badge || undefined, features: features, ingredients: ingredients, description: product.description, name_fr: '', description_fr: '' }} />
            </div>
          </div>
        </div>

        {/* More products */}
        {otherProducts.length > 0 && (
          <>
            <div className="gold-separator" />
            <div className="text-right">
              <h2 className="font-cairo font-bold text-2xl text-drakon-text mb-6">منتجات أخرى</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />

      <MobileCartBar price={product.price} productName={product.name} />
      <div className="md:hidden h-28" />
    </QuantityProvider>
  )
}
