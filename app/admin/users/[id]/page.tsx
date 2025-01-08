'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { User, mockUsers } from '../../../../lib/mockUsers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, Book, FileText } from 'lucide-react'

export default function UserDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const loggedInUser = JSON.parse(userJson) as User
      if (loggedInUser.role === 'admin') {
        setCurrentUser(loggedInUser)
      } else {
        router.push('/login')
      }
    } else {
      router.push('/login')
    }

    const userId = parseInt(params.id)
    const foundUser = mockUsers.find(u => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
    } else {
      router.push('/admin/users')
    }
  }, [router, params.id])

  if (!currentUser || !user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <motion.main 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          User Details
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <Badge>{user.role}</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-2" />
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center">
                    <Phone className="mr-2" />
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                  </div>
                )}
                {user.matriculationNumber && (
                  <div className="flex items-center">
                    <Book className="mr-2" />
                    <p><strong>Matriculation Number:</strong> {user.matriculationNumber}</p>
                  </div>
                )}
                {user.course && (
                  <div className="flex items-center">
                    <Book className="mr-2" />
                    <p><strong>Course:</strong> {user.course}</p>
                  </div>
                )}
                {user.organizationDetails && (
                  <div className="flex items-center">
                    <FileText className="mr-2" />
                    <p><strong>Organization Details:</strong> {user.organizationDetails}</p>
                  </div>
                )}
                {user.description && (
                  <div className="flex items-start">
                    <FileText className="mr-2 mt-1" />
                    <div>
                      <p><strong>Description:</strong></p>
                      <p>{user.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  )
}

