'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { User, updateUser } from '../../lib/mockUsers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { UserIcon, Mail, Book, Phone, FileText, Camera } from 'lucide-react'
import { GradientBackground } from '../../components/GradientBackground'

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const user = JSON.parse(userJson) as User
      setCurrentUser(user)
      setEditedUser(user)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedUser) {
      // In a real application, you would upload the new profile picture here
      // and get back a URL to store in the user object
      if (newProfilePicture) {
        editedUser.profilePicture = URL.createObjectURL(newProfilePicture)
      }
      const updatedUser = updateUser(editedUser)
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <GradientBackground />
      <motion.main 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Profile
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={currentUser.profilePicture || undefined} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label htmlFor="profilePicture" className="cursor-pointer">
                  <Input
                    id="profilePicture"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex items-center justify-center w-full">
                    <Button variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Picture
                    </Button>
                  </div>
                </Label>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedUser?.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                {currentUser.role === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="matriculationNumber" className="flex items-center">
                        <Book className="mr-2 h-4 w-4" />
                        Matriculation Number
                      </Label>
                      <Input
                        id="matriculationNumber"
                        name="matriculationNumber"
                        value={editedUser?.matriculationNumber || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course" className="flex items-center">
                        <Book className="mr-2 h-4 w-4" />
                        Course
                      </Label>
                      <Input
                        id="course"
                        name="course"
                        value={editedUser?.course || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </>
                )}
                {currentUser.role === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="organizationDetails" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Organization Details
                    </Label>
                    <Textarea
                      id="organizationDetails"
                      name="organizationDetails"
                      value={editedUser?.organizationDetails || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedUser?.description || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editedUser?.phoneNumber || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <AnimatePresence>
                  {isEditing ? (
                    <motion.div
                      className="flex space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button type="submit">Save Changes</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  )
}

