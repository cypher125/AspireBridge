import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GradientBackground } from '../../components/GradientBackground'

export default function FAQ() {
  return (
    <>
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is AspireBridge?</AccordionTrigger>
            <AccordionContent>
              AspireBridge is a platform that connects students with scholarships, internships, and grants. We aim to make the process of finding and applying for opportunities easier and more accessible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I create an account?</AccordionTrigger>
            <AccordionContent>
              To create an account, click on the "Get Started" button on our homepage. Fill out the registration form with your details, and you'll be ready to start exploring opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is AspireBridge free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, AspireBridge is free for students to use. We believe in making opportunities accessible to everyone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How does the matching system work?</AccordionTrigger>
            <AccordionContent>
              Our AI-powered matching system analyzes your profile, interests, and qualifications to suggest opportunities that best fit you. The more information you provide, the better our matches will be.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can organizations post opportunities on AspireBridge?</AccordionTrigger>
            <AccordionContent>
              Yes, organizations can create an account and post opportunities. Please contact our support team for more information on how to get started as an organization.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </>
  )
}

