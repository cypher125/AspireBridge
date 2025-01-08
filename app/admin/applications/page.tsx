'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { User, mockUsers } from '../../../lib/mockUsers'
import { Application, Opportunity, mockApplications, mockOpportunities, updateApplicationStatus } from '../../../lib/mockData'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Eye, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { GradientBackground } from '../../../components/GradientBackground'

export default function ManageApplications() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredApplications, setFilteredApplications] = useState<Application[]>(mockApplications)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
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
  }, [router])

  useEffect(() => {
    let filtered = applications

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(app => {
        const opportunity = opportunities.find(opp => opp.id === app.opportunityId)
        return opportunity?.type === typeFilter
      })
    }

    if (searchTerm) {
      filtered = filtered.filter(app => {
        const user = users.find(u => u.id === app.userId)
        const opportunity = opportunities.find(opp => opp.id === app.opportunityId)
        return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               opportunity?.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    setFilteredApplications(filtered)
  }, [statusFilter, typeFilter, searchTerm, applications, opportunities, users])

  const handleUpdateApplicationStatus = (applicationId: number, newStatus: 'Pending' | 'Accepted' | 'Rejected') => {
    const updatedApplications = updateApplicationStatus(applicationId, newStatus)
    setApplications(updatedApplications)
  }

  if (!currentUser) {
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
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Manage Applications
        </motion.h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3 relative">
                <Input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="w-full md:w-1/3">
                <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <Select onValueChange={setTypeFilter} defaultValue={typeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="job">Job</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="grant">Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredApplications.map((application) => {
                      const opportunity = opportunities.find(opp => opp.id === application.opportunityId)
                      const applicant = users.find(user => user.id === application.userId)
                      return (
                        <motion.tr
                          key={application.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TableCell>{applicant?.name}</TableCell>
                          <TableCell>{opportunity?.title}</TableCell>
                          <TableCell>
                            <Badge variant={
                              application.status === 'Pending' ? 'warning' :
                              application.status === 'Accepted' ? 'success' :
                              'destructive'
                            }>
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{application.appliedAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Link href={`/admin/applications/${application.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateApplicationStatus(application.id, 'Accepted')}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateApplicationStatus(application.id, 'Rejected')}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.main>
      <Footer />
    </>
  )
}

