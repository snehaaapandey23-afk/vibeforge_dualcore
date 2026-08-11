import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function MagneticButton({ children, variant = 'primary', onClick }: { children: React.ReactNode; variant?: 'primary'|'ghost'; onClick?: ()=>void }){
  const ref = useRef<HTMLButtonElement | null>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
    const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height
    const tx = dx * 12
    const ty = dy * 8
    el.style.transform = `translate(${tx}px, ${ty}px)`
  }
  function handleLeave(){
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <button ref={ref} className={`cta-button ${variant==='primary' ? 'cta-primary' : 'cta-ghost'}`} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}>
      <span className="magnetic-inner">{children}</span>
    </button>
  )
}

export default function HeroCTAs(){
  const navigate = useNavigate()

  return (
    <div className="cta-row">
      <motion.div whileHover={{ scale: 1.02 }}>
        <MagneticButton variant="primary" onClick={()=>navigate('/login')}>Get Started</MagneticButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <MagneticButton variant="ghost" onClick={()=>navigate('/dashboard')}>Watch Demo</MagneticButton>
      </motion.div>
    </div>
  )
}
