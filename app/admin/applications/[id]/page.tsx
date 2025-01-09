'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { User, mockUsers } from '../../../../lib/mockUsers'
import { Application, Opportunity, mockApplications, mockOpportunities, updateApplicationStatus } from '../../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, UserIcon, Briefcase, Calendar, CheckCircle, XCircle, Mail, Phone, Book, FileText, Building, MapPin, Clock, Download, Share2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [applicant, setApplicant] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const user = JSON.parse(userJson) as User
      if (user.role === 'admin') {
        setCurrentUser(user)
      } else {
        router.push('/login')
      }
    } else {
      router.push('/login')
    }

    const applicationId = parseInt(params.id)
    const foundApplication = mockApplications.find(app => app.id === applicationId)
    if (foundApplication) {
      setApplication(foundApplication)
      const foundOpportunity = mockOpportunities.find(opp => opp.id === foundApplication.opportunityId)
      setOpportunity(foundOpportunity || null)
      const foundApplicant = mockUsers.find(user => user.id === foundApplication.userId)
      setApplicant(foundApplicant || null)
    } else {
      router.push('/admin/applications')
    }
  }, [router, params.id])

  const handleUpdateStatus = async (newStatus: 'Pending' | 'Accepted' | 'Rejected') => {
    setIsLoading(true)
    try {
      if (application) {
        const updatedApplication = updateApplicationStatus(application.id, newStatus)
        setApplication(updatedApplication)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadResume = () => {
    // Add resume download logic
    console.log('Downloading resume...')
  }

  const handleShareApplication = () => {
    // Add share functionality
    console.log('Sharing application...')
  }

  if (!currentUser || !application || !opportunity || !applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
              </Button>
              <h1 className="text-4xl font-bold">Application Details</h1>
              <p className="text-gray-500 mt-2">Review and manage application #{params.id}</p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleDownloadResume}>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" onClick={handleShareApplication}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            <motion.div 
              className="col-span-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Applicant Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={applicant.profilePicture} alt={applicant.name} />
                      <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{applicant.name}</h2>
                    <p className="text-gray-500">{applicant.role}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{applicant.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{applicant.phoneNumber}</p>
                      </div>
                    </div>
                    {applicant.matriculationNumber && (
                      <div className="flex items-center">
                        <Book className="mr-3 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Matriculation Number</p>
                          <p>{applicant.matriculationNumber}</p>
                        </div>
                      </div>
                    )}
                    {applicant.course && (
                      <div className="flex items-center">
                        <Book className="mr-3 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Course</p>
                          <p>{applicant.course}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="col-span-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Application Details</TabsTrigger>
                  <TabsTrigger value="opportunity">Opportunity Info</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status</CardTitle>
                      <CardDescription>Manage application status and details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Current Status</p>
                            <Badge variant={
                              application.status === 'Pending' ? 'secondary' :
                              application.status === 'Accepted' ? 'default' :
                              'destructive'
                            } className="mt-1">
                              {application.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Applied On</p>
                            <p className="mt-1">{application.appliedAt}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="font-medium mb-3">Update Application Status</p>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleUpdateStatus('Accepted')} 
                              variant={application.status === 'Accepted' ? 'default' : 'outline'}
                              disabled={isLoading}
                              className="flex-1"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button 
                              onClick={() => handleUpdateStatus('Rejected')} 
                              variant={application.status === 'Rejected' ? 'default' : 'outline'}
                              disabled={isLoading}
                              className="flex-1"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>

                        <Alert>
                          <AlertTitle>Application Notes</AlertTitle>
                          <AlertDescription>
                            Review the application carefully before changing its status. This action cannot be undone.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="opportunity">
                  <Card>
                    <CardHeader>
                      <CardTitle>{opportunity.title}</CardTitle>
                      <CardDescription>{opportunity.organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Building className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Organization</p>
                              <p>{opportunity.organization}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="capitalize">{opportunity.type}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Deadline</p>
                              <p>{opportunity.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <Badge variant={opportunity.status === 'Open' ? 'default' : 'secondary'}>
                                {opportunity.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cover Letter</CardTitle>
                      <CardDescription>Applicant's cover letter and supporting documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <p className="whitespace-pre-wrap text-gray-700">{application.coverLetter}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
