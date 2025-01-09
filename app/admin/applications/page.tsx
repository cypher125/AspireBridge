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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Eye, CheckCircle, XCircle, ArrowLeft, Download, RefreshCw } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ManageApplications() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredApplications, setFilteredApplications] = useState<Application[]>(mockApplications)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
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

  const handleUpdateApplicationStatus = async (applicationId: number, newStatus: 'Pending' | 'Accepted' | 'Rejected') => {
    setIsLoading(true)
    try {
      const updatedApplications = updateApplicationStatus(applicationId, newStatus)
      setApplications(updatedApplications)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    // Add CSV export logic here
    console.log('Exporting data...')
  }

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = {
    total: filteredApplications.length,
    pending: filteredApplications.filter(app => app.status === 'Pending').length,
    accepted: filteredApplications.filter(app => app.status === 'Accepted').length,
    rejected: filteredApplications.filter(app => app.status === 'Rejected').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-4xl font-bold text-gray-900">Application Management</h1>
            <p className="text-gray-600 mt-2">Manage and track all applications in one place</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Applications</CardTitle>
              <CardDescription className="text-2xl font-bold">{stats.total}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
              <CardDescription className="text-2xl font-bold text-yellow-600">{stats.pending}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Accepted</CardTitle>
              <CardDescription className="text-2xl font-bold text-green-600">{stats.accepted}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Rejected</CardTitle>
              <CardDescription className="text-2xl font-bold text-red-600">{stats.rejected}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
            <CardDescription>View and manage all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3 relative">
                <Input
                  type="text"
                  placeholder="Search by applicant or opportunity..."
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

            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Applicant</TableHead>
                    <TableHead className="font-semibold">Opportunity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Applied At</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
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
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">{applicant?.name}</TableCell>
                          <TableCell>{opportunity?.title}</TableCell>
                          <TableCell>
                            <Badge variant={
                              application.status === 'Pending' ? 'secondary' :
                              application.status === 'Accepted' ? 'default' :
                              'destructive'
                            }>
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{application.appliedAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Link href={`/admin/applications/${application.id}`}>
                                <Button variant="outline" size="sm" className="hover:bg-gray-100">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-green-50 hover:text-green-600"
                                onClick={() => handleUpdateApplicationStatus(application.id, 'Accepted')}
                                disabled={isLoading}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleUpdateApplicationStatus(application.id, 'Rejected')}
                                disabled={isLoading}
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
      </main>
      <Footer />
    </div>
  )
}
