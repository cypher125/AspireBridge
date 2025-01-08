'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from "@/components/ui/button"
import { ChevronRight, Code, Users, Zap, ChevronLeft, ChevronRightIcon, Star, ComputerIcon as IBM, ComputerIcon as Microsoft, CodepenIcon as React, PiIcon as Python, WindIcon as Tailwind } from 'lucide-react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useInView as useInViewReactIntersectionObserver } from 'react-intersection-observer';
import { animate } from 'framer-motion';

const AnimatedButton = motion(Button);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const successStories = [
    { name: 'Sarah Johnson', story: 'Thanks to AspireBridge, I found and secured a full scholarship for my Master\'s degree in Data Science at a top university.', image: 'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Michael Chen', story: 'AspireBridge helped me land my dream internship at a leading tech company, kickstarting my career in software engineering.', image: 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Emily Rodriguez', story: 'I discovered a research grant through AspireBridge that aligned perfectly with my PhD project. It has been instrumental in advancing my work.', image: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'David Kim', story: 'AspireBridge connected me with a mentor who guided me through the application process for a prestigious scholarship. I got it!', image: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Olivia Patel', story: 'The resources on AspireBridge helped me prepare a winning application for a competitive research position at NASA.', image: 'https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Carlos Mendez', story: 'I found and applied for multiple internships through AspireBridge. Now I have valuable experience on my resume!', image: 'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Aisha Rahman', story: 'AspireBridge\'s AI matching system connected me with a grant that perfectly fit my research interests. I\'m now fully funded for my studies!', image: 'https://plus.unsplash.com/premium_photo-1689562473471-6e736b8afe15?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Thomas Lee', story: 'The application tips on AspireBridge were invaluable. They helped me secure a position at a top tech company right after graduation.', image: 'https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(successStories.length / 4))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(successStories.length / 4)) % Math.ceil(successStories.length / 4))
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [])

  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const { ref: ratingRef, inView: ratingInView } = useInViewReactIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (ratingInView) {
      animate(0, 4.8, {
        duration: 2,
        onUpdate: (value) => {
          if (document.getElementById('average-rating')) {
            document.getElementById('average-rating')!.textContent = value.toFixed(1);
          }
        },
      });
      animate(0, 10000, {
        duration: 2,
        onUpdate: (value) => {
          if (document.getElementById('happy-users')) {
            document.getElementById('happy-users')!.textContent = Math.floor(value).toLocaleString();
          }
        },
      });
      animate(0, 95, {
        duration: 2,
        onUpdate: (value) => {
          if (document.getElementById('success-rate')) {
            document.getElementById('success-rate')!.textContent = Math.floor(value).toString();
          }
        },
      });
    }
  }, [ratingInView]);


  return (
    <>
      <Header />
      <main>
        <section className="hero min-h-screen relative overflow-hidden flex items-center">
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              background: [
                'linear-gradient(45deg, #1a365d 0%, #2563eb 50%, #1a365d 100%)',
                'linear-gradient(45deg, #2563eb 0%, #1a365d 50%, #2563eb 100%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/hero-bg-pattern.svg")',
                backgroundSize: '30px 30px',
                opacity: 0.1,
              }}
              animate={{
                backgroundPosition: ['0px 0px', '30px 30px'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              }}
            />
          </motion.div>

          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 text-white space-y-8">
              <motion.h1
                className="text-6xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block">Unlock Your</span>
                <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Full Potential
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover and apply for scholarships, internships, and grants all in one place. Your gateway to success starts here!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/register">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatedButton
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary hover:bg-blue-50 shadow-lg"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  >
                    <AnimatedButton
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-white text-white hover:bg-white/10 shadow-lg"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </AnimatedButton>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-blue-200 font-medium">Trusted by students from top universities:</p>
                <div className="flex flex-wrap gap-3">
                  {['Harvard', 'Stanford', 'MIT', 'Oxford', 'Cambridge'].map((uni, index) => (
                    <motion.span
                      key={uni}
                      className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      {uni}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2 relative mt-12 md:mt-0">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <Image 
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Students collaborating" 
                  width={800} 
                  height={600} 
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </motion.div>

              <motion.div
                className="absolute z-20 left-4 bottom-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <p className="text-primary text-2xl font-bold">10,000+</p>
                <p className="text-gray-600">Daily Opportunities</p>
              </motion.div>

              <motion.div
                className="absolute z-20 right-4 bottom-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <p className="text-primary text-2xl font-bold">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 w-full"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </motion.div>
        </section>

        <section className="features py-24 bg-gradient-to-b from-gray-50 to-gray-100" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Why Choose AspireBridge?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how our innovative platform can transform your academic and career journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Comprehensive Database',
                  description: 'Access thousands of curated opportunities from prestigious institutions and organizations worldwide.',
                  icon: '🌐',
                  gradient: 'from-blue-500 to-cyan-400'
                },
                {
                  title: 'Smart AI Matching',
                  description: 'Our sophisticated AI algorithm analyzes your profile to suggest perfectly aligned opportunities.',
                  icon: '🧠',
                  gradient: 'from-purple-500 to-pink-400'
                },
                {
                  title: 'Streamlined Applications',
                  description: 'Apply seamlessly to multiple opportunities with our one-click application system.',
                  icon: '📝',
                  gradient: 'from-green-500 to-emerald-400'
                },
                {
                  title: 'Instant Notifications',
                  description: 'Receive real-time updates about application statuses, deadlines, and new opportunities.',
                  icon: '🔔',
                  gradient: 'from-yellow-500 to-orange-400'
                },
                {
                  title: 'Expert Mentorship',
                  description: 'Connect with industry experts and successful alumni for personalized guidance.',
                  icon: '🎓',
                  gradient: 'from-red-500 to-rose-400'
                },
                {
                  title: 'Enterprise Security',
                  description: 'Rest assured with our bank-grade encryption and advanced security protocols.',
                  icon: '🔒',
                  gradient: 'from-indigo-500 to-violet-400'
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className={`inline-block p-4 rounded-full bg-gradient-to-r ${feature.gradient} mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-4xl">{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <motion.div
                    className="mt-6 h-1 w-16 mx-auto rounded bg-gradient-to-r ${feature.gradient}"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="api-cta py-48 relative overflow-hidden" style={{ backgroundImage: 'url("https://cdn.prod.website-files.com/5e7cc883b1989464b49b451e/637c9acc106afa297ceb13a8_8.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Powerful API for Developers
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Integrate AspireBridge's extensive database into your own applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/api/docs">
                <AnimatedButton
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-200 animate-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Explore API Documentation
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'url("/api-bg-pattern.svg")',
              backgroundSize: '200% 200%',
              opacity: 0.1,
            }}
          />
        </section>

        <section className="success-stories py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Success Stories
            </motion.h2>
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex transition-transform duration-300 ease-in-out" 
                  animate={{ x: `-${currentSlide * 100}%` }}
                >
                  {Array.from({ length: Math.ceil(successStories.length / 4) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4">
                      {successStories.slice(slideIndex * 4, slideIndex * 4 + 4).map((story, index) => (
                        <motion.div
                          key={index}
                          className="w-1/4 flex-shrink-0"
                          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform transition duration-300 hover:scale-105">
                            <Image src={story.image} alt={story.name} width={80} height={80} className="rounded-full mb-4" />
                            <h3 className="text-lg font-bold mb-2">{story.name}</h3>
                            <p className="italic text-sm text-center">"{story.story}"</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
              <button 
                onClick={prevSlide} 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextSlide} 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        <section className="ratings py-16 bg-gray-100" ref={ratingRef}>
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What Our Users Say
            </motion.h2>
            <div className="flex flex-wrap justify-center items-center space-x-8 mb-16">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">
                  <span id="average-rating">0.0</span>
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg">Average Rating</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">
                  <span id="happy-users">0</span>+
                </div>
                <p className="text-lg">Happy Users</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-4xl font-bold mb-2">
                  <span id="success-rate">0</span>%
                </div>
                <p className="text-lg">Success Rate</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-4">Personalized Matching</h3>
                <p className="text-gray-600">Our AI-powered system matches you with opportunities that perfectly align with your skills, interests, and career goals.</p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
                <p className="text-gray-600">Get access to mentors and advisors who have helped thousands of students achieve their academic and career aspirations.</p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4">Application Support</h3>
                <p className="text-gray-600">From essay reviews to interview preparation, we provide comprehensive support throughout your application journey.</p>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <motion.p 
                className="text-xl text-gray-600 italic mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                "AspireBridge has revolutionized how students connect with opportunities. Our platform's success is measured by your achievements."
              </motion.p>
            </div>
          </div>
        </section>

        <section className="cta bg-gradient-to-br from-black via-gray-900 to-black text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Bridge Your Aspirations?
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of students who have already found their path to success with AspireBridge.
            </motion.p>
            
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center bg-gray-800 rounded-lg px-6 py-3">
                <Star className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-lg">4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-lg px-6 py-3">
                <Users className="text-blue-400 w-5 h-5 mr-2" />
                <span className="text-lg">50K+ Active Users</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-lg px-6 py-3">
                <Zap className="text-green-400 w-5 h-5 mr-2" />
                <span className="text-lg">24/7 Support</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Link href="/register">
                <AnimatedButton
                  size="lg"
                  variant="secondary"
                  className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Create Your Free Account
                </AnimatedButton>
              </Link>
              <motion.div
                className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-3 py-1 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Limited Time Offer!
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="partners py-48 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Partners
            </motion.h2>
            <motion.p 
              className="text-xl text-center text-gray-600 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We collaborate with industry leaders to bring you the best opportunities
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-12 mb-20">
              {[
                { 
                  name: 'IBM', 
                  icon: '/partners/ibm.svg',
                  description: 'Technology & Innovation Partner' 
                },
                { 
                  name: 'Microsoft', 
                  icon: '/partners/microsoft.svg',
                  description: 'Cloud Solutions Partner'
                },
                { 
                  name: 'React', 
                  icon: '/partners/react.svg',
                  description: 'Development Framework Partner'
                },
                { 
                  name: 'Django', 
                  icon: '/partners/django.svg', 
                  description: 'Backend Technology Partner'
                },
                { 
                  name: 'Tailwind', 
                  icon: '/partners/tailwind.svg',
                  description: 'Design System Partner'
                },
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  className="partner-logo-container flex flex-col items-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-32 h-32 flex items-center justify-center bg-white shadow-lg rounded-full mb-4">
                    <Image
                      src={partner.icon}
                      alt={`${partner.name} logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-lg font-bold text-center">{partner.name}</p>
                  <p className="text-gray-600 text-center mt-2">{partner.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-16">
              <motion.h3 
                className="text-2xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Partnership Benefits
              </motion.h3>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="text-xl font-semibold mb-4">Exclusive Access</h4>
                  <p className="text-gray-600">Get priority access to internships and job opportunities with our partner companies</p>
                </motion.div>
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h4 className="text-xl font-semibold mb-4">Industry Insights</h4>
                  <p className="text-gray-600">Learn directly from industry experts through workshops and webinars</p>
                </motion.div>
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h4 className="text-xl font-semibold mb-4">Technical Resources</h4>
                  <p className="text-gray-600">Access cutting-edge tools and technologies used by leading companies</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

