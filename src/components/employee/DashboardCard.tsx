import React from 'react'
import { motion } from 'framer-motion'

export default function DashboardCard({ title, desc }: { title: string; desc?: string }){
  return (
    <motion.div whileHover={{ rotateX: 3, rotateY: -6, y: -6 }} className="glass rounded-xlpanel p-4">
      <div className="font-semibold">{title}</div>
      {desc && <div className="text-sm text-gray-300 mt-2">{desc}</div>}
      <div className="mt-3">
        <button className="py-2 px-3 rounded-lg cta-primary">Action</button>
      </div>
    </motion.div>
  )
}
