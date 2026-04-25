'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-drakon-border">
      <div className="max-w-6xl mx-auto px-4 h-36 grid grid-cols-3 items-center">

        {/* Col 1 (right in RTL): Logo */}
        <Link href="/" className="flex justify-start">
          <Image
            src="/logo.png"
            alt="DRAKON MEN'S CARE"
            width={300}
            height={140}
            className="h-32 object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]"
            style={{ width: 'auto' }}
            priority
            loading="eager"
          />
        </Link>

        {/* Col 2: Nav links — centered */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link href="/" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">
            الرئيسية
          </Link>
          <Link href="/#products" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">
            المنتجات
          </Link>
          <Link href="/about" className="font-tajawal text-sm text-drakon-muted hover:text-gold transition-colors">
            من نحن
          </Link>
        </nav>

        {/* Col 3 (left in RTL): Mobile hamburger */}
        <div className="col-start-3 flex justify-end md:hidden">
          <button
            className="text-drakon-text"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

      </div>

      {/* WhatsApp sticky button */}
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] transition-colors"
        aria-label="تواصل عبر واتساب"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.83.738 5.485 2.027 7.793L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.773-1.853l-.486-.29-5.002 1.191 1.216-4.874-.317-.5A13.236 13.236 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.162-2.72-1.295-.364-.133-.63-.199-.895.199-.265.398-1.03 1.295-1.262 1.561-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.18-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.895-2.158-1.227-2.955-.322-.775-.65-.67-.895-.683l-.763-.013c-.265 0-.697.1-1.062.497-.364.398-1.394 1.362-1.394 3.32s1.427 3.85 1.626 4.116c.2.265 2.808 4.285 6.803 6.01.951.41 1.693.655 2.272.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.892-.1-.164-.364-.265-.763-.464z" />
        </svg>
      </a>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-low border-t border-drakon-border">
          <nav className="flex flex-col items-center py-3 gap-4">
            <Link href="/" className="font-tajawal text-drakon-text py-2" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link href="/#products" className="font-tajawal text-drakon-text py-2" onClick={() => setMenuOpen(false)}>المنتجات</Link>
            <Link href="/about" className="font-tajawal text-drakon-text py-2" onClick={() => setMenuOpen(false)}>من نحن</Link>
            <Link href="/faq" className="font-tajawal text-drakon-text py-2" onClick={() => setMenuOpen(false)}>الأسئلة الشائعة</Link>
            <Link href="/privacy" className="font-tajawal text-drakon-muted text-sm py-2" onClick={() => setMenuOpen(false)}>سياسة الخصوصية</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
