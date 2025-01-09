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
import { Lock, Bell, Moon, Sun, User as UserIcon, Settings as SettingsIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <SettingsIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Account Settings</h1>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile & Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      View and manage your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={currentUser.name} disabled />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={currentUser.email} disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Security
                    </CardTitle>
                    <CardDescription>
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <Label htmlFor="oldPassword">Current Password</Label>
                        <Input
                          id="oldPassword"
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
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
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Preferences</CardTitle>
                    <CardDescription>
                      Customize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
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

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5" />
                        <div>
                          <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates about opportunities</p>
                        </div>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={toggleEmailNotifications}
                      />
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
