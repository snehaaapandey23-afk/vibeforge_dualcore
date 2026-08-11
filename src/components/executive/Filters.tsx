import React from 'react'
import { motion } from 'framer-motion'

export default function Filters({ departments }: { departments: string[] }){
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex items-center gap-3">
      <select className="glass rounded px-3 py-2 text-sm">
        <option>All departments</option>
        {departments.map(d=> <option key={d}>{d}</option>)}
      </select>
      <select className="glass rounded px-3 py-2 text-sm">
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
      <div className="ml-auto text-sm text-gray-400">Updated just now</div>
    </motion.div>
  )
}
