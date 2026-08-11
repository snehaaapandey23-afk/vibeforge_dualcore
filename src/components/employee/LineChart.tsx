import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function buildPath(values: number[], w: number, h: number){
  if (!values.length) return ''
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(1, max - min)
  return values.map((v,i)=>{
    const x = (i/(values.length-1)) * w
    const y = h - ((v - min)/range) * h
    return `${i===0? 'M':'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

export default function LineChart({ values = [] as number[] }: { values?: number[] }){
  const w = 800
  const h = 180
  const d = useMemo(()=> buildPath(values, w, h), [values])
  return (
    <div className="w-full overflow-x-auto touch-pan-x -mx-4 px-4">
      <svg viewBox={`0 0 ${w} ${h}`} width={Math.max(w, 600)} height={180} preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <motion.path d={d} fill="none" stroke="#4F8CFF" strokeWidth={2.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: [0.2,0.8,0.2,1] }} />
        <motion.path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#grad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay:0.2 }} />
      </svg>
    </div>
  )
}
