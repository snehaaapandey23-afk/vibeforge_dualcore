import React from 'react'
import { motion } from 'framer-motion'

export default function KPICard({ title, value, delta }: { title: string; value: string; delta?: number|string }){
  const positive = typeof delta === 'number' ? delta >= 0 : String(delta).startsWith('-') ? false : true
  return (
    <motion.div whileHover={{ y: -6 }} className="glass rounded-xlpanel p-4 flex flex-col">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {delta !== undefined && <div className={`text-sm mt-1 ${positive ? 'text-green-400' : 'text-rose-400'}`}>{positive?'+':''}{delta}</div>}
    </motion.div>
  )
}
