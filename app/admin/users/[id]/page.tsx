'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { User, mockUsers } from '../../../../lib/mockUsers'
import { Application, mockApplications } from '../../../../lib/mockData'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, Book, FileText, MapPin, Calendar, Shield, Activity, Clock, Edit, Trash2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { format, formatDistanceToNow } from 'date-fns'

export default function UserDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userApplications, setUserApplications] = useState<Application[]>([])
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
      // Get user's applications from mock data
      const applications = mockApplications.filter(app => app.userId === userId)
      setUserApplications(applications)
    } else {
      router.push('/admin/users')
    }
  }, [router, params.id])

  if (!currentUser || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Calculate last active time from mock data
  const lastActive = user.lastActive ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true }) : 'Unknown'

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Badge variant="outline">User Profile</Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="text-yellow-600 hover:text-yellow-700">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <Badge className="mb-4" variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Activity className="h-4 w-4" />
                    <span>{user.status}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>Last seen {lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Member Since</span>
                    <Badge variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(new Date(user.joinDate), 'MMM d, yyyy')}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Applications</span>
                    <Badge>{userApplications.length}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Detailed information about the user</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>

                        {user.phoneNumber && (
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Phone Number</p>
                              <p className="font-medium">{user.phoneNumber}</p>
                            </div>
                          </div>
                        )}

                        {user.matriculationNumber && (
                          <div className="flex items-center space-x-3">
                            <Book className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Matriculation Number</p>
                              <p className="font-medium">{user.matriculationNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        {user.course && (
                          <div className="flex items-center space-x-3">
                            <Book className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Course</p>
                              <p className="font-medium">{user.course}</p>
                            </div>
                          </div>
                        )}

                        {user.organizationDetails && (
                          <div className="flex items-center space-x-3">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Organization</p>
                              <p className="font-medium">{user.organizationDetails}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {user.description && (
                      <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">Description</p>
                        <p className="text-gray-700">{user.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>User's latest actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userApplications.length > 0 ? (
                      <div className="space-y-4">
                        {userApplications.map(app => (
                          <div key={app.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Applied to opportunity #{app.opportunityId}</p>
                              <p className="text-sm text-gray-500">{format(new Date(app.appliedAt), 'PPP')}</p>
                            </div>
                            <Badge>{app.status}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No recent activity to display</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications History</CardTitle>
                    <CardDescription>Overview of user's applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userApplications.length > 0 ? (
                      <div className="space-y-4">
                        {userApplications.map(app => (
                          <div key={app.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Application #{app.id}</p>
                                <p className="text-sm text-gray-500">Opportunity #{app.opportunityId}</p>
                              </div>
                              <Badge variant={app.status === 'Accepted' ? 'default' : app.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                {app.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No applications found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
