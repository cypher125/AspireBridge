'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, ChevronDown, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { User as UserType } from '../lib/mockUsers'
import { Notification, getNotifications } from '../lib/notificationSystem'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      setCurrentUser(JSON.parse(userJson))
    }
    setNotifications(getNotifications())

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    router.push('/')
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/api/docs', label: 'API Docs' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg transform group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">A</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              AspireBridge
            </span>
            <span className="text-xs text-gray-500 font-medium">Connect & Grow</span>
          </div>
        </Link>
        
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-full transition-all duration-300 relative hover:bg-gray-100 ${
                  pathname === item.href ? 'text-white' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent rounded-full"
                    layoutId="pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </li>
          ))}
          {currentUser ? (
            <>
              <li>
                <Link
                  href={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className={`px-4 py-2 rounded-full transition-all duration-300 relative hover:bg-gray-100 ${
                    pathname === '/dashboard' || pathname === '/admin' ? 'text-white' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Dashboard
                  {(pathname === '/dashboard' || pathname === '/admin') && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent rounded-full"
                      layoutId="pill"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <AnimatePresence>
                      {unreadNotifications > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Badge variant="destructive" className="text-xs absolute -top-1 -right-1">
                            {unreadNotifications}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-xl">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                          <span className={notification.read ? 'text-gray-500' : 'font-semibold'}>
                            {notification.message}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">{notification.createdAt}</span>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="p-3">No notifications</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.name}`} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="p-2">
                      <User className="mr-2 h-4 w-4" />
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2">
                      <Settings className="mr-2 h-4 w-4" />
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="p-2 text-red-600 hover:text-red-700">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="px-6 py-2 text-gray-700 hover:text-primary transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg hover:text-accent transition duration-300 ${
                    pathname === item.href ? 'text-accent font-semibold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <Link
                    href={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                    className={`text-lg hover:text-accent transition duration-300 ${
                      pathname === '/dashboard' || pathname === '/admin' ? 'text-accent font-semibold' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-lg hover:text-accent transition duration-300">
                    Profile
                  </Link>
                  <Link href="/settings" className="text-lg hover:text-accent transition duration-300">
                    Settings
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="justify-start px-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`text-lg hover:text-accent transition duration-300 ${
                      pathname === '/login' ? 'text-accent font-semibold' : ''
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`text-lg hover:text-accent transition duration-300 ${
                      pathname === '/register' ? 'text-accent font-semibold' : ''
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
