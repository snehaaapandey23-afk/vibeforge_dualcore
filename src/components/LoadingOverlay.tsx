import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingOverlay({ show }: { show: boolean }){
  return (
    <motion.div pointerEvents={show? 'auto':'none'} initial={{ opacity: 0 }} animate={{ opacity: show? 1: 0 }} transition={{ duration: 0.35 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,6,23,0.6)] backdrop-blur-sm">
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: show? 1:0.92, opacity: show? 1:0 }} transition={{ duration: 0.5 }} className="glass rounded-xlpanel p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center text-black font-bold">CW</div>
        <div>
          <div className="font-semibold">CoWorks</div>
          <div className="text-sm text-gray-300">Loading…</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
