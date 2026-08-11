import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { ReturnType } from '../..'

export default function WhatIfSimulator({ base }: { base: any }){
  const [change, setChange] = useState(0)
  const projected = Math.max(20, Math.min(100, base.orgHealth.score + change))
  return (
    <div>
      <div className="font-semibold mb-3">What-if Simulator</div>
      <div className="text-sm text-gray-300 mb-3">Adjust hiring/learning investment to see projected Org Health.</div>
      <div className="space-y-3">
        <div>
          <input type="range" min={-15} max={25} value={change} onChange={(e)=>setChange(Number(e.target.value))} className="w-full" />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="glass rounded p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-300">Projected Org Health</div>
              <div className="text-2xl font-bold">{projected}%</div>
            </div>
            <div className="text-sm text-gray-400">Delta: {change>=0?'+':''}{change}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
