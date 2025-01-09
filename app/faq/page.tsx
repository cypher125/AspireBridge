import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 bg-[#F8F9FF]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Find answers to common questions about AspireBridge
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                What is AspireBridge?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                AspireBridge is a platform that connects students with scholarships, internships, and grants. We aim to make the process of finding and applying for opportunities easier and more accessible.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                How do I create an account?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                To create an account, click on the "Get Started" button on our homepage. Fill out the registration form with your details, and you'll be ready to start exploring opportunities.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                Is AspireBridge free to use?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                Yes, AspireBridge is free for students to use. We believe in making opportunities accessible to everyone.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                How does the matching system work?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                Our AI-powered matching system analyzes your profile, interests, and qualifications to suggest opportunities that best fit you. The more information you provide, the better our matches will be.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                Can organizations post opportunities on AspireBridge?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                Yes, organizations can create an account and post opportunities. Please contact our support team for more information on how to get started as an organization.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                How secure is my data on AspireBridge?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                We take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                What kind of support does AspireBridge offer?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                We offer 24/7 email support and live chat during business hours. Our support team can help with technical issues, application processes, and general inquiries about using the platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg shadow-sm bg-white/80 backdrop-blur-sm">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 transition-all">
                Can I track my applications through AspireBridge?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                Yes, you can track all your applications through your dashboard. You'll receive notifications about application status updates, deadlines, and any required additional information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </>
  )
}
