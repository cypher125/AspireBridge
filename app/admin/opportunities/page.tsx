'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOpportunities, useCreateOpportunity, useOpportunityStats } from '@/hooks/useOpportunities'
import { Opportunity } from '@/lib/api/opportunities'
import { toast } from '@/components/ui/use-toast'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, ArrowLeft, Briefcase, Calendar, Users, TrendingUp, Filter, Download, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from "@/components/ui/label"

export default function ManageOpportunities() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)

  const { data: opportunities, isLoading } = useOpportunities()
  const { data: stats } = useOpportunityStats()
  const createOpportunity = useCreateOpportunity()

  const handleAddOpportunity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      
      const newOpportunity = {
        title: formData.get('title') as string,
        type: formData.get('type') as string,
        organization: formData.get('organization') as string,
        description: formData.get('description') as string,
        requirements: formData.get('requirements') as string,
        location: formData.get('location') as string,
        start_date: formData.get('start_date') as string,
        application_deadline: formData.get('deadline') as string,
      }

      await createOpportunity.mutateAsync(newOpportunity)
      setIsAddDialogOpen(false)
      form.reset()
      toast({
        title: 'Success',
        description: 'Opportunity created successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create opportunity',
        variant: 'destructive',
      })
    }
  }

  const filteredOpportunities = opportunities?.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || opp.type === selectedType
    return matchesSearch && matchesType
  })

  if (isLoading) {
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
                </CardContent>
              </Card>
            </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                      />
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="job">Jobs</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                        <SelectItem value="scholarship">Scholarships</SelectItem>
                        <SelectItem value="grant">Grants</SelectItem>
                      </SelectContent>
                    </Select>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2" /> Add New
            </Button>
                  </div>

          <div className="space-y-4">
            {filteredOpportunities?.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <CardTitle>{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.organization}</CardDescription>
              </CardHeader>
              <CardContent>
                  {/* Add opportunity details */}
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Opportunity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOpportunity}>
            {/* Add form fields */}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
