import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaGavel, FaClipboardList, FaUserShield, FaCode, FaLock, FaUserCog, FaBan, FaExclamationTriangle, FaEdit, FaBalanceScale } from 'react-icons/fa'

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl transition-all duration-300 ease-in-out">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 transition-all duration-300 ease-in-out hover:scale-105">
            <FaGavel className="inline-block mr-4 mb-1" />
            Terms of Service
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 prose max-w-none transition-all duration-300 ease-in-out hover:shadow-xl">
            <p className="text-gray-600 mb-8">Last updated: January 2024</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaBalanceScale className="inline-block mr-3 mb-1" />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">By accessing and using AspireBridge, you accept and agree to be bound by the terms and provision of this agreement. Please read these terms carefully before using our services. Your continued use of AspireBridge constitutes your acknowledgment and agreement to these terms.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaClipboardList className="inline-block mr-3 mb-1" />
              2. Description of Service
            </h2>
            <p className="text-gray-600">AspireBridge provides a comprehensive platform for students to discover and apply for scholarships, internships, and grants. While we strive to provide accurate and up-to-date information, we do not guarantee the award of any opportunity listed on our platform. Our services include:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Comprehensive scholarship database access with regular updates</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Advanced application tracking and management tools</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Extensive resource library with guides and tips</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">AI-powered personalized opportunity matching</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Deadline reminders and notification system</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Document storage and management</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Application progress analytics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaUserShield className="inline-block mr-3 mb-1" />
              3. User Conduct
            </h2>
            <p className="text-gray-600">You agree to use AspireBridge for lawful purposes only. Prohibited activities include:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Submitting false or misleading information in applications or profiles</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Attempting to gain unauthorized access to our systems or other users' accounts</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Interfering with other users' access to the service or their application processes</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Engaging in any form of automated data collection or scraping</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Sharing account credentials with unauthorized users</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Posting inappropriate or offensive content</li>
              <li className="transition-all duration-200 ease-in-out hover:translate-x-2">Violating intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaCode className="inline-block mr-3 mb-1" />
              4. Intellectual Property
            </h2>
            <p className="text-gray-600">All content on AspireBridge, including but not limited to text, graphics, logos, images, software, algorithms, and database compilations, is the property of AspireBridge or its content suppliers and is protected by international copyright laws. Users may not reproduce, distribute, modify, or create derivative works without explicit permission.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaLock className="inline-block mr-3 mb-1" />
              5. Privacy and Data Protection
            </h2>
            <p className="text-gray-600">We take your privacy seriously and implement industry-standard security measures to protect your data. Our collection and use of personal information is governed by our Privacy Policy. By using AspireBridge, you consent to our data practices as described in our Privacy Policy. We comply with GDPR, CCPA, and other applicable data protection regulations.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaUserCog className="inline-block mr-3 mb-1" />
              6. Account Security
            </h2>
            <p className="text-gray-600">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We recommend using strong passwords and enabling two-factor authentication when available. Please notify us immediately of any unauthorized use or security breaches. AspireBridge employs industry-standard encryption and security protocols to protect your account.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaBan className="inline-block mr-3 mb-1" />
              7. Termination
            </h2>
            <p className="text-gray-600">We reserve the right to suspend or terminate your access to AspireBridge, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, you may request a copy of your data within 30 days, after which it may be permanently deleted from our systems.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaExclamationTriangle className="inline-block mr-3 mb-1" />
              8. Disclaimer of Warranties
            </h2>
            <p className="text-gray-600">AspireBridge is provided "as is" without warranty of any kind. While we strive for excellence, we do not guarantee the accuracy, completeness, or usefulness of any information on our platform. We make no warranties about the reliability, availability, or performance of our services.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaBalanceScale className="inline-block mr-3 mb-1" />
              9. Limitation of Liability
            </h2>
            <p className="text-gray-600">In no event shall AspireBridge be liable for any direct, indirect, incidental, special or consequential damages arising out of or in any way connected with the use of our service. This includes but is not limited to damages for loss of profits, data, or other intangible losses, even if AspireBridge has been advised of the possibility of such damages.</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 transition-all duration-300 ease-in-out hover:text-gray-900">
              <FaEdit className="inline-block mr-3 mb-1" />
              10. Changes to Terms
            </h2>
            <p className="text-gray-600">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. We will notify users of significant changes via email or through our platform. Your continued use of AspireBridge after any changes indicates your acceptance of the modified terms.</p>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-md">
              <p className="text-gray-600 text-sm">If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="text-gray-800 font-medium mt-2">support@aspirebridge.com</p>
              <p className="text-gray-600 text-sm mt-4">Business Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</p>
              <p className="text-gray-600 text-sm">Response Time: Within 24-48 business hours</p>
              <div className="mt-4 flex gap-4">
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Privacy Policy</a>
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
