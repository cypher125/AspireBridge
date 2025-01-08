import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GradientBackground } from '../../components/GradientBackground'

export default function TermsOfService() {
  return (
    <>
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using AspireBridge, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2>2. Description of Service</h2>
          <p>AspireBridge provides a platform for students to discover and apply for scholarships, internships, and grants. We do not guarantee the award of any opportunity listed on our platform.</p>

          <h2>3. User Conduct</h2>
          <p>You agree to use AspireBridge for lawful purposes only. You must not use AspireBridge in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of AspireBridge.</p>

          <h2>4. Intellectual Property</h2>
          <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to AspireBridge are protected under applicable copyrights, trademarks and other proprietary rights.</p>

          <h2>5. Termination of Agreement</h2>
          <p>We may suspend or terminate your access to AspireBridge, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>AspireBridge is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.</p>

          <h2>7. Limitation of Liability</h2>
          <p>In no event shall AspireBridge be liable for any direct, indirect, incidental, special or consequential damages, resulting from the use or the inability to use the service.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check our Terms periodically for changes.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

