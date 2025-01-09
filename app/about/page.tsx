'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import BackgroundBeams from '../../components/BackgroundBeams'
import { GradientBackground } from '../../components/GradientBackground'
import { FaGraduationCap, FaHandshake, FaGlobe, FaUniversity, FaBullseye, FaBook, FaUsers, FaCalendarAlt, FaUserGraduate, FaBuilding, FaBriefcase, FaUserFriends, FaAccessibleIcon, FaLightbulb, FaBalanceScale, FaRocket, FaPeopleCarry, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            About AspireBridge
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">AspireBridge was founded with a simple yet powerful mission: to connect ambitious students with life-changing opportunities. We believe that every student, regardless of their background, should have access to scholarships, internships, and grants that can shape their future.</p>
              <p className="text-lg leading-relaxed">Our platform leverages cutting-edge technology to match students with opportunities that align with their skills, interests, and aspirations. We're not just a search engine; we're a bridge to your future.</p>
              <p className="text-lg leading-relaxed">Since our inception, we've helped thousands of students discover and secure opportunities they might have otherwise missed. We're proud of the impact we've made, but we're just getting started.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Image 
                src="/about-image.jpg" 
                alt="AspireBridge Team" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-16 hover:bg-white/20 transition-colors duration-300"
          >
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <FaRocket className="text-purple-500" />
              Our Vision
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              To become the world's leading platform that democratizes access to educational and professional opportunities, 
              empowering millions of students to achieve their dreams and reach their full potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-purple-500" />
                Our Impact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><FaGraduationCap className="text-blue-500" /> 50,000+ Students Served</li>
                <li className="flex items-center gap-2"><FaHandshake className="text-green-500" /> $10M+ in Scholarships</li>
                <li className="flex items-center gap-2"><FaGlobe className="text-indigo-500" /> Present in 30+ Countries</li>
                <li className="flex items-center gap-2"><FaUniversity className="text-pink-500" /> 1000+ Partner Institutions</li>
              </ul>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaBullseye className="text-purple-500" />
                What We Offer
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><FaBullseye className="text-blue-500" /> Personalized Matching</li>
                <li className="flex items-center gap-2"><FaBook className="text-green-500" /> Resource Library</li>
                <li className="flex items-center gap-2"><FaUsers className="text-indigo-500" /> Mentorship Programs</li>
                <li className="flex items-center gap-2"><FaCalendarAlt className="text-pink-500" /> Application Tracking</li>
              </ul>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaPeopleCarry className="text-purple-500" />
                Our Community
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><FaUserGraduate className="text-blue-500" /> Student Ambassadors</li>
                <li className="flex items-center gap-2"><FaBuilding className="text-green-500" /> Educational Partners</li>
                <li className="flex items-center gap-2"><FaBriefcase className="text-indigo-500" /> Industry Connections</li>
                <li className="flex items-center gap-2"><FaUserFriends className="text-pink-500" /> Alumni Network</li>
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-8 hover:from-purple-900/30 hover:to-pink-900/30 transition-colors duration-300"
          >
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <FaStar className="text-yellow-500" />
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaAccessibleIcon className="text-purple-500" /> Accessibility</h3>
                <p>We believe in equal access to opportunities for all students, regardless of their background.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaLightbulb className="text-yellow-500" /> Innovation</h3>
                <p>We continuously improve our platform with cutting-edge technology to better serve our users.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaBalanceScale className="text-blue-500" /> Integrity</h3>
                <p>We maintain the highest standards of honesty and transparency in all our operations.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaRocket className="text-red-500" /> Empowerment</h3>
                <p>We aim to empower students to take control of their academic and professional journeys.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaPeopleCarry className="text-green-500" /> Community</h3>
                <p>We foster a supportive community of students, educators, and opportunity providers.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaStar className="text-yellow-500" /> Excellence</h3>
                <p>We strive for excellence in everything we do, from user experience to customer support.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
