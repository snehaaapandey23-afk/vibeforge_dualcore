import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function WhySuggestion(){
  const [open, setOpen] = useState(false)
  return (
    <motion.div layout className="glass rounded-xlpanel p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">Why AI suggested this team</div>
          <div className="text-sm text-gray-300 mt-1">Summary of signals and heuristics.</div>
        </div>
        <button onClick={()=>setOpen(o=>!o)} className="glass p-2 rounded">{open? 'Hide':'Why'}</button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration:0.4 }} className="mt-4 text-sm text-gray-300">
          <ul className="list-disc ml-5 space-y-2">
            <li>Complementary skills across planning and RL to reduce failure modes.</li>
            <li>High availability overlap for synchronous tasks.</li>
            <li>Past performance signals indicate strong collaboration history.</li>
            <li>Risk posture aligned with policy constraints.</li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}
