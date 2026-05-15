// middleware.ts
// À placer à la RACINE du projet front/ (même niveau que next.config.ts)
//
// Ce middleware injecte le pathname dans les headers de chaque requête.
// Le layout.tsx le lit via headers() pour savoir s'il est sur la landing page
// et masquer NavBar + StarField en conséquence.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  // Injecte le pathname courant dans un header custom
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

// Appliquer à toutes les routes (sauf fichiers statiques et API Next.js internes)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\.png$|.*\\.svg$).*)',
  ],
}