import React from 'react'
import { motion } from 'framer-motion'

export default function HorizontalTimeline({ items = [] as {time:string;text:string}[] }:{ items?: {time:string;text:string}[] }){
  return (
    <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="overflow-x-auto">
      <div className="flex gap-4 items-center py-2">
        {items.map((it, idx)=> (
          <motion.div key={idx} whileHover={{ scale: 1.04 }} className="min-w-[220px] glass p-3 rounded-lg">
            <div className="text-xs text-gray-400">{it.time}</div>
            <div className="font-medium mt-1">{it.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
