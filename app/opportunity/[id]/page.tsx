'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { User } from '../../../lib/mockUsers'
import { Opportunity, Application, mockOpportunities, mockApplications } from '../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Building, FileText, CheckCircle, XCircle, Phone } from 'lucide-react'
import { GradientBackground } from '../../../components/GradientBackground'

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
    // Here you would typically send the application data to your backend
    console.log('Applying with data:', applicationData)
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {opportunity.title}
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Building className="mr-2" />
                <p><strong>Organization:</strong> {opportunity.organization}</p>
              </div>
              <div className="flex items-center">
                <FileText className="mr-2" />
                <p><strong>Type:</strong> {opportunity.type}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <p><strong>Deadline:</strong> {opportunity.deadline}</p>
              </div>
              <p><strong>Description:</strong> {opportunity.description}</p>
              <div>
                <strong>Status:</strong>{' '}
                <Badge variant={opportunity.status === 'Open' ? 'success' : 'destructive'}>
                  {opportunity.status}
                </Badge>
              </div>

              <div>
                <h2 className="text-xl font-bold mt-6 mb-2">Requirements:</h2>
                <ul className="list-disc list-inside space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      {req}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mt-6 mb-2">Criteria:</h2>
                <ul className="list-disc list-inside space-y-2">
                  {opportunity.criteria.map((criterion, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      {criterion}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              {opportunity.status === 'Open' && !userApplication && !isApplying && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    onClick={() => setIsApplying(true)}
                    className="w-full"
                  >
                    Apply Now
                  </Button>
                </motion.div>
              )}

              {userApplication && (
                <motion.div 
                  className="p-4 bg-blue-100 rounded-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold mb-2">Your Application Status</h3>
                  <p>Status: <span className="font-semibold">{userApplication.status}</span></p>
                  <p>Applied on: {userApplication.appliedAt}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {isApplying && (
            <motion.div 
              className="mt-8"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Apply for {opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-2">Name</label>
                      <Input
                        type="text"
                        id="name"
                        value={applicationData.name}
                        onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2">Email</label>
                      <Input
                        type="email"
                        id="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        id="phoneNumber"
                        value={applicationData.phoneNumber}
                        onChange={(e) => setApplicationData({...applicationData, phoneNumber: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block mb-2">Cover Letter</label>
                      <Textarea
                        id="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </>
  )
}

