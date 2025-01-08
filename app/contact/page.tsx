'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { motion } from 'framer-motion'
import { GradientBackground } from '../../components/GradientBackground'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const AnimatedButton = motion(Button);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // For now, we'll just show a success message
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you within 24 hours!",
    })
    // Reset form
    setFormData({ name: '', email: '', message: '', subject: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to work together? We'd love to hear from you.
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <FiMail className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">contact@example.com</p>
              <p className="text-gray-600">support@example.com</p>
            </motion.div>

            <motion.div
              className="p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <FiPhone className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Mon-Fri: 9am - 6pm</p>
            </motion.div>

            <motion.div
              className="p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <FiMapPin className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Business Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
            </motion.div>
          </div>

          <motion.div
            className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Send Us a Message
            </h2>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/50 backdrop-blur-sm"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/50 backdrop-blur-sm"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <AnimatedButton
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </AnimatedButton>
            </motion.form>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Connect With Us
            </h3>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110">LinkedIn</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110">Instagram</a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
