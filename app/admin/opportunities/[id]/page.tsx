'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { User } from '../../../../lib/mockUsers'
import { Opportunity, mockOpportunities } from '../../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Briefcase, Calendar, Users, FileText } from 'lucide-react'

export default function OpportunityDetails({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
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

    const opportunityId = parseInt(params.id)
    const foundOpportunity = mockOpportunities.find(opp => opp.id === opportunityId)
    if (foundOpportunity) {
      setOpportunity(foundOpportunity)
    } else {
      router.push('/admin/opportunities')
    }
  }, [router, params.id])

  if (!currentUser || !opportunity) {
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Opportunities
          </Button>
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Opportunity Details
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2" />
                {opportunity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Organization:</strong> {opportunity.organization}</p>
              <p><strong>Type:</strong> {opportunity.type}</p>
              <p><strong>Status:</strong> <Badge variant={opportunity.status === 'Open' ? 'success' : 'destructive'}>{opportunity.status}</Badge></p>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <p><strong>Deadline:</strong> {opportunity.deadline}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{opportunity.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  )
}

