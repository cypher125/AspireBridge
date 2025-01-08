'use client'

import { motion } from 'framer-motion'

export const GradientBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
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
    />
  )
}

