'use client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { motion } from 'framer-motion'

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to integrate with the AspireBridge platform
            </p>
          </motion.div>

          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Authentication</h2>
              <p className="mb-6 text-gray-600">To authenticate, send a POST request to the following endpoint:</p>
              <div className="overflow-x-auto">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                  <code>
                    {`POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Opportunities</h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">List Opportunities</h3>
                <p className="mb-4 text-gray-600">To retrieve a list of opportunities, send a GET request to:</p>
                <div className="overflow-x-auto">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                    <code>
                      {`GET /api/opportunities
Authorization: Bearer {access_token}`}
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Create Opportunity</h3>
                <p className="mb-4 text-gray-600">To create a new opportunity, send a POST request to:</p>
                <div className="overflow-x-auto">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                    <code>
                      {`POST /api/opportunities
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Software Engineering Internship",
  "description": "3-month internship opportunity",
  "company": "Tech Co.",
  "deadline": "2023-08-31"
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Applications</h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Submit Application</h3>
                <p className="mb-4 text-gray-600">To submit an application for an opportunity, send a POST request to:</p>
                <div className="overflow-x-auto">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                    <code>
                      {`POST /api/applications
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "opportunityId": 1,
  "coverLetter": "I am excited to apply for this opportunity..."
}`}
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Get Application Status</h3>
                <p className="mb-4 text-gray-600">To retrieve the status of an application, send a GET request to:</p>
                <div className="overflow-x-auto">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                    <code>
                      {`GET /api/applications/{applicationId}
Authorization: Bearer {access_token}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
