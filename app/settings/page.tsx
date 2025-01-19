'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Lock, Bell, Moon, Sun, User as UserIcon, Settings as SettingsIcon, Globe, Shield, Smartphone, Eye, Languages, Cog, ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore } from '@/hooks/useAuth'
import apiClient from '@/lib/api'

export default function Settings() {
  const { user } = useAuthStore()
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [language, setLanguage] = useState('english')
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    if (typeof window !== 'undefined') {
      setIsDarkMode(localStorage.theme === 'dark')
    }
  }, [router, user])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwords.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    try {
      await apiClient.post('/api/users/change_password/', {
        old_password: passwords.currentPassword,
        new_password: passwords.newPassword
      })

      toast({
        title: "Success",
        description: "Password updated successfully",
      })

      // Clear form
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please check your current password and try again.",
        variant: "destructive",
      })
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  const toggleEmailNotifications = async () => {
    try {
      await apiClient.post('/user/preferences', {
        emailNotifications: !emailNotifications
      })
      setEmailNotifications(!emailNotifications)
      toast({
        title: "Settings Updated",
        description: `Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}.`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="hover:bg-blue-50 mr-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <div className="p-3 bg-blue-100 rounded-xl">
                <SettingsIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Account Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-white/50 backdrop-blur-sm border-blue-100">
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/10 data-[state=active]:to-indigo-600/10">Profile & Security</TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/10 data-[state=active]:to-indigo-600/10">Preferences</TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/10 data-[state=active]:to-indigo-600/10">Privacy & Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      View and manage your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label>Full Name</Label>
                        <Input value={`${user.first_name} ${user.last_name}`} className="bg-white" disabled />
                      </div>
                      <div>
                        <Label>Email Address</Label>
                        <Input value={user.email} className="bg-white" disabled />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input value={user.role} className="bg-white capitalize" disabled />
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <Input value="January 2024" className="bg-white" disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            className="bg-white"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cog className="h-5 w-5 text-blue-600" />
                      Application Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your experience and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          {isDarkMode ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-blue-600" />}
                          <div>
                            <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                            <p className="text-sm text-gray-500">Adjust the appearance</p>
                          </div>
                        </div>
                        <Switch
                          id="darkMode"
                          checked={isDarkMode}
                          onCheckedChange={toggleDarkMode}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          <Bell className="h-5 w-5 text-blue-600" />
                          <div>
                            <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive email updates</p>
                          </div>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={emailNotifications}
                          onCheckedChange={toggleEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          <Smartphone className="h-5 w-5 text-blue-600" />
                          <div>
                            <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                            <p className="text-sm text-gray-500">Get mobile alerts</p>
                          </div>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={pushNotifications}
                          onCheckedChange={() => setPushNotifications(!pushNotifications)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          <Languages className="h-5 w-5 text-blue-600" />
                          <div>
                            <Label className="font-medium">Language</Label>
                            <p className="text-sm text-gray-500">Select your preferred language</p>
                          </div>
                        </div>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Privacy & Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your privacy and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          <Globe className="h-5 w-5 text-blue-600" />
                          <div>
                            <Label className="font-medium">Profile Visibility</Label>
                            <p className="text-sm text-gray-500">Control who can see your profile</p>
                          </div>
                        </div>
                        <Select defaultValue="public">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="contacts">Contacts Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-4">
                          <Eye className="h-5 w-5 text-blue-600" />
                          <div>
                            <Label className="font-medium">Activity Status</Label>
                            <p className="text-sm text-gray-500">Show when you&apos;re active</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
} 