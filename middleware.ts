/**
 * Next.js Middleware
 *
 * Protects admin routes and handles authentication redirects.
 */

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  // Allow access to login page
  if (isLoginPage) {
    // If already logged in, redirect to admin dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/blog', req.url))
    }
    return NextResponse.next()
  }

  // Protect all admin routes except login
  if (isAdminRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(new URL(`/admin/login?callbackUrl=${callbackUrl}`, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*']
}
