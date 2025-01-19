'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Mail, Book, Phone, FileText, Camera, Briefcase, School, Edit2, ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from '@/hooks/useAuth'
import apiClient from '@/lib/api'

interface ExtendedUser {
  id: string
  email: string
  name: string
  role: string
  avatar_url?: string
  phone_number?: string
  description?: string
  organization_details?: string
  course?: string
  matriculation_number?: string
}

export default function Profile() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<ExtendedUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    const convertedUser: ExtendedUser = {
      ...user,
      id: user.id,
      name: user.name || '',
      email: user.email || '',
      role: user.role || '',
      phone_number: user.phone_number || '',
      description: user.description || '',
      matriculation_number: user.matriculation_number || '',
      course: user.course || '',
      avatar_url: user.profile_picture || ''
    }
    
    setEditedUser(convertedUser)
  }, [router, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Only JPEG, PNG and GIF images are allowed",
          variant: "destructive",
        })
        return
      }

      try {
        const formData = new FormData()
        formData.append('profile_picture', file)
        
        const response = await apiClient.post('/api/users/update_profile_picture/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        
        if (response.data.profile_picture) {
          setEditedUser(prev => prev ? { 
            ...prev, 
            avatar_url: response.data.profile_picture 
          } : null)
          toast({
            title: "Success",
            description: "Profile picture updated successfully.",
          })
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update profile picture. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editedUser) {
      try {
        await apiClient.put('/user/profile', editedUser)
      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      } catch {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        })
      }
    }
  }

  if (!user || !editedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
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
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="hover:bg-blue-50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Profile Dashboard
              </h1>
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)} 
                className="shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/50 backdrop-blur-sm border-b border-gray-200 w-full justify-start p-0">
              <TabsTrigger value="overview" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">Overview</TabsTrigger>
              <TabsTrigger value="details" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">Personal Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="col-span-1 bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="relative group">
                        <Avatar className="w-48 h-48 mb-6 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                          <AvatarImage 
                            src={editedUser?.avatar_url ? `http://localhost:8000/media/profile_pictures/${editedUser.avatar_url.split('/').pop()}` : undefined} 
                            alt={editedUser?.name} 
                            className="object-cover" 
                          />
                          <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                            {editedUser?.name?.[0]?.toUpperCase() || ''}
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="profilePicture" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Input
                                id="profilePicture"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Camera className="h-8 w-8 text-white" />
                            </Label>
                      </div>
                      <div className="mt-6 w-full text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {`${editedUser?.name || ''}`}
                        </h3>
                        <Badge variant="outline" className="px-4 py-1 text-sm font-medium bg-blue-50 text-blue-600 border-none">
                          {(editedUser?.role?.[0]?.toUpperCase() + editedUser?.role?.slice(1)) || 'User'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="col-span-2"
                >
                  <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Quick Information</CardTitle>
                      <CardDescription className="text-gray-500">Overview of your profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                          <Mail className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{editedUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                          <Phone className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">{editedUser.phone_number || 'Not provided'}</p>
                          </div>
                        </div>
                        {editedUser.role === 'student' && (
                          <>
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                              <School className="h-6 w-6 text-blue-600" />
                              <div>
                                <p className="text-sm text-gray-500">Course</p>
                                <p className="font-medium text-gray-900">{editedUser.course || 'Not specified'}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                              <Book className="h-6 w-6 text-blue-600" />
                              <div>
                                <p className="text-sm text-gray-500">Student ID</p>
                                <p className="font-medium text-gray-900">{editedUser.matriculation_number || 'Not available'}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="space-y-6">
                        {editedUser.role === 'admin' && (
                          <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <div>
                              <p className="text-sm text-gray-500">Organization</p>
                              <p className="font-medium text-gray-900">{editedUser.organization_details || 'Not specified'}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="font-medium text-gray-900">{editedUser.description || 'No description provided'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-800">Personal Information</CardTitle>
                  <CardDescription className="text-gray-500">Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedUser?.name || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-white/70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={editedUser?.email || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-white/70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number" className="text-gray-700">Phone Number</Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          value={editedUser?.phone_number || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-white/70"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description" className="text-gray-700">Bio</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={editedUser?.description || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-white/70 min-h-[100px]"
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-4 pt-4">
                        <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                          Save Changes
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}