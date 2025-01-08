import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GradientBackground } from '../../components/GradientBackground'

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: [Current Date]</p>

          <h2>1. Introduction</h2>
          <p>AspireBridge ("we" or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as when you create an account, update your profile, or apply for opportunities. This may include your name, email address, educational background, and other relevant information.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to match you with relevant opportunities.</p>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We may share your information with opportunity providers when you apply for their listings. We do not sell your personal information to third parties.</p>

          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You can do this through your account settings or by contacting us directly.</p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@aspirebridge.com.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

