import React from 'react'
import { motion } from 'framer-motion'

export default function OrgHealth({ series, score }: { series: number[]; score: number }){
  const w = 600, h = 150
  const max = Math.max(...series), min = Math.min(...series)
  const path = series.map((v,i)=> `${i===0?'M':'L'} ${(i/(series.length-1))*w} ${h - ((v-min)/(max-min||1))*h}`).join(' ')
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold">Org Health</div>
          <div className="text-sm text-gray-300">Score and trend</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{score}%</div>
          <div className="text-sm text-gray-400">Overall health</div>
        </div>
      </div>
      <div className="overflow-x-auto touch-pan-x -mx-4 px-4">
        <svg viewBox={`0 0 ${w} ${h}`} width={Math.max(w, 600)} height={h} preserveAspectRatio="none">
        <defs>
          <linearGradient id="ohg" x1="0" x2="1"><stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.14"/><stop offset="100%" stopColor="#A855F7" stopOpacity="0.06"/></linearGradient>
        </defs>
        <motion.path d={path} fill="none" stroke="#4F8CFF" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} />
        <motion.path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#ohg)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      </svg>
      </div>
    </div>
  )
}
