'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { User, mockUsers } from '../../../lib/mockUsers'
import { Opportunity, Application, mockOpportunities, mockApplications } from '../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Building, FileText, CheckCircle, XCircle, Phone, MapPin, DollarSign, Clock, Users, Share2, BookmarkPlus, Send } from 'lucide-react'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function OpportunityPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
    resume: null as File | null,
  })
  const [userApplication, setUserApplication] = useState<Application | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const user = JSON.parse(userJson) as User
      if (user.role === 'student') {
        setCurrentUser(user)
        setApplicationData(prevData => ({
          ...prevData,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber || '',
        }))
      } else {
        router.push('/login')
      }
    } else {
      router.push('/login')
    }

    const foundOpportunity = mockOpportunities.find(opp => opp.id === parseInt(params.id))
    if (foundOpportunity) {
      setOpportunity(foundOpportunity)
    } else {
      router.push('/dashboard')
    }

    const foundApplication = mockApplications.find(
      app => app.userId === JSON.parse(userJson || '{}').id && app.opportunityId === parseInt(params.id)
    )
    if (foundApplication) {
      setUserApplication(foundApplication)
    }
  }, [params.id, router])

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    const newApplication: Application = {
      id: mockApplications.length + 1,
      userId: currentUser!.id,
      opportunityId: opportunity!.id,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
      coverLetter: applicationData.coverLetter,
      updatedAt: new Date().toISOString(),
      documents: applicationData.resume ? [{ 
        name: applicationData.resume.name,
        url: URL.createObjectURL(applicationData.resume)
      }] : []
    }
    mockApplications.push(newApplication)
    setUserApplication(newApplication)
    setIsApplying(false)
    alert('Application submitted successfully!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  if (!currentUser || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading opportunity details...</p>
      </div>
    )
  }

  const daysLeft = Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
  const progressValue = (daysLeft / 30) * 100 // Assuming 30 days is full period
  
  // Calculate total applicants from mock data
  const totalApplicants = mockApplications.filter(app => app.opportunityId === opportunity.id).length

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
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="hover:bg-white/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" onClick={() => setIsBookmarked(!isBookmarked)}>
                <BookmarkPlus className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-8 mb-8 shadow-lg border border-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-sm capitalize">
                    {opportunity.type}
                  </Badge>
                  <Badge variant={opportunity.status === 'Open' ? 'success' : 'destructive'}>
                    {opportunity.status}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    {opportunity.organization}
                  </div>
                  {opportunity.location && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {opportunity.location}
                    </div>
                  )}
                  {opportunity.funding && (
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      {opportunity.funding}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-right mb-2">
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="text-lg font-semibold">{format(new Date(opportunity.deadline), 'MMM d, yyyy')}</p>
                </div>
                <div className="w-full max-w-[200px]">
                  <Progress value={progressValue} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">{daysLeft} days left to apply</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="criteria">Selection Criteria</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <Card className="bg-white shadow-sm border-gray-100">
                    <CardHeader>
                      <CardTitle>About this Opportunity</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Users className="h-5 w-5 text-gray-600 mb-2" />
                          <p className="text-sm text-gray-600">Total Applicants</p>
                          <p className="text-xl font-semibold">{totalApplicants}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Clock className="h-5 w-5 text-gray-600 mb-2" />
                          <p className="text-sm text-gray-600">Time Commitment</p>
                          <p className="text-xl font-semibold">{opportunity.timeCommitment || 'Full Time'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements">
                  <Card className="bg-white shadow-sm border-gray-100">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                      <CardDescription>What you need to be eligible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {opportunity.requirements.map((req, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start bg-gray-50 p-4 rounded-lg"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="criteria">
                  <Card className="bg-white shadow-sm border-gray-100">
                    <CardHeader>
                      <CardTitle>Selection Criteria</CardTitle>
                      <CardDescription>How applications will be evaluated</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {opportunity.criteria.map((criterion, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start bg-gray-50 p-4 rounded-lg"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <CheckCircle className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{criterion}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-white shadow-sm border-gray-100 sticky top-8">
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {opportunity.status === 'Open' && !userApplication && !isApplying && (
                    <Button
                      onClick={() => setIsApplying(true)}
                      className="w-full"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" /> Apply Now
                    </Button>
                  )}

                  {userApplication && (
                    <div className="space-y-4">
                      <div className={`p-6 rounded-lg ${
                        userApplication.status === 'Pending' ? 'bg-yellow-50 border border-yellow-200' :
                        userApplication.status === 'Accepted' ? 'bg-green-50 border border-green-200' :
                        'bg-red-50 border border-red-200'
                      }`}>
                        <h3 className="font-semibold mb-3">Application Status</h3>
                        <div className="flex items-center">
                          {userApplication.status === 'Pending' ? (
                            <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                          ) : userApplication.status === 'Accepted' ? (
                            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-2 text-red-600" />
                          )}
                          <span className="font-medium">{userApplication.status}</span>
                        </div>
                        <div className="mt-4 text-sm">
                          <p>Applied on: {format(new Date(userApplication.appliedAt), 'MMMM d, yyyy')}</p>
                          {userApplication.updatedAt && (
                            <p>Last updated: {format(new Date(userApplication.updatedAt), 'MMMM d, yyyy')}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <AnimatePresence>
            {isApplying && (
              <motion.div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-xl w-full max-w-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Apply for {opportunity.title}</CardTitle>
                      <CardDescription>Please fill out all required fields carefully</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleApply} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input
                              value={applicationData.name}
                              onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                              required
                              className="bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <Input
                              type="email"
                              value={applicationData.email}
                              onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                              required
                              className="bg-gray-50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            value={applicationData.phoneNumber}
                            onChange={(e) => setApplicationData({...applicationData, phoneNumber: e.target.value})}
                            required
                            className="bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Cover Letter</label>
                          <Textarea
                            value={applicationData.coverLetter}
                            onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                            required
                            className="h-40 bg-gray-50"
                            placeholder="Tell us why you're interested in this opportunity..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Resume/CV</label>
                          <Input
                            type="file"
                            onChange={(e) => setApplicationData({
                              ...applicationData,
                              resume: e.target.files ? e.target.files[0] : null
                            })}
                            accept=".pdf,.doc,.docx"
                            required
                            className="bg-gray-50"
                          />
                        </div>
                        <CardFooter className="px-0 pb-0">
                          <div className="flex justify-end gap-4 w-full">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsApplying(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">
                              Submit Application
                            </Button>
                          </div>
                        </CardFooter>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}
