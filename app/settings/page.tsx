'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { User, updateUser } from '../../lib/mockUsers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Lock, Bell, Moon, Sun, User as UserIcon, Settings as SettingsIcon, Globe, Shield, Smartphone, Eye, Languages, Clock, Palette } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [language, setLanguage] = useState('english')
  const [timezone, setTimezone] = useState('UTC')
  const [theme, setTheme] = useState('system')
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      setCurrentUser(JSON.parse(userJson))
    } else {
      router.push('/login')
    }

    if (typeof window !== 'undefined') {
      setIsDarkMode(localStorage.theme === 'dark')
    }
  }, [router])

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentUser && oldPassword === currentUser.password && newPassword === confirmPassword) {
      const updatedUser = { ...currentUser, password: newPassword }
      updateUser(updatedUser)
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      toast({
        title: "Error",
        description: "Please check your passwords and try again.",
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

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications)
    toast({
      title: "Settings Updated",
      description: `Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}.`,
    })
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl">
                <SettingsIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Account Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="profile">Profile & Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-primary" />
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
                        <Input value={currentUser.name} className="bg-white" disabled />
                      </div>
                      <div>
                        <Label>Email Address</Label>
                        <Input value={currentUser.email} className="bg-white" disabled />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input value={currentUser.role} className="bg-white capitalize" disabled />
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <Input value="January 2024" className="bg-white" disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="oldPassword">Current Password</Label>
                          <Input
                            id="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Application Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your experience and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
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

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          <Bell className="h-5 w-5 text-primary" />
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

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          <Smartphone className="h-5 w-5 text-primary" />
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

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          <Languages className="h-5 w-5 text-primary" />
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
                <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacy & Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your privacy and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          <Globe className="h-5 w-5 text-primary" />
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

                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-4">
                          <Eye className="h-5 w-5 text-primary" />
                          <div>
                            <Label className="font-medium">Activity Status</Label>
                            <p className="text-sm text-gray-500">Show when you're active</p>
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
