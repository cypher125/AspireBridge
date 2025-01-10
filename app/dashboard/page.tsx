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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, ChevronRight, Briefcase, GraduationCap, BookOpen, Gift, Calendar, Award, Clock, Target, Users, TrendingUp, MapPin, DollarSign, Calendar as CalendarIcon, Menu, Star, Bookmark, Share2, ExternalLink, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import CountUp from 'react-countup'
import { format } from 'date-fns'
import { Tooltip } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800'
    case 'Closed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'job':
      return <Briefcase className="h-4 w-4" />
    case 'scholarship':
      return <GraduationCap className="h-4 w-4" />
    case 'internship':
      return <BookOpen className="h-4 w-4" />
    case 'grant':
      return <Gift className="h-4 w-4" />
    default:
      return <Target className="h-4 w-4" />
  }
}

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || opp.type === filterType
    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage)

  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilterChange = (type: string) => {
    setFilterType(type)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setCurrentUser(user)
      // Filter applications for current user
      const userApplications = mockApplications.filter(app => app.userId === user.id)
      setApplications(userApplications)
    } else {
      router.push('/login')
    }
  }, [router])

  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('explore')
  const [completionRate, setCompletionRate] = useState(75) // Example completion rate

  const acceptedApplications = applications.filter(app => app.status === 'Accepted').length
  const successRate = applications.length > 0 ? Math.round((acceptedApplications / applications.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <GradientBackground className="opacity-30" />
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {currentUser?.name}
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Your personalized opportunity dashboard awaits</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-sm px-4 py-2 rounded-full">
                    <Users className="mr-2 h-4 w-4" />
                    {currentUser?.role}
                  </Badge>
                  {currentUser?.course && (
                    <Badge variant="outline" className="text-sm px-4 py-2 rounded-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      {currentUser.course}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-sm px-4 py-2 rounded-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Member since {format(new Date(currentUser?.joinDate || Date.now()), 'MMM yyyy')}
                  </Badge>
                </div>
              </div>
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser?.profilePicture} />
                <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Completion */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Active Applications"
              value={applications.length}
              icon={<Briefcase className="h-8 w-8 text-primary" />}
              description="Applications in progress"
              trend={+15}
            />
            <StatsCard
              title="Available Opportunities"
              value={opportunities.filter(opp => opp.status === 'Open').length}
              icon={<Gift className="h-8 w-8 text-primary" />}
              description="Open positions"
              trend={+32}
            />
            <StatsCard
              title="Saved Items"
              value={savedOpportunities.length}
              icon={<Bookmark className="h-8 w-8 text-primary" />}
              description="Bookmarked for later"
              trend={+8}
            />
            <StatsCard
              title="Success Rate"
              value={successRate}
              icon={<TrendingUp className="h-8 w-8 text-primary" />}
              description="Application success"
              suffix="%"
              trend={+5}
            />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="explore">
              {/* Search and Filters - Enhanced */}
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="pl-10 w-full"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {['all', 'job', 'scholarship', 'internship', 'grant'].map((type) => (
                      <Button
                        key={type}
                        variant={filterType === type ? 'default' : 'outline'}
                        onClick={() => handleFilterChange(type)}
                        className="capitalize whitespace-nowrap"
                      >
                        {getTypeIcon(type)}
                        <span className="ml-2">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Opportunities Grid - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedOpportunities.map((opportunity) => (
                  <OpportunityCard 
                    key={opportunity.id}
                    opportunity={opportunity}
                    showDeadline
                    showLocation
                    isSaved={savedOpportunities.includes(String(opportunity.id))}
                    onSave={() => {
                      setSavedOpportunities(prev => 
                        prev.includes(String(opportunity.id))
                          ? prev.filter(id => id !== String(opportunity.id))
                          : [...prev, String(opportunity.id)]
                      )
                    }}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applications">
              {/* Enhanced Applications View */}
              <ScrollArea className="h-[600px] rounded-lg border p-4">
                <div className="space-y-4">
                  {applications.map((application) => {
                    const opportunity = opportunities.find(opp => opp.id === application.opportunityId)
                    return opportunity ? (
                      <Card key={application.id} className="bg-white/50">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{opportunity.title}</CardTitle>
                              <CardDescription>{opportunity.organization}</CardDescription>
                            </div>
                            <Badge>{application.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Applied on: {format(new Date(application.appliedAt), 'MMM d, yyyy')}</p>
                        </CardContent>
                      </Card>
                    ) : null
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="saved">
              {/* Saved Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities
                  .filter(opp => savedOpportunities.includes(String(opp.id)))
                  .map(opportunity => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      showDeadline
                      showLocation
                      isSaved={true}
                      onSave={() => {
                        setSavedOpportunities(prev => 
                          prev.filter(id => id !== String(opportunity.id))
                        )
                      }}
                    />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Enhanced StatsCard Component
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description,
  suffix = '',
  trend = 0
}: { 
  title: string, 
  value: number, 
  icon: React.ReactNode,
  description: string,
  suffix?: string,
  trend?: number
}) => (
  <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
        {trend !== 0 && (
          <Badge variant={trend > 0 ? "default" : "destructive"} className="text-xs">
            {trend > 0 ? "+" : ""}{trend}%
          </Badge>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">
        <CountUp end={value} duration={2} suffix={suffix} />
      </h3>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </CardContent>
  </Card>
)

// Enhanced OpportunityCard Component
const OpportunityCard = ({ 
  opportunity,
  showDeadline = false,
  showLocation = false,
  isSaved = false,
  onSave
}: { 
  opportunity: Opportunity,
  showDeadline?: boolean,
  showLocation?: boolean,
  isSaved?: boolean,
  onSave?: () => void
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              {getTypeIcon(opportunity.type)}
            </div>
            <Badge variant="outline" className="capitalize">
              {opportunity.type}
            </Badge>
          </div>
          <Badge className={`${getStatusColor(opportunity.status)}`}>
            {opportunity.status}
          </Badge>
        </div>
        <CardTitle className="text-xl line-clamp-2 mb-2">{opportunity.title}</CardTitle>
        <CardDescription className="line-clamp-2">{opportunity.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <img
              src={`https://logo.clearbit.com/${opportunity.organization.toLowerCase().replace(/\s+/g, '')}.com`}
              alt=""
              className="h-5 w-5 rounded-full mr-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="truncate">{opportunity.organization}</span>
          </div>
          {showLocation && opportunity.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{opportunity.location}</span>
            </div>
          )}
          {opportunity.funding && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{opportunity.funding}</span>
            </div>
          )}
          {showDeadline && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Due {format(new Date(opportunity.deadline), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="w-full flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onSave}
            className={isSaved ? "text-primary" : ""}
          >
            <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Link href={`/opportunity/${opportunity.id}`} className="flex-1">
            <Button className="w-full">
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
)