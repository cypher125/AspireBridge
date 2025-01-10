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
import { Search, Filter, Eye, CheckCircle, XCircle, ArrowLeft, Download, RefreshCw, Users, Clock, CheckSquare, XSquare } from 'lucide-react'
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
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    console.log('Exporting data...')
  }

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0"
          >
            <div>
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="mb-2 hover:bg-white/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Application Management
              </h1>
              <p className="text-gray-500 mt-2">Track and process applications efficiently</p>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                disabled={isLoading}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Total Applications
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-primary">{stats.total}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Pending
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-yellow-600">{stats.pending}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Accepted
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-green-600">{stats.accepted}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <XSquare className="mr-2 h-4 w-4" />
                  Rejected
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-red-600">{stats.rejected}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Applications Overview
                </CardTitle>
                <CardDescription>Comprehensive view of all submitted applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by applicant or opportunity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 backdrop-blur-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
                      <SelectTrigger className="w-full md:w-[200px] bg-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setTypeFilter} defaultValue={typeFilter}>
                      <SelectTrigger className="w-full md:w-[200px] bg-white/50 backdrop-blur-sm">
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

                  <div className="rounded-lg border bg-white/50 backdrop-blur-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Applicant</TableHead>
                          <TableHead className="font-semibold">Opportunity</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="hidden md:table-cell font-semibold">Applied At</TableHead>
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="hover:bg-white/80"
                              >
                                <TableCell className="font-medium">{applicant?.name}</TableCell>
                                <TableCell>{opportunity?.title}</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    application.status === 'Pending' ? 'secondary' :
                                    application.status === 'Accepted' ? 'default' :
                                    'destructive'
                                  } className="font-semibold">
                                    {application.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-gray-500">
                                  {application.appliedAt}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <Link href={`/admin/applications/${application.id}`}>
                                      <Button variant="outline" size="sm" className="w-full sm:w-auto bg-white/50 hover:bg-white">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                      </Button>
                                    </Link>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full sm:w-auto bg-white/50 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                                      onClick={() => handleUpdateApplicationStatus(application.id, 'Accepted')}
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Accept
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full sm:w-auto bg-white/50 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
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
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
