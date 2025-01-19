'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GradientBackground } from '../../components/GradientBackground'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'
import { Search, Briefcase, GraduationCap, BookOpen, Gift, Calendar, Target, Users, TrendingUp, MapPin, DollarSign, Bookmark, Share2, ExternalLink, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import CountUp from 'react-countup'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuthStore} from '@/hooks/useAuth'
import apiClient from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  applications_count?: number
  pending_applications?: number
  accepted_applications?: number
  saved_opportunities?: number
  upcoming_interviews?: number
  total_opportunities?: number
  active_opportunities?: number
  total_applications_received?: number
  pending_reviews?: number
  success_rate?: number
}

interface Opportunity {
  id: string
  title: string
  description: string
  organization: string
  location: string
  type: string
  status: string
  funding?: string
  deadline: string
  is_saved: boolean
}

interface Application {
  id: string
  opportunity: {
    id: string
    title: string
    organization: string
  }
  status: string
  applied_at: string
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 9
  const [profileCompletion, setProfileCompletion] = useState(0)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Calculate profile completion percentage
    const calculateProfileCompletion = () => {
      const requiredFields = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        description: user.description,
        avatar_url: user.avatar_url,
      }
      
      const studentFields = user.role === 'student' ? {
        course: user.course,
        matriculation_number: user.matriculation_number,
      } : {}

      const adminFields = user.role === 'admin' ? {
        organization_details: user.organization_details,
      } : {}

      const allFields = {
        ...requiredFields,
        ...studentFields,
        ...adminFields
      }
      
      const completedFields = Object.values(allFields).filter(Boolean).length
      const totalFields = Object.keys(allFields).length
      const percentage = Math.round((completedFields / totalFields) * 100)
      
      setProfileCompletion(percentage)
    }

    calculateProfileCompletion()

    const fetchDashboardData = async () => {
      try {
        setIsPaginationLoading(true)
        
        // Fetch opportunities with pagination
        const opportunitiesRes = await apiClient.get(`/api/opportunities/opportunities?page=${currentPage}`)
        const opportunities = opportunitiesRes.data.results || []
        const totalCount = opportunitiesRes.data.count || 0
        
        // Fetch total stats from dedicated endpoint
        const statsRes = await apiClient.get('/api/opportunities/opportunities/dashboard_stats/')
        
        // Fetch saved opportunities
        const savedRes = await apiClient.get('/api/opportunities/opportunities/saved/')
        const savedOpps = Array.isArray(savedRes.data) ? savedRes.data : savedRes.data.results || []
        
        // Fetch user's applications
        const applicationsRes = await apiClient.get('/api/applications/applications/')
        const applications = Array.isArray(applicationsRes.data) ? applicationsRes.data : 
                           applicationsRes.data.results || []
        
        setOpportunities(opportunities)
        setTotalItems(totalCount)
        setSavedOpportunities(savedOpps)
        setStats(statsRes.data)
        setApplications(applications)
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
        setIsPaginationLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, router, currentPage])

  const filteredOpportunities = opportunities ? opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || opp.type.toLowerCase() === filterType
    return matchesSearch && matchesType
  }) : []

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (type: string) => {
    setFilterType(type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSaveOpportunity = async (opportunityId: string) => {
    try {
      await apiClient.post(`/api/opportunities/opportunities/${opportunityId}/toggle_save/`)
      
      // Refresh saved opportunities
      const savedRes = await apiClient.get('/api/opportunities/opportunities/saved/')
      const savedOpps = Array.isArray(savedRes.data) ? savedRes.data : savedRes.data.results || []
      setSavedOpportunities(savedOpps)
      
      // Update is_saved status in opportunities list
      setOpportunities(prevOpps => 
        prevOpps.map(opp => 
          opp.id === opportunityId 
            ? { ...opp, is_saved: !opp.is_saved }
            : opp
        )
      )

      // Update stats with new saved count
      setStats(prevStats => prevStats ? {
        ...prevStats,
        saved_opportunities: savedOpps.length
      } : null)

      toast({
        title: "Success",
        description: "Opportunity saved successfully.",
      })
    } catch (error) {
      console.error('Error toggling save status:', error)
      toast({
        title: "Error",
        description: "Failed to save opportunity. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Header />
      <GradientBackground className="opacity-20" />
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-6">
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome back, {user.name}
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Your personalized opportunity dashboard awaits</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-sm px-4 py-2 rounded-full bg-blue-50 text-blue-600 border-blue-200">
                    <Users className="mr-2 h-4 w-4" />
                    {user.role}
                  </Badge>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Profile Completion</span>
                    <span className="text-sm font-medium text-blue-600">{profileCompletion}%</span>
                  </div>
                  <div className="bg-blue-100 rounded-full h-2 overflow-hidden">
                    <Progress value={profileCompletion} className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                  </div>
                  {profileCompletion < 100 && (
                    <Link href="/profile" className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block">
                      Complete your profile →
                    </Link>
                  )}
                </div>
              </div>
              <Avatar className="h-20 w-20">
                {user.avatar_url && <AvatarImage src={user.avatar_url} alt={user.name} />}
                <AvatarFallback>{user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Applied Applications"
              value={stats?.pending_applications ?? 0}
              icon={<Briefcase className="h-8 w-8 text-primary" />}
              description="Total applications submitted"
            />
            <StatsCard
              title="Available Opportunities"
              value={stats?.active_opportunities ?? 0}
              icon={<Gift className="h-8 w-8 text-primary" />}
              description="Open positions"
            />
            <StatsCard
              title="Saved Items"
              value={stats?.saved_opportunities ?? 0}
              icon={<Bookmark className="h-8 w-8 text-primary" />}
              description="Bookmarked for later"
            />
            <StatsCard
              title="Success Rate"
              value={stats?.success_rate ?? 0}
              icon={<TrendingUp className="h-8 w-8 text-primary" />}
              description="Applications accepted"
              suffix="%"
            />
          </div>

          <Tabs defaultValue="explore" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="applications">Applications ({stats?.pending_applications ?? 0})</TabsTrigger>
              <TabsTrigger value="saved">Saved ({savedOpportunities.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="explore">
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
                    {['all', ...new Set(opportunities.map(opp => opp.type.toLowerCase()))].map((type) => (
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isPaginationLoading ? (
                  // Loading skeleton cards
                  Array.from({ length: 9 }).map((_, index) => (
                    <Card key={index} className="h-[400px] bg-white/50 backdrop-blur-sm border-blue-100">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-24 h-8 bg-blue-100 animate-pulse rounded-lg"></div>
                          <div className="w-20 h-6 bg-blue-100 animate-pulse rounded-full"></div>
                        </div>
                        <div className="w-full h-6 bg-blue-100 animate-pulse rounded mb-2"></div>
                        <div className="w-3/4 h-4 bg-blue-100 animate-pulse rounded"></div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          <div className="w-full h-4 bg-blue-100 animate-pulse rounded"></div>
                          <div className="w-2/3 h-4 bg-blue-100 animate-pulse rounded"></div>
                          <div className="w-1/2 h-4 bg-blue-100 animate-pulse rounded"></div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <div className="w-full h-10 bg-blue-100 animate-pulse rounded"></div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  filteredOpportunities.map((opportunity) => (
                  <OpportunityCard 
                    key={opportunity.id}
                    opportunity={opportunity}
                    showDeadline
                    showLocation
                      isSaved={opportunity.is_saved}
                      onSave={() => handleSaveOpportunity(opportunity.id)}
                    />
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isPaginationLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      disabled={isPaginationLoading}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isPaginationLoading}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applications">
              <ScrollArea className="h-[600px] rounded-lg border p-4">
                <div className="space-y-4">
                  {applications.map((application) => (
                      <Card key={application.id} className="bg-white/50">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                            <CardTitle>{application.opportunity.title}</CardTitle>
                            <CardDescription>{application.opportunity.organization}</CardDescription>
                            </div>
                            <Badge>{application.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-600">
                          Applied on: {format(new Date(application.applied_at), 'MMM d, yyyy')}
                        </p>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOpportunities.map(opportunity => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      showDeadline
                      showLocation
                      isSaved={true}
                    onSave={() => handleSaveOpportunity(opportunity.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// StatsCard Component
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description,
  suffix = '',
}: { 
  title: string, 
  value: number, 
  icon: React.ReactNode,
  description: string,
  suffix?: string,
}) => (
  <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-blue-100">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">
        <CountUp end={value} duration={2} suffix={suffix} />
      </h3>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </CardContent>
  </Card>
)

// OpportunityCard Component
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
    <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-blue-100">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              {getTypeIcon(opportunity.type)}
            </div>
            <Badge variant="outline" className="capitalize bg-blue-50 text-blue-600 border-blue-200">
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
          {showDeadline && opportunity.deadline && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Due {
                (() => {
                  try {
                    const date = new Date(opportunity.deadline)
                    return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'MMM d, yyyy')
                  } catch {
                    return 'Invalid Date'
                  }
                })()
              }</span>
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'closed':
      return 'bg-red-100 text-red-800'
    case 'draft':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'job':
      return <Briefcase className="h-4 w-4" />
    case 'research':
      return <GraduationCap className="h-4 w-4" />
    case 'internship':
      return <BookOpen className="h-4 w-4" />
    case 'project':
      return <Gift className="h-4 w-4" />
    default:
      return <Target className="h-4 w-4" />
  }
}
