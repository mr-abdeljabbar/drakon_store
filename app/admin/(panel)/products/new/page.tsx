import { ProductForm } from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Products</p>
        <h1 className="font-montserrat text-2xl font-bold text-drakon-text mt-1">New Product</h1>
      </div>
      <ProductForm />
    </div>
  )
}
