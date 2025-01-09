'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function BackgroundBeams() {
  return (
    <motion.div 
      className="fixed inset-0 -z-10 h-full w-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/50 to-black" />
    </motion.div>
  )
} 