import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-surface-base border-t border-drakon-border mt-10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="DRAKON MEN'S CARE"
              width={320}
              height={160}
              className="h-40 object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
              style={{ width: 'auto' }}
            />
            <p className="font-tajawal text-sm text-drakon-muted text-center max-w-xs leading-relaxed -mt-6">
              منتجات عناية رجالية فاخرة، مستوحاة من تراث المغرب ومصنوعة بأعلى معايير الجودة.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-right mt-6">
            <p className="font-cairo text-sm text-gold mb-4">
              المنتجات
            </p>
            <ul className="space-y-2">
              <li><a href="/product/beard-oil" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">زيت اللحية الملكي</a></li>
              <li><a href="/product/charcoal-cleanser" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">غسول الفحم النشط</a></li>
              <li><a href="/product/rice-shampoo" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">شامبو الأرز الملكي</a></li>
            </ul>
          </div>

          {/* Info links */}
          <div className="text-center md:text-right mt-6">
            <p className="font-cairo text-sm text-gold mb-4">
              روابط مفيدة
            </p>
            <ul className="space-y-2">
              <li><a href="/about" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">من نحن</a></li>
              <li><a href="/faq" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="/privacy" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-drakon-border mt-10 pt-6 flex items-center justify-center">
          <p className="font-cairo text-xs text-drakon-muted">
            © {new Date().getFullYear()} دراكون للعناية الرجالية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer >
  )
}
