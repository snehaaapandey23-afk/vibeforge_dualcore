import React from 'react'
import { motion } from 'framer-motion'

export default function SkillReadiness({ skills }: { skills: Record<string, number> }){
  const entries = Object.entries(skills)
  return (
    <div>
      <div className="font-semibold mb-3">Skill Readiness</div>
      <div className="space-y-3">
        {entries.map(([k,v],i)=> (
          <motion.div key={k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.06 }} className="flex items-center gap-3">
            <div className="w-28 text-sm text-gray-300">{k}</div>
            <div className="flex-1 bg-[rgba(255,255,255,0.03)] rounded h-3 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1.0 }} style={{ background: 'linear-gradient(90deg,#6C63FF,#00E5FF)', height: '100%' }} />
            </div>
            <div className="w-12 text-right text-sm">{v}%</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
