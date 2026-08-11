import React from 'react'
import { motion } from 'framer-motion'

export const variants = {
  fade: { hidden: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 0.45 } }, exit: { opacity: 0, transition: { duration: 0.25 } } },
  scale: { hidden: { opacity: 0, scale: 0.98 }, enter: { opacity: 1, scale: 1, transition: { duration: 0.5 } }, exit: { opacity: 0, scale: 0.995, transition: { duration: 0.28 } } },
  slide: { hidden: { opacity: 0, x: 20 }, enter: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.2,0.8,0.2,1] } }, exit: { opacity: 0, x: -12, transition: { duration: 0.3 } } },
  blur: { hidden: { opacity: 0, filter: 'blur(6px)' }, enter: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } }, exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.28 } } }
}

export default function PageTransition({ children, type = 'fade' }: { children: React.ReactNode; type?: 'fade'|'scale'|'slide'|'blur' }){
  const v = variants[type]
  return (
    <motion.div initial="hidden" animate="enter" exit="exit" variants={v} style={{ width: '100%' }}>
      {children}
    </motion.div>
  )
}
