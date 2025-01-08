import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">AspireBridge</h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering students worldwide by connecting them with life-changing opportunities in scholarships, internships, and grants.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ About Us</Link></li>
              <li><Link href="/opportunities" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ Opportunities</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ Privacy Policy</Link></li>
              <li><Link href="/api/docs" className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center gap-2">→ API Documentation</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-6 text-accent">Connect With Us</h4>
              <div className="flex space-x-5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-transform duration-300 hover:scale-110">
                  <Facebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-transform duration-300 hover:scale-110">
                  <Twitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-transform duration-300 hover:scale-110">
                  <Instagram size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-transform duration-300 hover:scale-110">
                  <Linkedin size={24} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-transform duration-300 hover:scale-110">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Stay Updated</h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:bg-gray-600 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-md transition-colors duration-300 font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {currentYear} AspireBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

