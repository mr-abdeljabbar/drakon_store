export const dynamic = 'force-dynamic'

import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import { ProductsGrid } from '@/components/store/ProductsGrid'
import { DEFAULT_PRODUCTS, parseFeatures, parseIngredients } from '@/lib/products'
import type { CategorySlug } from '@/lib/categories'
import { prisma } from '@/lib/prisma'

async function getAllProducts() {
  const count = await prisma.product.count()
  if (count === 0) await prisma.product.createMany({ data: DEFAULT_PRODUCTS })
  return prisma.product.findMany({ where: { active: true }, orderBy: { created_at: 'asc' } })
}

export default async function ProductsPage() {
  const dbProducts = await getAllProducts()
  const products = dbProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    name_fr: '',
    description: p.description,
    description_fr: '',
    price: p.price,
    original_price: p.original_price,
    category: p.category as CategorySlug,
    badge: p.badge || undefined,
    image_url: p.image_url || undefined,
    features: parseFeatures(p.features),
    ingredients: parseIngredients(p.ingredients),
  }))

  return (
    <>
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-right mb-10">
            <p className="font-cairo text-sm text-gold mb-2">جميع المنتجات</p>
            <h1 className="font-cairo font-bold text-3xl text-drakon-text">متجرنا الكامل</h1>
          </div>
          <ProductsGrid products={products} />
        </section>
      </main>
      <Footer />
    </>
  )
}
