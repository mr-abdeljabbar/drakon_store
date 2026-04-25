import type { Metadata } from 'next'
import { Cairo, Tajawal, Montserrat } from 'next/font/google'
import './globals.css'
import { FacebookPixel } from '@/components/shared/FacebookPixel'
import { SourceTracker } from '@/components/shared/SourceTracker'
import { Suspense } from 'react'

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'DRAKON MEN\'S CARE — منتجات عناية رجالية فاخرة',
  description: 'منتجات عناية رجالية فاخرة من المغرب. زيت اللحية الملكي، غسول الفحم النشط، شامبو الأرز.',
  keywords: 'عناية رجالية، زيت لحية، المغرب، منتجات طبيعية',
  openGraph: {
    title: 'DRAKON MEN\'S CARE',
    description: 'صُنع للرجل الحقيقي',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body className={`${cairo.variable} ${tajawal.variable} ${montserrat.variable}`}>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <SourceTracker />
        {children}
      </body>
    </html>
  )
}
