import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { headers } from 'next/headers'
import NavBar from '@/components/NavBar'
import { StarField } from '@/components/StarField'
import './globals.css'

// ── Fonts — inchangés ──────────────────────────────────────────────────────
const _geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})
const _geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

// ── Metadata — inchangée ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'EventSync - Engage Audiences Live',
  description:
    'Real-time event engagement platform. Interactive Q&A, live sessions, and seamless participant experience.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

// ── Layout ─────────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // Lire le pathname côté serveur pour masquer la nav sur la landing page.
  // headers() donne accès à x-pathname qu'on injecte via middleware.ts
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isLanding = pathname === '/'

  return (
    <html
      lang="en"
      className={`${_geist.variable} ${_geistMono.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">

        {/* StarField et NavBar masqués sur la landing — elle gère son propre fond et nav */}
        {!isLanding && <StarField />}
        {!isLanding && <NavBar />}

        <main className={!isLanding ? 'pt-24 pb-12 relative z-10' : ''}>
          {children}
        </main>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}