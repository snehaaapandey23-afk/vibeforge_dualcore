import React from 'react'
import { motion } from 'framer-motion'

export default function RetentionRisk({ departments, retention }: { departments: string[]; retention: Record<string, number> }){
  return (
    <div>
      <div className="font-semibold mb-3">Retention Risk</div>
      <div className="space-y-2">
        {departments.map(d=> {
          const v = retention[d] || 0
          const pct = Math.min(100, v)
          return (
            <motion.div key={d} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-300">{d}</div>
              <div className="flex-1 bg-[rgba(255,255,255,0.03)] rounded h-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9 }} style={{ background: 'linear-gradient(90deg,#4F8CFF,#A855F7)', height: '100%' }} />
              </div>
              <div className="w-12 text-right text-sm">{pct}%</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
