import React from 'react'
import { motion } from 'framer-motion'
import type { TeamMember } from '../../utils/fakeManagerData'

export default function TeamHeatmap({ members, skills }: { members: TeamMember[]; skills: string[] }){
  return (
    <div className="overflow-auto">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-left py-2">Member</th>
            {skills.map(s=> <th key={s} className="text-left py-2 text-sm text-gray-400">{s}</th>)}
          </tr>
        </thead>
        <tbody>
          {members.map(m=> (
            <motion.tr key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 }} className="align-top">
              <td className="py-3 font-medium">{m.name}</td>
              {skills.map(s=>{
                const v = m.skills[s] || 0
                const intensity = Math.min(1, v/100)
                const bg = `linear-gradient(90deg, rgba(79,140,255,${0.14*intensity}), rgba(168,85,247,${0.06*intensity}))`
                return (
                  <td key={s} className="py-2">
                    <motion.div whileHover={{ scale: 1.04 }} className="rounded-md p-2" style={{ background: bg }}>
                      <div className="text-sm">{v}</div>
                    </motion.div>
                  </td>
                )
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
