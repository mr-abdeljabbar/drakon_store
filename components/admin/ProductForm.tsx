'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Feature { icon: string; title: string; desc: string }
interface Ingredient { name: string; desc: string }

interface Props {
  product?: {
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
  }
}

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [name, setName] = useState(product?.name ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [subtitle, setSubtitle] = useState(product?.subtitle ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [price, setPrice] = useState(product?.price ?? 0)
  const [originalPrice, setOriginalPrice] = useState(product?.original_price ?? 0)
  const [category, setCategory] = useState(product?.category ?? 'beard')
  const [badge, setBadge] = useState(product?.badge ?? '')
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '')
  const [features, setFeatures] = useState<Feature[]>(() => {
    try { return JSON.parse(product?.features ?? '[]') } catch { return [] }
  })
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    try { return JSON.parse(product?.ingredients ?? '[]') } catch { return [] }
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function autoSlug(val: string) {
    return val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) setImageUrl(data.url)
    else setError(data.error ?? 'Upload failed')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      slug, name, subtitle, description,
      price: Number(price), original_price: Number(originalPrice),
      category, badge, image_url: imageUrl,
      features: JSON.stringify(features),
      ingredients: JSON.stringify(ingredients),
    }

    const res = await fetch(
      isEdit ? `/api/products/${product!.id}` : '/api/products',
      {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    setSaving(false)
    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      const d = await res.json()
      setError(d.error ?? 'Something went wrong')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await fetch(`/api/products/${product!.id}`, { method: 'DELETE' })
    router.push('/admin/products')
    router.refresh()
  }

  const inputClass = 'w-full bg-surface-high border-b border-drakon-border focus:border-gold outline-none px-3 py-2 text-drakon-text placeholder:text-drakon-muted/50 transition-colors font-montserrat text-sm'
  const labelClass = 'block text-xs text-drakon-muted uppercase tracking-widest mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

      {/* Basic info */}
      <div className="bg-surface-mid border border-drakon-border p-6 space-y-5">
        <h2 className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest border-b border-drakon-border pb-3">
          Basic Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Product Name *</label>
            <input
              value={name} required
              onChange={(e) => {
                setName(e.target.value)
                if (!isEdit) setSlug(autoSlug(e.target.value))
              }}
              className={inputClass} placeholder="زيت اللحية الملكي"
            />
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <input value={slug} required onChange={(e) => setSlug(autoSlug(e.target.value))} className={inputClass} placeholder="beard-oil" dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputClass} placeholder="المجموعة المميزة" />
          </div>
          <div>
            <label className={labelClass}>Badge</label>
            <input value={badge} onChange={(e) => setBadge(e.target.value)} className={inputClass} placeholder="NEW ARRIVAL" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            value={description} required rows={3}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="وصف المنتج..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Price (MAD) *</label>
            <input type="number" value={price} required min={0} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>Original Price (MAD)</label>
            <input type="number" value={originalPrice} min={0} onChange={(e) => setOriginalPrice(Number(e.target.value))} className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} cursor-pointer`}>
              <option value="beard">Beard</option>
              <option value="hair">Hair</option>
              <option value="skin">Skin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Image upload */}
      <div className="bg-surface-mid border border-drakon-border p-6">
        <h2 className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest border-b border-drakon-border pb-3 mb-5">
          Product Image
        </h2>
        <p className="text-xs text-drakon-muted mb-4">Recommended: <span className="text-gold">800 × 800 px</span>, square, JPG/PNG/WEBP, max 3 MB</p>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {imageUrl ? (
            <div className="relative w-32 h-32 border border-drakon-border flex-shrink-0">
              <Image src={imageUrl} alt="Product" fill sizes="128px" className="object-contain" />
              <button type="button" onClick={() => setImageUrl('')} className="absolute top-1 right-1 bg-surface text-drakon-muted hover:text-red-400 text-xs w-5 h-5 flex items-center justify-center">✕</button>
            </div>
          ) : (
            <div className="w-32 h-32 border border-dashed border-drakon-border flex items-center justify-center text-drakon-muted text-xs flex-shrink-0">
              No image
            </div>
          )}
          <div>
            <label className="cursor-pointer inline-block bg-surface-high border border-drakon-border hover:border-gold text-drakon-muted hover:text-gold font-montserrat text-xs px-4 py-2 transition-colors">
              {uploading ? 'Uploading...' : 'Choose Image'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-surface-mid border border-drakon-border p-6">
        <div className="flex items-center justify-between border-b border-drakon-border pb-3 mb-5">
          <h2 className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Features</h2>
          <button type="button" onClick={() => setFeatures([...features, { icon: '✨', title: '', desc: '' }])}
            className="text-gold hover:text-gold-light font-montserrat text-xs">+ Add</button>
        </div>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div key={i} className="grid grid-cols-[40px_1fr_1fr_auto] gap-2 items-start">
              <input value={f.icon} onChange={(e) => { const a = [...features]; a[i].icon = e.target.value; setFeatures(a) }}
                className={`${inputClass} text-center`} placeholder="💧" />
              <input value={f.title} onChange={(e) => { const a = [...features]; a[i].title = e.target.value; setFeatures(a) }}
                className={inputClass} placeholder="Title" />
              <input value={f.desc} onChange={(e) => { const a = [...features]; a[i].desc = e.target.value; setFeatures(a) }}
                className={inputClass} placeholder="Description" />
              <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                className="text-drakon-muted hover:text-red-400 transition-colors mt-2">✕</button>
            </div>
          ))}
          {features.length === 0 && <p className="text-drakon-muted text-xs">No features added yet.</p>}
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-surface-mid border border-drakon-border p-6">
        <div className="flex items-center justify-between border-b border-drakon-border pb-3 mb-5">
          <h2 className="font-montserrat text-xs text-drakon-muted uppercase tracking-widest">Ingredients</h2>
          <button type="button" onClick={() => setIngredients([...ingredients, { name: '', desc: '' }])}
            className="text-gold hover:text-gold-light font-montserrat text-xs">+ Add</button>
        </div>
        <div className="space-y-4">
          {ingredients.map((ing, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-start">
              <input value={ing.name} onChange={(e) => { const a = [...ingredients]; a[i].name = e.target.value; setIngredients(a) }}
                className={inputClass} placeholder="Ingredient name" />
              <input value={ing.desc} onChange={(e) => { const a = [...ingredients]; a[i].desc = e.target.value; setIngredients(a) }}
                className={inputClass} placeholder="Description" />
              <button type="button" onClick={() => setIngredients(ingredients.filter((_, j) => j !== i))}
                className="text-drakon-muted hover:text-red-400 transition-colors mt-2">✕</button>
            </div>
          ))}
          {ingredients.length === 0 && <p className="text-drakon-muted text-xs">No ingredients added yet.</p>}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" disabled={saving}
          className="bg-gold text-surface-base font-montserrat font-bold text-sm px-8 py-3 hover:bg-gold-light transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="font-montserrat text-sm text-drakon-muted hover:text-drakon-text transition-colors">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="font-montserrat text-sm text-red-400 hover:text-red-300 transition-colors ml-auto">
            Delete Product
          </button>
        )}
      </div>
    </form>
  )
}
