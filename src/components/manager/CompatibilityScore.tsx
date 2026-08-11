import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { TeamMember } from '../../utils/fakeManagerData'

function computeCompatibility(members: TeamMember[]){
  if (!members.length) return 0
  // simple metric: average pairwise skill variance inversed
  const skills = Object.keys(members[0].skills)
  let total = 0, pairs = 0
  for (let i=0;i<members.length;i++) for (let j=i+1;j<members.length;j++){
    pairs++
    let sum = 0
    skills.forEach(s => { sum += Math.abs(members[i].skills[s] - members[j].skills[s]) })
    total += sum / (skills.length * 100)
  }
  const avg = pairs ? total / pairs : 0
  return Math.round((1 - avg) * 100)
}

export default function CompatibilityScore({ members }: { members: TeamMember[] }){
  const score = useMemo(()=> computeCompatibility(members.slice(0,4)), [members])
  return (
    <div className="flex items-center gap-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="flex items-center justify-center w-28 h-28 rounded-full glass">
        <motion.div initial={{ rotate: -90 }} animate={{ rotate: (score/100) * 360 - 90 }} transition={{ duration: 1.2, ease: [0.2,0.8,0.2,1] }} style={{ width: '72px', height: '72px' }}>
          <svg viewBox="0 0 100 100" width="72" height="72">
            <defs>
              <linearGradient id="cgrad" x1="0" x2="1"><stop offset="0%" stopColor="#4F8CFF"/><stop offset="100%" stopColor="#A855F7"/></linearGradient>
            </defs>
            <circle cx="50" cy="50" r="34" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
            <motion.circle cx="50" cy="50" r="34" stroke="url(#cgrad)" strokeWidth="12" fill="none" strokeDasharray={214} strokeDashoffset={214 - (score/100)*214} strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
      <div>
        <div className="text-2xl font-bold">{score}<span className="text-sm text-gray-400">/100</span></div>
        <div className="text-sm text-gray-300">Compatibility score for proposed team</div>
      </div>
    </div>
  )
}
