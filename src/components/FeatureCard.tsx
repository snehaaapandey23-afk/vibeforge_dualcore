import React, { useRef } from 'react'
import { motion } from 'framer-motion'

export default function FeatureCard({ title, desc, icon }: { title: string; desc?: string; icon?: React.ReactNode }){
  const ref = useRef<HTMLDivElement | null>(null)

  function onMove(e: React.MouseEvent){
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotX = (y - 0.5) * 8
    const rotY = (x - 0.5) * -12
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`
  }
  function onLeave(){
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <motion.div ref={ref} className="feature-card tilt feature-glow" onMouseMove={onMove} onMouseLeave={onLeave} whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="flex items-center gap-4">
        <div className="icon">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          {desc && <div className="text-sm text-gray-300 mt-1">{desc}</div>}
        </div>
      </div>
    </motion.div>
  )
}
