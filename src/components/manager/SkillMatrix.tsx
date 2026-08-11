import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { TeamMember } from '../../utils/fakeManagerData'

export default function SkillMatrix({ members, skills }: { members: TeamMember[]; skills: string[] }){
  const [hover, setHover] = useState<{m?:string,s?:string}>({})
  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-3">
        {skills.map((s,si)=> (
          <div key={s} className="col-span-1 font-semibold text-sm text-gray-300">{s}</div>
        ))}
      </div>
      <div className="mt-3 overflow-auto">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${members.length}, minmax(140px,1fr))` }}>
          {members.map(m=> (
            <div key={m.id} className="p-2">
              <div className="font-medium mb-2">{m.name}</div>
              <div className="space-y-2">
                {skills.map(s=>{
                  const v = m.skills[s] || 0
                  return (
                    <motion.div key={s} onMouseEnter={()=>setHover({m:m.id,s})} onMouseLeave={()=>setHover({})} whileHover={{ scale: 1.03 }} className="glass rounded p-2 flex items-center justify-between">
                      <div className="text-sm">{s}</div>
                      <div className="text-sm font-semibold">{v}</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {hover.m && hover.s && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.18 }} className="absolute right-6 top-6 glass rounded p-3 w-64">
          <div className="font-semibold">{members.find(x=>x.id===hover.m)?.name} — {hover.s}</div>
          <div className="text-sm text-gray-300 mt-1">Proficiency: {members.find(x=>x.id===hover.m)?.skills[hover.s || '']}</div>
          <div className="text-xs text-gray-400 mt-2">Hover cells show quick context and suggested training.</div>
        </motion.div>
      )}
    </div>
  )
}
