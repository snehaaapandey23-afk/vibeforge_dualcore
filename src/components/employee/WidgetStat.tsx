import React from 'react'
import { motion } from 'framer-motion'

export default function WidgetStat({ title, value, subtitle }: { title: string; value: string; subtitle?: string }){
  return (
    <motion.div whileHover={{ y: -6 }} className="glass rounded-xlpanel p-4 flex flex-col">
      <div className="text-sm text-gray-300">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </motion.div>
  )
}
