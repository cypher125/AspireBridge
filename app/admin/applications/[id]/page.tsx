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
import { ArrowLeft, UserIcon, Briefcase, Calendar, CheckCircle, XCircle, Mail, Phone, Book, FileText, Building, MapPin, Clock, Download, Share2, GraduationCap, Award, FileCheck, Link2, MessageSquare } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Timeline, TimelineItem, TimelineIcon, TimelineContent } from "../../../../components/ui/timeline"

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [applicant, setApplicant] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<'Pending' | 'Accepted' | 'Rejected' | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const userJson = localStorage.getItem('currentUser')
      if (!userJson) {
        router.push('/login')
        return
      }

      const user = JSON.parse(userJson) as User
      if (user.role !== 'admin') {
        router.push('/login')
        return
      }

      setCurrentUser(user)

      const applicationId = parseInt(params.id)
      if (isNaN(applicationId)) {
        router.push('/admin/applications')
        return
      }

      const foundApplication = mockApplications.find(app => app.id === applicationId)
      if (!foundApplication) {
        router.push('/admin/applications')
        return
      }

      setApplication(foundApplication)
      
      const foundOpportunity = mockOpportunities.find(opp => opp.id === foundApplication.opportunityId)
      setOpportunity(foundOpportunity || null)
      
      const foundApplicant = mockUsers.find(user => user.id === foundApplication.userId)
      setApplicant(foundApplicant || null)

    } catch (error) {
      console.error('Error in initialization:', error)
      router.push('/login')
    }
  }, [router, params.id])

  const handleUpdateStatus = async (newStatus: 'Pending' | 'Accepted' | 'Rejected') => {
    if (!application) return

    setIsLoading(true)
    try {
      const updatedApplication = await updateApplicationStatus(application.id, newStatus)[0]
      setApplication(updatedApplication)
      showNotification(`Application status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      showNotification('Failed to update application status', 'error')
    } finally {
      setIsLoading(false)
      setShowConfirmDialog(false)
    }
  }

  const handleDownloadResume = async () => {
    try {
      // Add resume download logic
      showNotification('Resume download started')
    } catch (error) {
      console.error('Error downloading resume:', error)
      showNotification('Failed to download resume', 'error')
    }
  }

  const handleShareApplication = async () => {
    try {
      const shareUrl = `${window.location.origin}/admin/applications/${params.id}`
      await navigator.clipboard.writeText(shareUrl)
      showNotification('Application link copied to clipboard')
    } catch (error) {
      console.error('Error sharing application:', error)
      showNotification('Failed to copy link', 'error')
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    // Implement your notification system here
    console.log(`${type}: ${message}`)
  }

  if (!currentUser || !application || !opportunity || !applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const applicationTimeline = [
    { date: new Date(application.appliedAt).toLocaleDateString(), event: 'Application Submitted', icon: FileCheck },
    { date: new Date(application.appliedAt).toLocaleDateString(), event: 'Documents Verified', icon: CheckCircle },
    { date: new Date(application.updatedAt || application.appliedAt).toLocaleDateString(), event: 'Under Review', icon: MessageSquare },
    { date: new Date(application.updatedAt || application.appliedAt).toLocaleDateString(), event: application.status, icon: Award },
  ]

  // Calculate qualification match based on mock data
  const calculateQualificationMatch = () => {
    const requiredSkills = opportunity.requirements?.length || 0
    const matchedSkills = opportunity.requirements?.filter(req => 
      applicant.skills?.some(skill => req.toLowerCase().includes(skill.toLowerCase()))
    ).length || 0
    return Math.round((matchedSkills / requiredSkills) * 100)
  }

  // Calculate experience level based on mock data
  const calculateExperienceLevel = () => {
    const requiredYears = opportunity.experienceRequired || 1
    const applicantYears = applicant.yearOfStudy || 1
    return Math.min(Math.round((applicantYears / requiredYears) * 100), 100)
  }

  const qualificationMatch = calculateQualificationMatch()
  const experienceLevel = calculateExperienceLevel()

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
              <Button variant="outline" onClick={handleDownloadResume} disabled={isLoading}>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" onClick={handleShareApplication} disabled={isLoading}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="col-span-1 space-y-6"
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
                    <div className="flex mt-4 space-x-2">
                      <Badge variant="outline">{applicant.course}</Badge>
                      <Badge variant="outline">Year {applicant.yearOfStudy}</Badge>
                    </div>
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
                        <GraduationCap className="mr-3 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Course</p>
                          <p>{applicant.course}</p>
                        </div>
                      </div>
                    )}
                    {applicant.faculty && (
                      <div className="flex items-center">
                        <Building className="mr-3 h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Faculty</p>
                          <p>{applicant.faculty}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline>
                    {applicationTimeline.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineIcon icon={item.icon} />
                        <TimelineContent>
                          <p className="font-medium">{item.event}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="col-span-1 md:col-span-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="details">Application Details</TabsTrigger>
                  <TabsTrigger value="opportunity">Opportunity Info</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status</CardTitle>
                      <CardDescription>Manage application status and details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            <p className="mt-1">{new Date(application.appliedAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Updated</p>
                            <p className="mt-1">{application.updatedAt ? new Date(application.updatedAt).toLocaleDateString() : 'Not updated'}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="font-medium mb-3">Update Application Status</p>
                          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
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
                            <p>Review the application carefully before changing its status. This action cannot be undone.</p>
                            <ul className="mt-2 list-disc list-inside text-sm">
                              <li>Check all required documents are complete</li>
                              <li>Verify applicant meets eligibility criteria</li>
                              <li>Review academic qualifications</li>
                            </ul>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <div className="flex items-center">
                            <MapPin className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p>{opportunity.location || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Deadline</p>
                              <p>{new Date(opportunity.deadline).toLocaleDateString()}</p>
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
                          <div className="flex items-center">
                            <UserIcon className="mr-3 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Total Applicants</p>
                              <p>{mockApplications.filter(app => app.opportunityId === opportunity.id).length}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h3 className="font-medium mb-3">Description</h3>
                        <p className="text-gray-600">{opportunity.description}</p>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Requirements</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {opportunity.requirements?.map((req, index) => (
                            <li key={index} className="text-gray-600">{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Documents</CardTitle>
                      <CardDescription>Review submitted documents and materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Cover Letter</h3>
                          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            <p className="whitespace-pre-wrap text-gray-700">{application.coverLetter}</p>
                          </ScrollArea>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-3">Uploaded Documents</h3>
                          <div className="space-y-3">
                            {application.documents?.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{doc.name}</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="evaluation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Evaluation</CardTitle>
                      <CardDescription>Review and score the application</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="font-medium">Qualifications Match</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${qualificationMatch}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-500">{qualificationMatch}% match with requirements</p>
                          </div>
                          <div className="space-y-2">
                            <p className="font-medium">Experience Level</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${experienceLevel}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-500">{experienceLevel}% relevant experience</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-3">Evaluation Notes</h3>
                          <textarea 
                            className="w-full h-32 p-3 border rounded-md resize-none" 
                            placeholder="Add evaluation notes here..."
                            defaultValue={application.evaluationNotes || ''}
                          />
                        </div>

                        <Alert>
                          <AlertTitle>Evaluation Guidelines</AlertTitle>
                          <AlertDescription>
                            Consider the following criteria:
                            <ul className="mt-2 list-disc list-inside text-sm">
                              <li>Academic performance</li>
                              <li>Relevant experience</li>
                              <li>Skills match</li>
                              <li>Communication ability</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
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
