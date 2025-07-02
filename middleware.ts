import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin/dashboard')

  if (isAdminRoute && (!token || token.role !== 'admin')) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
