'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaShieldAlt, FaDatabase, FaCookie, FaUserLock, FaClipboardList, FaBell, FaLock } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
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
            <FaShieldAlt className="inline-block mr-4 mb-2" />
            Privacy Policy
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
                <a href="/terms" className="text-primary hover:text-primary/80 transition-colors duration-200">Terms of Service</a>
                <a href="/cookies" className="text-primary hover:text-primary/80 transition-colors duration-200">Cookie Policy</a>
                <a href="/faq" className="text-primary hover:text-primary/80 transition-colors duration-200">FAQ</a>
              </div>
            </div>

            {[
              {
                icon: <FaUserLock />,
                title: "1. Introduction",
                content: "AspireBridge ('we' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We take your privacy seriously and are dedicated to maintaining the trust you place in us."
              },
              {
                icon: <FaClipboardList />,
                title: "2. Information We Collect",
                content: "We collect the following types of information:",
                list: [
                  "Personal Information (name, email, phone number)",
                  "Educational Background",
                  "Professional Experience", 
                  "Application History",
                  "Usage Data and Analytics"
                ]
              },
              {
                icon: <FaDatabase />,
                title: "3. How We Use Your Information",
                content: "Your information helps us:",
                list: [
                  "Personalize your scholarship and opportunity matches",
                  "Improve our recommendation algorithms",
                  "Communicate important updates and deadlines",
                  "Enhance platform features and user experience"
                ]
              },
              {
                icon: <FaLock />,
                title: "4. Data Protection Measures",
                content: "We employ industry-standard security measures including:",
                list: [
                  "End-to-end encryption for sensitive data",
                  "Regular security audits and updates",
                  "Secure data centers with 24/7 monitoring",
                  "Multi-factor authentication options"
                ]
              },
              {
                icon: <FaUserLock />,
                title: "5. Your Privacy Rights",
                content: "You have the right to:",
                list: [
                  "Access your personal data",
                  "Request data correction or deletion",
                  "Opt-out of marketing communications",
                  "Request data portability"
                ]
              },
              {
                icon: <FaCookie />,
                title: "6. Cookie Policy",
                content: "We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. We categorize cookies as:",
                list: [
                  "Essential cookies for basic functionality",
                  "Analytics cookies to improve our service",
                  "Preference cookies to remember your settings"
                ]
              },
              {
                icon: <FaBell />,
                title: "7. Updates to Privacy Policy",
                content: "We regularly review and update our privacy practices. Major changes will be notified via email or platform notifications."
              }
            ].map((section, index) => (
              <motion.section
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-3 text-gray-800 mb-4">
                  {section.icon}
                  {section.title}
                </h2>
                <p className="text-gray-600 mb-4">{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="transition-all duration-200 hover:translate-x-2">{item}</li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md"
            >
              <p className="text-gray-600">For privacy-related inquiries, contact us at:</p>
              <p className="text-gray-800 font-medium mt-2">privacy@aspirebridge.com</p>
              <p className="text-gray-600 text-sm mt-4">Response Time: Within 48 hours</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
