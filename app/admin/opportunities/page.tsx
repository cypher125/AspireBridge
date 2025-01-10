'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { User } from '../../../lib/mockUsers'
import { Opportunity, mockOpportunities, addOpportunity, updateOpportunity, deleteOpportunity } from '../../../lib/mockData'
import { notifyNewOpportunity } from '../../../lib/notificationSystem'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, ArrowLeft, Briefcase, Calendar, Users, TrendingUp, Filter, Download, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from "@/components/ui/label"

export default function ManageOpportunities() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
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

  const handleAddOpportunity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const newOpportunity: Opportunity = {
        id: mockOpportunities.length + 1,
        title: formData.get('title') as string,
        type: formData.get('type') as 'job' | 'scholarship' | 'internship' | 'grant',
        organization: formData.get('organization') as string,
        description: formData.get('description') as string,
        requirements: (formData.get('requirements') as string).split('\n'),
        criteria: (formData.get('criteria') as string).split('\n'),
        deadline: formData.get('deadline') as string,
        status: 'Open',
        createdAt: new Date().toISOString(),
      }
      const updatedOpportunities = addOpportunity(newOpportunity)
      setOpportunities(updatedOpportunities)
      notifyNewOpportunity(newOpportunity)
      setIsAddDialogOpen(false)
      form.reset()
      toast.success('Opportunity created successfully')
    } catch (error) {
      toast.error('Failed to create opportunity')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditOpportunity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingOpportunity) return
    setIsLoading(true)
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const updatedOpportunity: Opportunity = {
        ...editingOpportunity,
        title: formData.get('title') as string,
        type: formData.get('type') as 'job' | 'scholarship' | 'internship' | 'grant',
        organization: formData.get('organization') as string,
        description: formData.get('description') as string,
        requirements: (formData.get('requirements') as string).split('\n'),
        criteria: (formData.get('criteria') as string).split('\n'),
        deadline: formData.get('deadline') as string,
        status: formData.get('status') as 'Open' | 'Closed',
      }
      const updatedOpportunities = updateOpportunity(updatedOpportunity)
      setOpportunities(updatedOpportunities)
      setEditingOpportunity(null)
      setIsEditDialogOpen(false)
      toast.success('Opportunity updated successfully')
    } catch (error) {
      toast.error('Failed to update opportunity')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOpportunity = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      setIsLoading(true)
      try {
        const updatedOpportunities = deleteOpportunity(id)
        setOpportunities(updatedOpportunities)
        toast.success('Opportunity deleted successfully')
      } catch (error) {
        toast.error('Failed to delete opportunity')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(mockOpportunities, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const exportFileDefaultName = 'opportunities.json'
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      toast.success('Data exported successfully')
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  const handleSync = async () => {
    setIsLoading(true)
    try {
      // Reset to mock data
      setOpportunities(mockOpportunities)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Data synchronized successfully')
    } catch (error) {
      toast.error('Failed to sync data')
    } finally {
      setIsLoading(false)
    }
  }

  const stats = {
    total: mockOpportunities.length,
    active: mockOpportunities.filter(o => o.status === 'Open').length,
    jobs: mockOpportunities.filter(o => o.type === 'job').length,
    scholarships: mockOpportunities.filter(o => o.type === 'scholarship').length,
  }

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || opp.type === selectedType
    return matchesSearch && matchesType
  })

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <Button
                  onClick={() => router.back()}
                  variant="ghost"
                  size="sm"
                  className="mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Opportunity Management
                </h1>
                <p className="text-gray-500 mt-2">Create and manage opportunities for students</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" onClick={handleSync} disabled={isLoading}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Sync
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Opportunity
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Opportunity</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddOpportunity} className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input name="title" required />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Select name="type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="job">Job</SelectItem>
                            <SelectItem value="scholarship">Scholarship</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="grant">Grant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Organization</Label>
                        <Input name="organization" required />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea name="description" required />
                      </div>
                      <div>
                        <Label>Requirements (one per line)</Label>
                        <Textarea name="requirements" required />
                      </div>
                      <div>
                        <Label>Criteria (one per line)</Label>
                        <Textarea name="criteria" required />
                      </div>
                      <div>
                        <Label>Deadline</Label>
                        <Input type="date" name="deadline" required />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Creating...' : 'Create Opportunity'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Opportunities</CardTitle>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500">
                    <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                    Based on mock data
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Opportunities</CardTitle>
                  <div className="text-2xl font-bold">{stats.active}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500">
                    <Users className="inline mr-1 h-3 w-3 text-blue-500" />
                    From mock data
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Job Openings</CardTitle>
                  <div className="text-2xl font-bold">{stats.jobs}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500">
                    <Briefcase className="inline mr-1 h-3 w-3 text-purple-500" />
                    From mock data
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Scholarships</CardTitle>
                  <div className="text-2xl font-bold">{stats.scholarships}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500">
                    <Calendar className="inline mr-1 h-3 w-3 text-orange-500" />
                    From mock data
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle>All Opportunities</CardTitle>
                    <CardDescription>Showing {filteredOpportunities.length} opportunities</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="job">Jobs</SelectItem>
                        <SelectItem value="scholarship">Scholarships</SelectItem>
                        <SelectItem value="internship">Internships</SelectItem>
                        <SelectItem value="grant">Grants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filteredOpportunities.map((opportunity, index) => (
                          <motion.tr
                            key={opportunity.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-gray-50/50"
                          >
                            <TableCell className="font-medium">{opportunity.title}</TableCell>
                            <TableCell>{opportunity.organization}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {opportunity.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-gray-500">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date(opportunity.deadline).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={opportunity.status === 'Open' ? 'default' : 'secondary'}>
                                {opportunity.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setEditingOpportunity(opportunity)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Opportunity</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleEditOpportunity} className="space-y-4">
                                      <div>
                                        <Label>Title</Label>
                                        <Input name="title" defaultValue={editingOpportunity?.title} required />
                                      </div>
                                      <div>
                                        <Label>Type</Label>
                                        <Select name="type" defaultValue={editingOpportunity?.type}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="job">Job</SelectItem>
                                            <SelectItem value="scholarship">Scholarship</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                            <SelectItem value="grant">Grant</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label>Organization</Label>
                                        <Input name="organization" defaultValue={editingOpportunity?.organization} required />
                                      </div>
                                      <div>
                                        <Label>Description</Label>
                                        <Textarea name="description" defaultValue={editingOpportunity?.description} required />
                                      </div>
                                      <div>
                                        <Label>Requirements (one per line)</Label>
                                        <Textarea name="requirements" defaultValue={editingOpportunity?.requirements.join('\n')} required />
                                      </div>
                                      <div>
                                        <Label>Criteria (one per line)</Label>
                                        <Textarea name="criteria" defaultValue={editingOpportunity?.criteria.join('\n')} required />
                                      </div>
                                      <div>
                                        <Label>Deadline</Label>
                                        <Input type="date" name="deadline" defaultValue={editingOpportunity?.deadline} required />
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <Select name="status" defaultValue={editingOpportunity?.status}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <DialogFooter>
                                        <Button type="submit" disabled={isLoading}>
                                          {isLoading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleDeleteOpportunity(opportunity.id)}
                                  disabled={isLoading}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
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
