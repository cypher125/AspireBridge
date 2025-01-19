import './globals.css'
import './custom-animations.css'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AspireBridge - Your Gateway to Scholarships, Internships, and Grants',
  description: 'Discover and apply for scholarships, internships, jobs, and grants with AspireBridge.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

