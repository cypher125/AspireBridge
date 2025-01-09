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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { UserIcon, Mail, Book, Phone, FileText, Camera, MapPin, Calendar, Briefcase, School } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900">Profile Dashboard</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                <UserIcon className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Personal Details</TabsTrigger>
              {currentUser.role === 'student' && (
                <TabsTrigger value="academic">Academic Info</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="w-40 h-40 mb-6">
                      <AvatarImage src={currentUser.profilePicture || undefined} alt={currentUser.name} />
                      <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
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
                        <Button variant="outline" className="w-full">
                          <Camera className="mr-2 h-4 w-4" />
                          Change Picture
                        </Button>
                      </Label>
                    )}
                    <div className="mt-6 w-full">
                      <h3 className="text-xl font-semibold text-center mb-2">{currentUser.name}</h3>
                      <Badge variant="outline" className="w-full justify-center">
                        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Quick Information</CardTitle>
                    <CardDescription>Overview of your profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span>{currentUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span>{currentUser.phoneNumber || 'Not provided'}</span>
                      </div>
                      {currentUser.role === 'student' && (
                        <>
                          <div className="flex items-center space-x-3">
                            <School className="h-5 w-5 text-gray-500" />
                            <span>{currentUser.course}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Book className="h-5 w-5 text-gray-500" />
                            <span>{currentUser.matriculationNumber}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="space-y-4">
                      {currentUser.role === 'admin' && (
                        <div className="flex items-start space-x-3">
                          <Briefcase className="h-5 w-5 text-gray-500 mt-1" />
                          <span>{currentUser.organizationDetails}</span>
                        </div>
                      )}
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-gray-500 mt-1" />
                        <span>{currentUser.description || 'No description provided'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields from original code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedUser?.name || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={editedUser?.email || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={editedUser?.phoneNumber || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={editedUser?.description || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {currentUser.role === 'student' && (
              <TabsContent value="academic">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>Your academic details and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="matriculationNumber">Matriculation Number</Label>
                        <Input
                          id="matriculationNumber"
                          name="matriculationNumber"
                          value={editedUser?.matriculationNumber || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          name="course"
                          value={editedUser?.course || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}
