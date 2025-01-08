'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GradientBackground } from '../../components/GradientBackground'
import { User } from '../../lib/mockUsers'
import { Opportunity, Application, mockOpportunities, mockApplications } from '../../lib/mockData'
import { checkForNewOpportunities, getNotifications, markNotificationAsRead, Notification } from '../../lib/notificationSystem'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, ChevronRight, Briefcase, GraduationCap, BookOpen, Gift, Calendar, Award, Clock, Target, Users, TrendingUp, MapPin, DollarSign, Calendar as CalendarIcon } from 'lucide-react'
import CountUp from 'react-countup'
import { format } from 'date-fns'

const getTypeIcon = (type: string) => {
  switch(type) {
    case 'job': return <Briefcase className="h-5 w-5" />
    case 'scholarship': return <GraduationCap className="h-5 w-5" />
    case 'internship': return <BookOpen className="h-5 w-5" />
    case 'grant': return <Gift className="h-5 w-5" />
    default: return <Award className="h-5 w-5" />
  }
}

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Open': return 'bg-green-100 text-green-800'
    case 'Closing Soon': return 'bg-yellow-100 text-yellow-800'
    case 'Closed': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const ITEMS_PER_PAGE = 6

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'job' | 'scholarship' | 'internship' | 'grant'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [recommendedOpportunities, setRecommendedOpportunities] = useState<Opportunity[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<Opportunity[]>([])
  const [trendingOpportunities, setTrendingOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchNotifications = useCallback(() => {
    const newNotifications = checkForNewOpportunities(opportunities)
    setNotifications(prevNotifications => [...prevNotifications, ...newNotifications])
  }, [opportunities])

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const user = JSON.parse(userJson) as User
      setCurrentUser(user)
      fetchNotifications()

      if (user.role === 'student' && user.course) {
        const recommended = opportunities.filter(opp => 
          opp.description.toLowerCase().includes(user.course!.toLowerCase()) ||
          opp.requirements.some(req => req.toLowerCase().includes(user.course!.toLowerCase()))
        ).slice(0, 3)
        setRecommendedOpportunities(recommended)

        const upcoming = opportunities
          .filter(opp => opp.status === 'Open')
          .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
          .slice(0, 3)
        setUpcomingDeadlines(upcoming)

        const trending = [...opportunities]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        setTrendingOpportunities(trending)
      }
      setIsLoading(false)
    } else {
      router.push('/login')
    }
  }, [router, fetchNotifications, opportunities])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (type: 'all' | 'job' | 'scholarship' | 'internship' | 'grant') => {
    setFilterType(type)
    setCurrentPage(1)
  }

  const handleNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const filteredOpportunities = opportunities.filter(opp => 
    (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     opp.organization.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || opp.type === filterType)
  )

  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE)
  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Please log in to access your dashboard</p>
            <Button onClick={() => router.push('/login')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <GradientBackground />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, <span className="text-primary">{currentUser?.name}</span>
            </h1>
            <p className="text-gray-600 mt-2">Your personalized opportunity dashboard awaits</p>
            <div className="mt-4 flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Users className="mr-1 h-4 w-4" />
                {currentUser?.role}
              </Badge>
              {currentUser?.course && (
                <Badge variant="outline" className="text-sm">
                  <BookOpen className="mr-1 h-4 w-4" />
                  {currentUser.course}
                </Badge>
              )}
              <Badge variant="outline" className="text-sm">
                <CalendarIcon className="mr-1 h-4 w-4" />
                Joined {format(new Date(currentUser?.joinDate || Date.now()), 'MMM yyyy')}
              </Badge>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Active Applications"
              value={applications.length}
              icon={<Briefcase className="h-8 w-8 text-primary" />}
              description="Applications in progress"
            />
            <StatsCard
              title="Available Opportunities"
              value={opportunities.length}
              icon={<Gift className="h-8 w-8 text-primary" />}
              description="Open positions"
            />
            <StatsCard
              title="Unread Notifications"
              value={notifications.filter(n => !n.read).length}
              icon={<Bell className="h-8 w-8 text-primary" />}
              description="New updates"
            />
            <StatsCard
              title="Success Rate"
              value={Math.round((applications.filter(a => a.status === 'Accepted').length / applications.length) * 100) || 0}
              icon={<TrendingUp className="h-8 w-8 text-primary" />}
              description="Application success"
              suffix="%"
            />
          </div>

          {/* Notifications */}
          <AnimatePresence>
            {notifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Bell className="mr-2 h-5 w-5 text-primary" />
                      Recent Notifications
                    </CardTitle>
                    <CardDescription>Stay updated with the latest opportunities and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 rounded-lg transition-all ${
                            notification.read ? 'bg-gray-50' : 'bg-blue-50'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleNotificationRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-800 font-medium">{notification.message}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {format(new Date(notification.timestamp), 'MMM d, yyyy • h:mm a')}
                              </p>
                            </div>
                            {!notification.read && (
                              <Badge variant="default" className="ml-2">New</Badge>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommended Opportunities */}
          {currentUser?.role === 'student' && recommendedOpportunities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
                  <p className="text-gray-600">Personalized opportunities based on your profile</p>
                </div>
                <Button variant="outline">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming Deadlines */}
          {upcomingDeadlines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
                  <p className="text-gray-600">Don't miss these closing opportunities</p>
                </div>
                <Button variant="outline">View Calendar</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingDeadlines.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} showDeadline />
                ))}
              </div>
            </motion.div>
          )}

          {/* Opportunity Explorer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Explore Opportunities</h2>
                <p className="text-gray-600">Discover and apply to opportunities that match your interests</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  {['all', 'job', 'scholarship', 'internship', 'grant'].map((type) => (
                    <Button
                      key={type}
                      variant={filterType === type ? 'default' : 'outline'}
                      onClick={() => handleFilterChange(type as any)}
                      className="capitalize"
                    >
                      {getTypeIcon(type)}
                      <span className="ml-2">{type}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {paginatedOpportunities.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {paginatedOpportunities.map((opportunity) => (
                    <OpportunityCard 
                      key={opportunity.id} 
                      opportunity={opportunity}
                      showDeadline
                      showLocation
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(i + 1)}
                        className="w-10 h-10 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No opportunities found matching your criteria.</p>
                  <Button className="mt-4" onClick={() => {
                    setSearchTerm('')
                    setFilterType('all')
                  }}>Clear Filters</Button>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Applications Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Applications</h2>
                <p className="text-gray-600">Track your application progress</p>
              </div>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View History
              </Button>
            </div>
            
            {applications.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Opportunity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => {
                      const opportunity = opportunities.find(opp => opp.id === application.opportunityId);
                      return opportunity ? (
                        <motion.tr
                          key={application.id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getTypeIcon(opportunity.type)}
                              <span className="ml-2 font-medium text-gray-900">{opportunity.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={`https://logo.clearbit.com/${opportunity.organization.toLowerCase().replace(/\s+/g, '')}.com`}
                                alt=""
                                className="h-6 w-6 rounded-full mr-2"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                              <span className="text-gray-500">{opportunity.organization}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Badge variant={
                              application.status === 'Pending' ? 'secondary' :
                              application.status === 'Accepted' ? 'default' :
                              'destructive'
                            }>
                              {application.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                            {format(new Date(application.appliedAt), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </motion.tr>
                      ) : null;
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">You haven't submitted any applications yet.</p>
                  <p className="text-gray-500 mb-4">Start exploring opportunities and apply today!</p>
                  <Button>Start Exploring Opportunities</Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description,
  suffix = ''
}: { 
  title: string, 
  value: number, 
  icon: React.ReactNode,
  description: string,
  suffix?: string
}) => (
  <Card className="bg-white/50 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            <CountUp end={value} duration={2} suffix={suffix} />
          </h3>
        </div>
        {icon}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </CardContent>
  </Card>
)

const OpportunityCard = ({ 
  opportunity,
  showDeadline = false,
  showLocation = false 
}: { 
  opportunity: Opportunity,
  showDeadline?: boolean,
  showLocation?: boolean
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getTypeIcon(opportunity.type)}
            <Badge variant="outline" className="capitalize">
              {opportunity.type}
            </Badge>
          </div>
          <Badge className={getStatusColor(opportunity.status)}>
            {opportunity.status}
          </Badge>
        </div>
        <CardTitle className="mt-4 line-clamp-2">{opportunity.title}</CardTitle>
        <CardDescription className="line-clamp-2">{opportunity.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{opportunity.organization}</span>
          </div>
          {showLocation && opportunity.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{opportunity.location}</span>
            </div>
          )}
          {opportunity.funding && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{opportunity.funding}</span>
            </div>
          )}
          {showDeadline && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Deadline: {format(new Date(opportunity.deadline), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex space-x-2">
          <Link href={`/opportunity/${opportunity.id}`} className="flex-1">
            <Button className="w-full group">
              View Details
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)
