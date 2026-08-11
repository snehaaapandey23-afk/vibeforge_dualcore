import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { TeamMember } from '../../utils/fakeManagerData'

export default function TeamBuilder({ pool, skills }: { pool: TeamMember[]; skills: string[] }){
  const [team, setTeam] = useState<TeamMember[]>([])
  const [available, setAvailable] = useState<TeamMember[]>(pool)

  function onDragStart(e: React.DragEvent, id: string){ e.dataTransfer.setData('text/plain', id) }
  function onDropToTeam(e: React.DragEvent){ e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); const member = available.find(m=>m.id===id); if (member){ setTeam(t=>[...t, member]); setAvailable(a=>a.filter(x=>x.id!==id)) } }
  function onDropToPool(e: React.DragEvent){ e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); const member = team.find(m=>m.id===id); if (member){ setAvailable(a=>[...a, member]); setTeam(t=>t.filter(x=>x.id!==id)) } }

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="min-h-[120px] glass rounded p-3" onDragOver={(e)=>e.preventDefault()} onDrop={onDropToTeam}>
        <div className="text-sm text-gray-300 mb-2">Team Slots (drop agents here)</div>
        <div className="flex gap-2 flex-wrap">
          {team.length? team.map(m=> (
            <motion.div key={m.id} drag dragConstraints={{ top:0, left:0, right:0, bottom:0 }} whileDrag={{ scale:1.05 }} className="p-2 glass rounded">{m.name}</motion.div>
          )) : <div className="text-sm text-gray-500">No members assigned</div>}
        </div>
      </div>

      <div className="glass rounded p-3" onDragOver={(e)=>e.preventDefault()} onDrop={onDropToPool}>
        <div className="text-sm text-gray-300 mb-2">Agent Pool</div>
        <div className="flex gap-2 flex-wrap">
          {available.map(m=> (
            <div key={m.id} draggable onDragStart={(e)=>onDragStart(e,m.id)} className="p-2 glass rounded cursor-grab">{m.name} <div className="text-xs text-gray-400">{m.role}</div></div>
          ))}
        </div>
      </div>
    </div>
  )
}
