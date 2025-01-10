'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FaQuestionCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FAQ() {
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
            <FaQuestionCircle className="inline-block mr-4 mb-2" />
            Frequently Asked Questions
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <p className="text-gray-600">Find answers to common questions about AspireBridge</p>
              <div className="flex gap-4">
                <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors duration-200">Privacy Policy</a>
                <a href="/terms" className="text-primary hover:text-primary/80 transition-colors duration-200">Terms of Service</a>
                <a href="/contact" className="text-primary hover:text-primary/80 transition-colors duration-200">Contact Support</a>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  value: "item-1",
                  question: "What is AspireBridge?",
                  answer: "AspireBridge is a platform that connects students with scholarships, internships, and grants. We aim to make the process of finding and applying for opportunities easier and more accessible."
                },
                {
                  value: "item-2",
                  question: "How do I create an account?",
                  answer: "To create an account, click on the \"Get Started\" button on our homepage. Fill out the registration form with your details, and you'll be ready to start exploring opportunities."
                },
                {
                  value: "item-3",
                  question: "Is AspireBridge free to use?",
                  answer: "Yes, AspireBridge is free for students to use. We believe in making opportunities accessible to everyone."
                },
                {
                  value: "item-4",
                  question: "How does the matching system work?",
                  answer: "Our AI-powered matching system analyzes your profile, interests, and qualifications to suggest opportunities that best fit you. The more information you provide, the better our matches will be."
                },
                {
                  value: "item-5",
                  question: "Can organizations post opportunities on AspireBridge?",
                  answer: "Yes, organizations can create an account and post opportunities. Please contact our support team for more information on how to get started as an organization."
                },
                {
                  value: "item-6",
                  question: "How secure is my data on AspireBridge?",
                  answer: "We take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
                },
                {
                  value: "item-7",
                  question: "What kind of support does AspireBridge offer?",
                  answer: "We offer 24/7 email support and live chat during business hours. Our support team can help with technical issues, application processes, and general inquiries about using the platform."
                },
                {
                  value: "item-8",
                  question: "Can I track my applications through AspireBridge?",
                  answer: "Yes, you can track all your applications through your dashboard. You'll receive notifications about application status updates, deadlines, and any required additional information."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <AccordionItem value={item.value} className="border rounded-lg shadow-sm bg-white/90 backdrop-blur-sm hover:shadow-md transition-all">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
