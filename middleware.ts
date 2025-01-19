import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/_next',
  '/api',
  '/login',
  '/register',
  '/',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/about',
  '/api/docs',
  '/favicon.ico'
]

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings'
]

export function middleware(request: NextRequest) {
  const authStorage = request.cookies.get('auth-storage')
  const isAuthenticated = !!authStorage
  
  try {
    if (isAuthenticated) {
      const parsed = JSON.parse(decodeURIComponent(authStorage.value))
      const user = parsed.state.user
      const userRole = user?.role?.toLowerCase()
      const path = request.nextUrl.pathname

      // Prevent authenticated users from accessing login/register
      if (path === '/login' || path === '/register') {
        return NextResponse.redirect(new URL(userRole === 'administrator' ? '/admin' : '/dashboard', request.url))
      }

      // Handle admin routes
      if (path.startsWith('/admin')) {
        if (userRole === 'administrator') {
          return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // For all other routes, allow authenticated users to proceed
      return NextResponse.next()
    } else {
      // Check if the requested path is public
      if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next()
      }

      // Redirect to login for protected routes
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (e) {
    console.error('Error in middleware:', e)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
} 