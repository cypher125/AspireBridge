'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'

export default function Header() {
  const { user, isAuthenticated, clearAuth } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    window.location.replace('/')
  }

  const getInitials = (name: string) => {
    return `${name[0]}${name[1] || ''}`.toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
            <span className="text-xl font-bold text-white">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AspireBridge
            </h1>
            <p className="text-xs text-gray-500">Connect & Grow</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/api/docs" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            API Docs
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Contact
          </Link>

          {isAuthenticated() && user ? (
            <div className="flex items-center gap-4">
              <Link href={user.role?.toLowerCase() === 'administrator' ? '/admin' : '/dashboard'}>
                <Button variant="outline">Dashboard</Button>
              </Link>
              
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={user.profile_picture ? `${process.env.NEXT_PUBLIC_API_URL}${user.profile_picture}` : undefined} 
                        alt={user.name} 
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm hidden md:inline-block">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
                </Link>
              <Link href="/register">
                <Button variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Register
            </Button>
                </Link>
            </div>
              )}
            </nav>
      </div>
    </header>
  )
}
