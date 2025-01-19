'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin,  DollarSign, Building, ArrowLeft, Share2, BookmarkPlus, Send, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuthStore } from '@/hooks/useAuth'
import apiClient from '@/lib/api'
import { toast } from '@/hooks/use-toast'

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
  requirements?: string | string[]
  benefits?: string | string[]
  timeCommitment?: string
}

interface OpportunityPageProps {
  params: Promise<{ id: string }>
}

export default function OpportunityPage({ params }: OpportunityPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuthStore()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
    resume: null as File | null,
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchOpportunity = async () => {
      try {
        const response = await apiClient.get(`/api/opportunities/opportunities/${id}/`)
        setOpportunity(response.data)
        setIsBookmarked(response.data.is_saved)
        setHasApplied(response.data.has_applied)
        setApplicationData(prevData => ({
          ...prevData,
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phone_number || '',
        }))
      } catch (error) {
        console.error('Error fetching opportunity:', error)
        toast({
          title: "Error",
          description: "Failed to load opportunity details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOpportunity()
  }, [id, router, user])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Success",
      description: "Link copied to clipboard!",
    })
  }

  const handleBookmark = async () => {
    try {
      await apiClient.post(`/api/opportunities/opportunities/${id}/toggle_save/`)
      setIsBookmarked(!isBookmarked)
      toast({
        title: isBookmarked ? "Removed from saved" : "Added to saved",
        description: isBookmarked ? "Opportunity removed from your saved items" : "Opportunity added to your saved items",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update saved status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate file size
      if (applicationData.resume && applicationData.resume.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Resume file size must be less than 10MB",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      if (applicationData.resume) {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (!allowedTypes.includes(applicationData.resume.type)) {
          toast({
            title: "Error",
            description: "Only PDF and Word documents are allowed",
            variant: "destructive",
          })
          return
        }
      }

      const formData = new FormData()
      formData.append('opportunity', id)
      formData.append('cover_letter', applicationData.coverLetter)
      formData.append('name', applicationData.name)
      formData.append('email', applicationData.email)
      formData.append('phone_number', applicationData.phoneNumber)
      
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume)
      }

      await apiClient.post('/api/applications/applications/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setIsApplying(false)
      setHasApplied(true)
      toast({
        title: "Success",
        description: "Application submitted successfully!",
      })
      router.refresh()
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string, error?: string } } }
      const errorMessage = error.response?.data?.detail || error.response?.data?.error || "Failed to submit application. Please try again."
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  if (isLoading || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading opportunity details...</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Date not available'
      }
      return format(date, 'MMM d, yyyy')
    } catch {
      return 'Date not available'
    }
  }

  const calculateDaysLeft = (deadline: string) => {
    try {
      const deadlineDate = new Date(deadline)
      if (isNaN(deadlineDate.getTime())) {
        return { daysLeft: 0, progressValue: 0 }
      }
      const daysLeft = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
      const progressValue = Math.max(0, Math.min(100, (daysLeft / 30) * 100))
      return { daysLeft, progressValue }
    } catch {
      return { daysLeft: 0, progressValue: 0 }
    }
  }

  const { daysLeft, progressValue } = calculateDaysLeft(opportunity.deadline)

  const parseStringToArray = (value: string | string[] | undefined): string[] => {
    if (!value) return []
    if (Array.isArray(value)) return value
    try {
      // First try to parse as JSON
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed
      
      // If it's a string, split by newlines and/or hyphens
      const str = parsed.toString() || value.toString()
      return str
        .split(/[\n\r]+|-/)  // Split by newlines or hyphens
        .map((item: string) => item.trim())  // Trim whitespace
        .filter((item: string) => item.length > 0)  // Remove empty items
    } catch {
      // If JSON parsing fails, treat as string and split by newlines and/or hyphens
      return value
        .toString()
        .split(/[\n\r]+|-/)
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Header />
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="hover:bg-white/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" onClick={handleBookmark}>
                <BookmarkPlus className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-8 mb-8 shadow-lg border border-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-sm capitalize">
                    {opportunity.type}
                  </Badge>
                  <Badge variant={opportunity.status.toLowerCase() === 'active' ? 'success' : 'destructive'}>
                    {opportunity.status}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    {opportunity.organization}
                  </div>
                  {opportunity.location && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {opportunity.location}
                    </div>
                  )}
                  {opportunity.funding && (
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      {opportunity.funding}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-right mb-2">
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="text-lg font-semibold">{formatDate(opportunity.deadline)}</p>
                </div>
                <div className="w-full max-w-[200px]">
                  <Progress value={progressValue} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">{daysLeft} days left to apply</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <Card className="bg-white shadow-sm border-gray-100">
                    <CardHeader>
                      <CardTitle>About this Opportunity</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{opportunity.description}</p>
                        </div>
                      {opportunity.funding && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
                          <p className="text-gray-700">{opportunity.funding}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements">
                  <Card className="bg-white shadow-sm border-gray-100">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                      <CardDescription>What you need to be eligible</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Eligibility Requirements</h3>
                        {opportunity.requirements ? (
                      <ul className="space-y-4">
                            {opportunity.requirements
                              .toString()
                              .split(/[\n\r]+|-/)
                              .map(item => item.trim())
                              .filter(item => item.length > 0)
                              .map((req, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start bg-gray-50 p-4 rounded-lg"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </motion.li>
                        ))}
                      </ul>
                        ) : (
                          <p className="text-gray-500">No specific requirements listed.</p>
                        )}
                      </div>

                      {opportunity.benefits && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Benefits & Perks</h3>
                      <ul className="space-y-4">
                            {opportunity.benefits
                              .toString()
                              .split(/[\n\r]+|-/)
                              .map(item => item.trim())
                              .filter(item => item.length > 0)
                              .map((benefit, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start bg-gray-50 p-4 rounded-lg"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <CheckCircle className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                        </div>
                      )}

                      {opportunity.funding && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Compensation</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 mr-3 text-blue-500" />
                              <span className="text-gray-700">{opportunity.funding}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-white shadow-sm border-gray-100 sticky top-8">
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {opportunity.status.toLowerCase() === 'active' ? (
                    hasApplied ? (
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <p className="text-lg font-medium text-gray-900">Application Submitted</p>
                        <p className="text-sm text-gray-500 mt-1">You have already applied for this opportunity</p>
                      </div>
                    ) : (
                    <Button
                      onClick={() => setIsApplying(true)}
                      className="w-full"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" /> Apply Now
                    </Button>
                    )
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900">Not Accepting Applications</p>
                      <p className="text-sm text-gray-500 mt-1">This opportunity is no longer active</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <AnimatePresence>
            {isApplying && (
              <motion.div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-xl w-full max-w-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Apply for {opportunity.title}</CardTitle>
                      <CardDescription>Please fill out all required fields carefully</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleApply} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input
                              value={applicationData.name}
                              onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                              required
                              className="bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <Input
                              type="email"
                              value={applicationData.email}
                              onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                              required
                              className="bg-gray-50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            value={applicationData.phoneNumber}
                            onChange={(e) => setApplicationData({...applicationData, phoneNumber: e.target.value})}
                            required
                            className="bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Cover Letter</label>
                          <Textarea
                            value={applicationData.coverLetter}
                            onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                            required
                            className="h-40 bg-gray-50"
                            placeholder="Tell us why you're interested in this opportunity..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Resume/CV</label>
                          <Input
                            type="file"
                            onChange={(e) => setApplicationData({
                              ...applicationData,
                              resume: e.target.files ? e.target.files[0] : null
                            })}
                            accept=".pdf,.doc,.docx"
                            required
                            className="bg-gray-50"
                          />
                        </div>
                        <CardFooter className="px-0 pb-0">
                          <div className="flex justify-end gap-4 w-full">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsApplying(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">
                              Submit Application
                            </Button>
                          </div>
                        </CardFooter>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

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
