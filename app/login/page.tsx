'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { authenticateUser, User } from '../../lib/mockUsers'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientBackground } from '../../components/GradientBackground'
import { FiLock, FiMail, FiUser, FiShield, FiAward, FiBookOpen, FiGlobe } from 'react-icons/fi'
import Image from 'next/image'

const AnimatedButton = motion(Button);

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = authenticateUser(email, password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      setError('Invalid email or password')
    }
  }

  const features = [
    { icon: FiAward, title: "Merit-Based Matching", description: "Get matched with opportunities that align with your achievements" },
    { icon: FiGlobe, title: "Global Network", description: "Access opportunities from institutions worldwide" },
    { icon: FiBookOpen, title: "Learning Resources", description: "Exclusive access to educational content and guides" },
    { icon: FiShield, title: "Secure Platform", description: "Your data is protected with enterprise-grade security" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-8 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back to AspireBridge
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your gateway to endless opportunities in education and career growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <Image
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold">Join 10,000+ students</p>
                  <p className="text-sm text-gray-600">Who found their perfect opportunity</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FiLock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sign In to Your Account
                </h1>
                <p className="text-gray-600 mt-2">Access your personalized dashboard</p>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-50 text-red-500 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="flex items-center">
                    <FiShield className="w-5 h-5 mr-2" />
                    {error}
                  </p>
                </motion.div>
              )}

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="mt-2 relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="mt-2 relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>

                <AnimatedButton
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </AnimatedButton>
              </motion.form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {['Google', 'GitHub', 'LinkedIn'].map((provider) => (
                    <Button
                      key={provider}
                      variant="outline"
                      className="w-full"
                    >
                      {provider}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Create Account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
