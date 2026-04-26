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

        <div className="border-t border-drakon-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="font-cairo text-xs text-drakon-muted">
              © {new Date().getFullYear()} دراكون للعناية الرجالية. جميع الحقوق محفوظة.
            </p>
            <span className="hidden sm:block text-drakon-border">|</span>
            <p className="font-cairo text-xs text-drakon-muted">
              تم تطوير المتجر بواسطة{' '}
              <a
                href="https://abdeljabar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                Abdeljabar.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61588668754019"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-drakon-muted hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/drakonmenscare/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-drakon-muted hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer >
  )
}
