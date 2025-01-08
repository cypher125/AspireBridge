import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { GradientBackground } from '../../components/GradientBackground'

export default function About() {
  return (
    <>
      <Header />
      <GradientBackground />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">About AspireBridge</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">AspireBridge was founded with a simple yet powerful mission: to connect ambitious students with life-changing opportunities. We believe that every student, regardless of their background, should have access to scholarships, internships, and grants that can shape their future.</p>
            <p className="mb-4">Our platform leverages cutting-edge technology to match students with opportunities that align with their skills, interests, and aspirations. We're not just a search engine; we're a bridge to your future.</p>
            <p>Since our inception, we've helped thousands of students discover and secure opportunities they might have otherwise missed. We're proud of the impact we've made, but we're just getting started. Our vision is to become the go-to platform for students worldwide, making the process of finding and applying for opportunities as seamless as possible.</p>
          </div>
          <div>
            <Image src="/about-image.jpg" alt="AspireBridge Team" width={600} height={400} className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accessibility: We believe in equal access to opportunities for all students.</li>
            <li>Innovation: We continuously improve our platform to better serve our users.</li>
            <li>Integrity: We maintain the highest standards of honesty and transparency in all our operations.</li>
            <li>Empowerment: We aim to empower students to take control of their academic and professional journeys.</li>
            <li>Community: We foster a supportive community of students, educators, and opportunity providers.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

