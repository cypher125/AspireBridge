'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaGavel, FaClipboardList, FaUserShield, FaCode, FaLock, FaUserCog, FaBan, FaExclamationTriangle, FaEdit, FaBalanceScale } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            <FaGavel className="inline-block mr-4 mb-2" />
            Terms of Service
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 prose max-w-none"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <p className="text-gray-600">Last updated: January 2024</p>
              <div className="flex gap-4">
                <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors duration-200">Privacy Policy</a>
                <a href="/cookies" className="text-primary hover:text-primary/80 transition-colors duration-200">Cookie Policy</a>
                <a href="/faq" className="text-primary hover:text-primary/80 transition-colors duration-200">FAQ</a>
              </div>
            </div>

            {[
              {
                icon: <FaBalanceScale />,
                title: "1. Acceptance of Terms",
                content: "By accessing and using AspireBridge, you accept and agree to be bound by the terms and provision of this agreement. Please read these terms carefully before using our services. Your continued use of AspireBridge constitutes your acknowledgment and agreement to these terms."
              },
              {
                icon: <FaClipboardList />,
                title: "2. Description of Service",
                content: "AspireBridge provides a comprehensive platform for students to discover and apply for scholarships, internships, and grants. While we strive to provide accurate and up-to-date information, we do not guarantee the award of any opportunity listed on our platform.",
                list: [
                  "Comprehensive scholarship database access with regular updates",
                  "Advanced application tracking and management tools",
                  "Extensive resource library with guides and tips",
                  "AI-powered personalized opportunity matching",
                  "Deadline reminders and notification system",
                  "Document storage and management",
                  "Application progress analytics"
                ]
              },
              // ... Add similar objects for other sections
            ].map((section, index) => (
              <motion.section
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-12"
              >
                <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4 group">
                  <span className="p-2 rounded-lg bg-primary/10 text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {section.icon}
                  </span>
                  {section.title}
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 mb-4">{section.content}</p>
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="text-gray-600 flex items-center gap-2 hover:translate-x-2 transition-transform duration-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            ))}

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl border border-primary/10"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
              <p className="text-gray-600">Contact us at <span className="font-medium text-primary">support@aspirebridge.com</span></p>
              <p className="text-gray-600 mt-2">Business Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</p>
              <p className="text-gray-600">Response Time: Within 24-48 business hours</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
