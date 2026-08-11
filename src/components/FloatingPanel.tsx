import React from 'react'
import { motion } from 'framer-motion'
import { floatVariant } from '../animations/motion'

export default function FloatingPanel({ children, className = '' }: { children: React.ReactNode; className?: string }){
  return (
    <motion.div
      className={`glass rounded-xlpanel p-6 ${className}`}
      variants={floatVariant}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  )
}
