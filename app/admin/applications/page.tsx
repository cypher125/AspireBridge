'use client'

import { useState } from 'react';
import { useApplications, useUpdateApplicationStatus, useBulkUpdateApplicationStatus, useApplicationStats } from '@/hooks/useApplications';
import { Application } from '@/lib/api/applications';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, Badge } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function ManageApplications() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: applications, isLoading } = useApplications();
  const { data: stats } = useApplicationStats();
  const updateStatus = useUpdateApplicationStatus();
  const bulkUpdateStatus = useBulkUpdateApplicationStatus();

  const handleUpdateStatus = async (id: number, status: Application['status']) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({
        title: 'Success',
        description: 'Application status updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
    }
  };

  const handleBulkUpdate = async (status: Application['status']) => {
    if (selectedIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select applications to update',
        variant: 'destructive',
      });
      return;
    }

    try {
      await bulkUpdateStatus.mutateAsync({ ids: selectedIds, status });
      setSelectedIds([]);
      toast({
        title: 'Success',
        description: 'Applications updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update applications',
        variant: 'destructive',
      });
    }
  };

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.user.toString().includes(searchTerm) ||
      app.opportunity.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
              </CardContent>
            </Card>
            {/* Add more stat cards */}
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                      />
                    </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications?.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Application #{application.id}</CardTitle>
                      <CardDescription>
                        Applied on: {new Date(application.applied_at).toLocaleDateString()}
                      </CardDescription>
                                  </div>
                    <Badge>{application.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Add application details */}
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
