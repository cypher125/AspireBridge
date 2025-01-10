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
import { UserIcon, Mail, Book, Phone, FileText, Camera, MapPin, Calendar, Briefcase, School, Edit2, Award, GraduationCap, Clock, Activity, ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Calculate progress based on user data
  const courseProgress = currentUser.completedCourses?.length && currentUser.totalCourses ? 
    (currentUser.completedCourses.length / currentUser.totalCourses) * 100 : 0;
  const creditsEarned = currentUser.creditsEarned || 0
  const totalCredits = currentUser.totalCredits || 120
  const creditsProgress = (creditsEarned / totalCredits) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
                className="hover:bg-white/50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Profile Dashboard
              </h1>
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)} 
                className="shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/50 backdrop-blur-sm border-b border-gray-200 w-full justify-start p-0">
              <TabsTrigger value="overview" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
              <TabsTrigger value="details" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">Personal Details</TabsTrigger>
              {currentUser.role === 'student' && (
                <>
                  <TabsTrigger value="academic" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">Academic Info</TabsTrigger>
                  <TabsTrigger value="achievements" className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">Achievements</TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="col-span-1 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="relative group">
                        <Avatar className="w-48 h-48 mb-6 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all">
                          <AvatarImage src={currentUser.profilePicture || undefined} alt={currentUser.name} className="object-cover" />
                          <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-purple-600 text-white">
                            {currentUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Label htmlFor="profilePicture" className="cursor-pointer">
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
                        )}
                      </div>
                      <div className="mt-6 w-full text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{currentUser.name}</h3>
                        <Badge variant="outline" className="px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-none">
                          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {currentUser.role === 'student' && (
                    <Card className="mt-6 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">Progress Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Course Completion</span>
                            <span className="text-sm font-medium">{courseProgress.toFixed(1)}%</span>
                          </div>
                          <Progress value={courseProgress} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Credits Earned</span>
                            <span className="text-sm font-medium">{creditsEarned}/{totalCredits}</span>
                          </div>
                          <Progress value={creditsProgress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="col-span-2"
                >
                  <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Quick Information</CardTitle>
                      <CardDescription className="text-gray-500">Overview of your profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-lg">
                          <Mail className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{currentUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-lg">
                          <Phone className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">{currentUser.phoneNumber || 'Not provided'}</p>
                          </div>
                        </div>
                        {currentUser.role === 'student' && (
                          <>
                            <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-lg">
                              <School className="h-6 w-6 text-primary" />
                              <div>
                                <p className="text-sm text-gray-500">Course</p>
                                <p className="font-medium text-gray-900">{currentUser.course}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-lg">
                              <Book className="h-6 w-6 text-primary" />
                              <div>
                                <p className="text-sm text-gray-500">Matriculation Number</p>
                                <p className="font-medium text-gray-900">{currentUser.matriculationNumber}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="space-y-6">
                        {currentUser.role === 'admin' && (
                          <div className="flex items-start space-x-4 p-4 bg-white/40 rounded-lg">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <div>
                              <p className="text-sm text-gray-500">Organization</p>
                              <p className="font-medium text-gray-900">{currentUser.organizationDetails}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start space-x-4 p-4 bg-white/40 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="font-medium text-gray-900">{currentUser.description || 'No description provided'}</p>
                          </div>
                        </div>
                        {currentUser.role === 'student' && (
                          <div className="flex items-start space-x-4 p-4 bg-white/40 rounded-lg">
                            <Activity className="h-6 w-6 text-primary" />
                            <div>
                              <p className="text-sm text-gray-500">Recent Activity</p>
                              <p className="font-medium text-gray-900">{currentUser.recentActivity || 'No recent activity'}</p>
                            </div>
                          </div>
                        )}
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
                        <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={editedUser?.phoneNumber || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-white/70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-700">Description</Label>
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

            {currentUser.role === 'student' && (
              <>
                <TabsContent value="academic">
                  <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Academic Information</CardTitle>
                      <CardDescription className="text-gray-500">Your academic details and progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="matriculationNumber" className="text-gray-700">Matriculation Number</Label>
                          <Input
                            id="matriculationNumber"
                            name="matriculationNumber"
                            value={editedUser?.matriculationNumber || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="bg-white/70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course" className="text-gray-700">Course</Label>
                          <Input
                            id="course"
                            name="course"
                            value={editedUser?.course || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="bg-white/70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester" className="text-gray-700">Current Semester</Label>
                          <Input
                            id="semester"
                            name="semester"
                            value={currentUser.currentSemester || 'Not available'}
                            disabled
                            className="bg-white/70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gpa" className="text-gray-700">Current GPA</Label>
                          <Input
                            id="gpa"
                            name="gpa"
                            value={currentUser.gpa || 'Not available'}
                            disabled
                            className="bg-white/70"
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Progress</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="bg-white/70">
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                                <h4 className="font-semibold">Credits Completed</h4>
                                <p className="text-2xl font-bold text-primary mt-2">{creditsEarned}/{totalCredits}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-white/70">
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                                <h4 className="font-semibold">Study Duration</h4>
                                <p className="text-2xl font-bold text-primary mt-2">{currentUser.studyDuration || '0'} Years</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-white/70">
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                                <h4 className="font-semibold">Achievements</h4>
                                <p className="text-2xl font-bold text-primary mt-2">{currentUser.achievements?.length || 0}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800">Achievements & Certifications</CardTitle>
                      <CardDescription className="text-gray-500">Your academic and professional achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white/70">
                          <CardHeader>
                            <CardTitle className="text-xl">Academic Achievements</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {currentUser.academicAchievements?.map((achievement, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <Award className="h-5 w-5 text-primary mt-1" />
                                  <div>
                                    <p className="font-medium">{achievement.title}</p>
                                    <p className="text-sm text-gray-500">{achievement.date}</p>
                                  </div>
                                </li>
                              )) || (
                                <li className="text-gray-500">No academic achievements yet</li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/70">
                          <CardHeader>
                            <CardTitle className="text-xl">Certifications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {currentUser.certifications?.map((cert, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <Badge className="h-5 w-5 text-primary mt-1" />
                                  <div>
                                    <p className="font-medium">{cert.title}</p>
                                    <p className="text-sm text-gray-500">{cert.issueDate}</p>
                                  </div>
                                </li>
                              )) || (
                                <li className="text-gray-500">No certifications yet</li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}
