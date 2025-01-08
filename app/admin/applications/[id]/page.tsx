'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { User, mockUsers } from '../../../../lib/mockUsers'
import { Application, Opportunity, mockApplications, mockOpportunities, updateApplicationStatus } from '../../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, UserIcon, Briefcase, Calendar, CheckCircle, XCircle, Mail, Phone, Book, FileText } from 'lucide-react'

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [applicant, setApplicant] = useState<User | null>(null)
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

  const handleUpdateStatus = (newStatus: 'Pending' | 'Accepted' | 'Rejected') => {
    if (application) {
      const updatedApplication = updateApplicationStatus(application.id, newStatus)
      setApplication(updatedApplication)
    }
  }

  if (!currentUser || !application || !opportunity || !applicant) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
          </Button>
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Application Details
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={applicant.profilePicture} alt={applicant.name} />
                  <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{applicant.name}</h3>
                  <p className="text-sm text-gray-500">{applicant.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <p><strong>Email:</strong> {applicant.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <p><strong>Phone:</strong> {applicant.phoneNumber}</p>
                </div>
                {applicant.matriculationNumber && (
                  <div className="flex items-center">
                    <Book className="mr-2 h-4 w-4" />
                    <p><strong>Matriculation Number:</strong> {applicant.matriculationNumber}</p>
                  </div>
                )}
                {applicant.course && (
                  <div className="flex items-center">
                    <Book className="mr-2 h-4 w-4" />
                    <p><strong>Course:</strong> {applicant.course}</p>
                  </div>
                )}
                {applicant.description && (
                  <div className="flex items-start">
                    <FileText className="mr-2 h-4 w-4 mt-1" />
                    <div>
                      <p><strong>Description:</strong></p>
                      <p>{applicant.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <p><strong>Organization:</strong> {opportunity.organization}</p>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <p><strong>Type:</strong> {opportunity.type}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <p><strong>Deadline:</strong> {opportunity.deadline}</p>
                </div>
                <p><strong>Status:</strong> {opportunity.status}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <p><strong>Current Status:</strong></p>
                <Badge variant={
                  application.status === 'Pending' ? 'warning' :
                  application.status === 'Accepted' ? 'success' :
                  'destructive'
                }>
                  {application.status}
                </Badge>
              </div>
              <p><strong>Applied On:</strong> {application.appliedAt}</p>
              <div className="mt-4">
                <p><strong>Update Status:</strong></p>
                <div className="flex space-x-2 mt-2">
                  <Button onClick={() => handleUpdateStatus('Pending')} variant={application.status === 'Pending' ? 'default' : 'outline'}>
                    Pending
                  </Button>
                  <Button onClick={() => handleUpdateStatus('Accepted')} variant={application.status === 'Accepted' ? 'default' : 'outline'}>
                    Accept
                  </Button>
                  <Button onClick={() => handleUpdateStatus('Rejected')} variant={application.status === 'Rejected' ? 'default' : 'outline'}>
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{application.coverLetter}</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  )
}

