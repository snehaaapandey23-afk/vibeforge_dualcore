import React from 'react'
import { motion } from 'framer-motion'

export default function LeadershipPipeline({ levels }: { levels: { level: string; count: number }[] }){
  const total = levels.reduce((a,b)=>a+b.count,0)
  return (
    <div>
      <div className="font-semibold mb-3">Leadership Pipeline</div>
      <div className="space-y-2">
        {levels.map((l,i)=> (
          <motion.div key={l.level} initial={{ opacity: 0, x: 12 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.06 }} className="flex items-center gap-3">
            <div className="w-28 text-sm text-gray-300">{l.level}</div>
            <div className="flex-1 bg-[rgba(255,255,255,0.03)] rounded h-3 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(l.count/Math.max(1,total))*100}%` }} transition={{ duration: 0.9 }} style={{ background: 'linear-gradient(90deg,#4F8CFF,#A855F7)', height: '100%' }} />
            </div>
            <div className="w-12 text-right text-sm">{l.count}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
