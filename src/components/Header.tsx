import React from 'react'
import { Link } from 'react-router-dom'
import { GitBranch, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header(){
  return (
    <header className="w-full py-6 px-6 md:px-12 lg:px-20 flex items-center justify-between glass floating rounded-xlpanel shadow-soft">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center text-black font-bold">CW</div>
        <div>
          <div className="text-sm text-gray-300">CoWorks</div>
          <div className="text-xs text-gray-400">AI Workforce Intelligence</div>
        </div>
      </div>
      <nav className="flex items-center gap-4">
        <Link to="/" className="text-sm text-gray-200 hover:text-white">Home</Link>
        <Link to="/dashboard" className="text-sm text-gray-200 hover:text-white">Dashboard</Link>
        <motion.div whileHover={{ scale: 1.05 }} className="p-2 rounded-lg glass">
          <Settings size={18} />
        </motion.div>
      </nav>
    </header>
  )
}
