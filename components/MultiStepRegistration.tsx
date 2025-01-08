'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { mockOpportunities } from '../lib/mockData'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiBookOpen, FiClipboard, FiFileText, FiCheck } from 'react-icons/fi'

type UserRole = 'student' | 'administrator'

interface UserData {
  name: string
  email: string
  password: string
  role: UserRole
  matriculationNumber?: string
  course?: string
  description?: string
  organizationDetails?: string
}

export function MultiStepRegistration() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  })
  const [selectedOpportunities, setSelectedOpportunities] = useState<number[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: UserRole) => {
    setUserData(prev => ({ ...prev, role: value }))
  }

  const handleOpportunityToggle = (opportunityId: number) => {
    setSelectedOpportunities(prev => 
      prev.includes(opportunityId)
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(prev => prev + 1)
    } else {
      // Here you would typically send the registration data to your backend
      console.log('Registration data:', { ...userData, selectedOpportunities })
      
      // For now, we'll just simulate a successful registration
      localStorage.setItem('currentUser', JSON.stringify(userData))
      toast({
        title: "Registration Successful",
        description: "Welcome to AspireBridge! You're now registered.",
      })
      router.push('/dashboard')
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Choose Your Role</h2>
          <RadioGroup value={userData.role} onValueChange={handleRoleChange} className="space-y-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="flex items-center space-x-2 cursor-pointer">
                <FiUser className="w-5 h-5 text-blue-500" />
                <span>Student</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
              <RadioGroupItem value="administrator" id="administrator" />
              <Label htmlFor="administrator" className="flex items-center space-x-2 cursor-pointer">
                <FiClipboard className="w-5 h-5 text-blue-500" />
                <span>Administrator</span>
              </Label>
            </div>
          </RadioGroup>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Personal Information</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <FiUser className="w-4 h-4 text-blue-500" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
                className="border-gray-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-blue-500" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="border-gray-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <FiLock className="w-4 h-4 text-blue-500" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                required
                className="border-gray-200 focus:border-blue-400"
              />
            </div>
            {userData.role === 'student' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="matriculationNumber" className="flex items-center space-x-2">
                    <FiFileText className="w-4 h-4 text-blue-500" />
                    <span>Matriculation Number</span>
                  </Label>
                  <Input
                    id="matriculationNumber"
                    name="matriculationNumber"
                    value={userData.matriculationNumber || ''}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course" className="flex items-center space-x-2">
                    <FiBookOpen className="w-4 h-4 text-blue-500" />
                    <span>Course</span>
                  </Label>
                  <Input
                    id="course"
                    name="course"
                    value={userData.course || ''}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus:border-blue-400"
                  />
                </div>
              </>
            )}
            {userData.role === 'administrator' && (
              <div className="space-y-2">
                <Label htmlFor="organizationDetails" className="flex items-center space-x-2">
                  <FiClipboard className="w-4 h-4 text-blue-500" />
                  <span>Organization Details</span>
                </Label>
                <Textarea
                  id="organizationDetails"
                  name="organizationDetails"
                  value={userData.organizationDetails || ''}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-blue-400 min-h-[100px]"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center space-x-2">
                <FiFileText className="w-4 h-4 text-blue-500" />
                <span>Brief Description</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={userData.description || ''}
                onChange={handleInputChange}
                required
                className="border-gray-200 focus:border-blue-400 min-h-[100px]"
              />
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Select Your Interests</h2>
          <div className="space-y-4 mb-8">
            {mockOpportunities.map(opportunity => (
              <div key={opportunity.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
                <Checkbox
                  id={`opportunity-${opportunity.id}`}
                  checked={selectedOpportunities.includes(opportunity.id)}
                  onCheckedChange={() => handleOpportunityToggle(opportunity.id)}
                />
                <Label htmlFor={`opportunity-${opportunity.id}`} className="cursor-pointer">{opportunity.title}</Label>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm text-blue-800">
                I agree to the terms and conditions and privacy policy
              </Label>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          {step < 3 ? 'Continue' : 'Complete Registration'}
        </Button>
      </div>
    </motion.form>
  )
}
