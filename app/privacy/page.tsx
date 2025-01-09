import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaShieldAlt, FaDatabase, FaCookie, FaUserLock, FaClipboardList, FaBell, FaLock } from 'react-icons/fa'

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl transition-all duration-300 ease-in-out">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 transition-all duration-300 ease-in-out hover:scale-105">
            <FaShieldAlt className="inline-block mr-4 mb-1" />
            Privacy Policy
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 prose max-w-none transition-all duration-300 ease-in-out hover:shadow-xl">
            <p className="text-gray-600 mb-8">Last updated: January 2024</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaUserLock className="inline-block mr-3 mb-1" />
              1. Introduction
            </h2>
            <p className="text-gray-600">AspireBridge ("we" or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We take your privacy seriously and are dedicated to maintaining the trust you place in us.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaClipboardList className="inline-block mr-3 mb-1" />
              2. Information We Collect
            </h2>
            <p className="text-gray-600">We collect the following types of information:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Personal Information (name, email, phone number)</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Educational Background</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Professional Experience</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Application History</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Usage Data and Analytics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaDatabase className="inline-block mr-3 mb-1" />
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600">Your information helps us:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Personalize your scholarship and opportunity matches</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Improve our recommendation algorithms</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Communicate important updates and deadlines</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Enhance platform features and user experience</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaLock className="inline-block mr-3 mb-1" />
              4. Data Protection Measures
            </h2>
            <p className="text-gray-600">We employ industry-standard security measures including:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">End-to-end encryption for sensitive data</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Regular security audits and updates</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Secure data centers with 24/7 monitoring</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Multi-factor authentication options</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaUserLock className="inline-block mr-3 mb-1" />
              5. Your Privacy Rights
            </h2>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Access your personal data</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Request data correction or deletion</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Opt-out of marketing communications</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Request data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaCookie className="inline-block mr-3 mb-1" />
              6. Cookie Policy
            </h2>
            <p className="text-gray-600">We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. We categorize cookies as:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Essential cookies for basic functionality</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Analytics cookies to improve our service</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Preference cookies to remember your settings</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaBell className="inline-block mr-3 mb-1" />
              7. Updates to Privacy Policy
            </h2>
            <p className="text-gray-600">We regularly review and update our privacy practices. Major changes will be notified via email or platform notifications.</p>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-md">
              <p className="text-gray-600 text-sm">For privacy-related inquiries, contact us at:</p>
              <p className="text-gray-800 font-medium mt-2">privacy@aspirebridge.com</p>
              <p className="text-gray-600 text-sm mt-4">Response Time: Within 48 hours</p>
              <div className="mt-4 flex gap-4">
                <a href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Terms of Service</a>
                <a href="/cookies" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Cookie Policy</a>
                <a href="/faq" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
