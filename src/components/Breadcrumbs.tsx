import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs(){
  const loc = useLocation()
  const parts = loc.pathname.split('/').filter(Boolean)
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-sm text-gray-300 mb-4">
      <nav className="flex items-center gap-2">
        <Link to="/" className="text-gray-400">Home</Link>
        {parts.map((p, i)=> (
          <span key={i} className="flex items-center gap-2"><span className="text-gray-500">/</span> <Link to={`/${parts.slice(0,i+1).join('/')}`} className="capitalize">{p}</Link></span>
        ))}
      </nav>
    </motion.div>
  )
}
