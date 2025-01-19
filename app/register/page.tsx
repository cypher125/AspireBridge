'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { MultiStepRegistration } from '../../components/MultiStepRegistration'
import { motion } from 'framer-motion'
import { GradientBackground } from '../../components/GradientBackground'
import { FiUserPlus, FiTarget, FiShield, FiGlobe } from 'react-icons/fi'

export default function Register() {
  const features = [
    { icon: FiUserPlus, title: "Easy Registration", description: "Simple step-by-step registration process" },
    { icon: FiTarget, title: "Personalized Matching", description: "Get matched with opportunities that fit your profile" },
    { icon: FiGlobe, title: "Global Network", description: "Connect with institutions worldwide" },
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
                Join AspireBridge Today
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start your journey towards educational and career excellence.
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <motion.h1
              className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create Your Account
            </motion.h1>
            <MultiStepRegistration />
            <motion.p
              className="mt-6 text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login here</Link>
            </motion.p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}