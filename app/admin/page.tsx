'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { User, mockUsers } from '../../lib/mockUsers'
import { mockOpportunities, mockApplications } from '../../lib/mockData'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion} from 'framer-motion'
import CountUp from 'react-countup'
import { Users, Briefcase, FileText, Bell, TrendingUp, ChevronUp, Calendar, Clock} from 'lucide-react'
import { GradientBackground } from '../../components/GradientBackground'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
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

  const [searchTerm, setSearchTerm] = useState('')

  // Calculate stats from mock data
  const opportunityTypeData = mockOpportunities.reduce((acc, opp) => {
    acc[opp.type] = (acc[opp.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const opportunityChartData = Object.entries(opportunityTypeData).map(([type, count]) => ({
    type,
    count,
    percentage: (count / mockOpportunities.length * 100).toFixed(1)
  }))

  const applicationStatusData = mockApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const applicationChartData = Object.entries(applicationStatusData).map(([status, count]) => ({
    status,
    count,
    percentage: (count / mockApplications.length * 100).toFixed(1)
  }))

  const recentApplications = [...mockApplications]
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 5)

  const recentUsers = [...mockUsers]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  const mostAppliedOpportunities = mockOpportunities
    .map(opp => ({
      ...opp,
      applicationCount: mockApplications.filter(app => app.opportunityId === opp.id).length
    }))
    .sort((a, b) => b.applicationCount - a.applicationCount)
    .slice(0, 5)

  const weeklyApplications = mockApplications.filter(app => 
    new Date(app.appliedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length

  const weeklyUsers = mockUsers.filter(user =>
    user.id > mockUsers.length - 10 // Simulating weekly new users
  ).length

  if (!currentUser) {
    return (
      <motion.div 
        className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium text-gray-700">Loading dashboard...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <GradientBackground />
      <motion.main 
        className="container mx-auto px-6 py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 space-y-4 md:space-y-0"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.name}</h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening with your platform today</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/opportunities">
              <Button variant="default" className="shadow-sm hover:shadow-md transition-all bg-indigo-600 hover:bg-indigo-700">
                <Briefcase className="mr-2 h-4 w-4" />
                Manage Opportunities
              </Button>
            </Link>
            <Link href="/admin/applications">
              <Button variant="default" className="shadow-sm hover:shadow-md transition-all bg-green-600 hover:bg-green-700">
                <FileText className="mr-2 h-4 w-4" />
                Manage Applications
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="default" className="shadow-sm hover:shadow-md transition-all bg-purple-600 hover:bg-purple-700">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">
                <CountUp end={mockUsers.length} duration={2} />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+{weeklyUsers}</span>
                <span className="text-gray-500 ml-1">this week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
              <Briefcase className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                <CountUp end={mockOpportunities.length} duration={2} />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-gray-500">Active listings</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">
                <CountUp end={mockApplications.length} duration={2} />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+{weeklyApplications}</span>
                <span className="text-gray-500 ml-1">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Opportunities</CardTitle>
              <Bell className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">
                <CountUp end={mockOpportunities.filter(opp => opp.status === 'Open').length} duration={2} />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Clock className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-gray-500">Active listings</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Opportunities Distribution</CardTitle>
              <CardDescription>Breakdown of opportunities by type</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={opportunityChartData}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {opportunityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 pl-4">
                {opportunityChartData.map((item, index) => (
                  <div key={item.type} className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Application Status Overview</CardTitle>
              <CardDescription>Current status of all applications</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationChartData}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {applicationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 pl-4">
                {applicationChartData.map((item, index) => (
                  <div key={item.status} className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.status}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Most Popular Opportunities</CardTitle>
                  <CardDescription>Opportunities with the highest number of applications</CardDescription>
                </div>
                <Input
                  type="search"
                  placeholder="Search opportunities..."
                  className="max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mostAppliedOpportunities.map((opportunity, index) => (
                    <motion.tr
                      key={opportunity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50/50"
                    >
                      <TableCell className="font-medium">{opportunity.title}</TableCell>
                      <TableCell>{opportunity.organization}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {opportunity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {opportunity.applicationCount} applications
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={opportunity.status === 'Open' ? 'default' : 'secondary'}>
                          {opportunity.status}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Tabs defaultValue="recent-applications" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="recent-applications">Recent Applications</TabsTrigger>
              <TabsTrigger value="recent-users">Recent Users</TabsTrigger>
            </TabsList>
            <TabsContent value="recent-applications">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest application submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Opportunity ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentApplications.map((application, index) => (
                        <motion.tr
                          key={application.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell>{application.id}</TableCell>
                          <TableCell>{application.userId}</TableCell>
                          <TableCell>{application.opportunityId}</TableCell>
                          <TableCell>
                            <Badge variant={
                              application.status === 'Accepted' ? 'default' :
                              application.status === 'Pending' ? 'secondary' :
                              'destructive'
                            }>
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                              {new Date(application.appliedAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent-users">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell>{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">Active</Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}