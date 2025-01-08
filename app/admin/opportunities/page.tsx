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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { GradientBackground } from '../../../components/GradientBackground'

export default function ManageOpportunities() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
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

  const handleAddOpportunity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newOpportunity: Opportunity = {
      id: opportunities.length + 1,
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
  }

  const handleEditOpportunity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingOpportunity) return
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
  }

  const handleDeleteOpportunity = (id: number) => {
    const updatedOpportunities = deleteOpportunity(id)
    setOpportunities(updatedOpportunities)
  }

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          Manage Opportunities
        </motion.h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Opportunity Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Opportunity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Opportunity</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddOpportunity} className="space-y-4">
                    <Input name="title" placeholder="Title" required />
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
                    <Input name="organization" placeholder="Organization" required />
                    <Textarea name="description" placeholder="Description" required />
                    <Textarea name="requirements" placeholder="Requirements (one per line)" required />
                    <Textarea name="criteria" placeholder="Criteria (one per line)" required />
                    <Input name="deadline" type="date" required />
                    <Button type="submit">Add Opportunity</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredOpportunities.map((opportunity) => (
                      <motion.tr
                        key={opportunity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell>{opportunity.title}</TableCell>
                        <TableCell>{opportunity.organization}</TableCell>
                        <TableCell className="capitalize">{opportunity.type}</TableCell>
                        <TableCell>
                          <Badge variant={opportunity.status === 'Open' ? 'success' : 'secondary'}>
                            {opportunity.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
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
                                  <Input name="title" defaultValue={editingOpportunity?.title} placeholder="Title" required />
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
                                  <Input name="organization" defaultValue={editingOpportunity?.organization} placeholder="Organization" required />
                                  <Textarea name="description" defaultValue={editingOpportunity?.description} placeholder="Description" required />
                                  <Textarea name="requirements" defaultValue={editingOpportunity?.requirements.join('\n')} placeholder="Requirements (one per line)" required />
                                  <Textarea name="criteria" defaultValue={editingOpportunity?.criteria.join('\n')} placeholder="Criteria (one per line)" required />
                                  <Input name="deadline" type="date" defaultValue={editingOpportunity?.deadline} required />
                                  <Select name="status" defaultValue={editingOpportunity?.status}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Open">Open</SelectItem>
                                      <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button type="submit">Update Opportunity</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteOpportunity(opportunity.id)}>
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
      </motion.main>
      <Footer />
    </>
  )
}

