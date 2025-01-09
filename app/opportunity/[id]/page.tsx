'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { User } from '../../../lib/mockUsers'
import { Opportunity, Application, mockOpportunities, mockApplications } from '../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Building, FileText, CheckCircle, XCircle, Phone, MapPin, DollarSign, Clock } from 'lucide-react'
import { format } from 'date-fns'

export default function OpportunityPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
  })
  const [userApplication, setUserApplication] = useState<Application | null>(null)
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
      appliedAt: new Date().toISOString().split('T')[0],
      coverLetter: applicationData.coverLetter,
    }
    mockApplications.push(newApplication)
    setUserApplication(newApplication)
    setIsApplying(false)
    alert('Application submitted successfully!')
  }

  if (!currentUser || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading opportunity details...</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <motion.main 
        className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="hover:bg-white/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 mb-8 shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm capitalize">
                {opportunity.type}
              </Badge>
              <Badge variant="outline" className={opportunity.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
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
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Deadline: {format(new Date(opportunity.deadline), 'MMM d, yyyy')}
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
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>About this Opportunity</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                  <CardDescription>What you need to be eligible</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.requirements.map((req, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Selection Criteria</CardTitle>
                  <CardDescription>How applications will be evaluated</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.criteria.map((criterion, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                        <span className="text-gray-700">{criterion}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-white shadow-sm sticky top-8">
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
                      Apply Now
                    </Button>
                  )}

                  {userApplication && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${
                        userApplication.status === 'Pending' ? 'bg-yellow-50 text-yellow-800' :
                        userApplication.status === 'Accepted' ? 'bg-green-50 text-green-800' :
                        'bg-red-50 text-red-800'
                      }`}>
                        <h3 className="font-semibold mb-2">Application Status</h3>
                        <div className="flex items-center">
                          {userApplication.status === 'Pending' ? (
                            <Clock className="h-5 w-5 mr-2" />
                          ) : userApplication.status === 'Accepted' ? (
                            <CheckCircle className="h-5 w-5 mr-2" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-2" />
                          )}
                          <span>{userApplication.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Applied on: {format(new Date(userApplication.appliedAt), 'MMMM d, yyyy')}
                      </p>
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
                  className="bg-white rounded-lg w-full max-w-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Apply for {opportunity.title}</CardTitle>
                      <CardDescription>Please fill out all required fields</CardDescription>
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
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <Input
                              type="email"
                              value={applicationData.email}
                              onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                              required
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Cover Letter</label>
                          <Textarea
                            value={applicationData.coverLetter}
                            onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                            required
                            className="h-40"
                            placeholder="Tell us why you're interested in this opportunity..."
                          />
                        </div>
                        <div className="flex justify-end space-x-4">
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
    </>
  )
}
