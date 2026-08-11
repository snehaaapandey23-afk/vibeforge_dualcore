import React from 'react'
import { motion } from 'framer-motion'
import { Home, Users, Clipboard, Settings, Briefcase, BarChart2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

const baseNav = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={16} />, to: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} />, to: '/settings' }
]

const roleNav: Record<string, Array<{ id: string; label: string; icon: React.ReactNode; to: string }>> = {
  candidate: [
    { id: 'candidate', label: 'Candidate', icon: <Users size={16} />, to: '/candidate' }
  ],
  employee: [
    { id: 'employee', label: 'Employee', icon: <Briefcase size={16} />, to: '/employee' }
  ],
  manager: [
    { id: 'manager', label: 'Manager', icon: <Clipboard size={16} />, to: '/manager' }
  ],
  executive: [
    { id: 'executive', label: 'Executive', icon: <BarChart2 size={16} />, to: '/executive' }
  ]
}

export default function Sidebar({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: ()=>void }){
  const loc = useLocation()
  const { role } = useRole()
  const items = [...baseNav, ...(roleNav[role] || [])]

  return (
    <motion.aside initial={false} animate={{ width: collapsed ? 72 : 260 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }} className="h-screen glass py-6 px-3">
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="text-sm text-gray-300">Navigation</div>
        <button onClick={onCollapse} className="p-1 rounded glass">{collapsed ? '→' : '←'}</button>
      </div>
      <nav className="space-y-2">
        {items.map(it=>{
          const active = loc.pathname.startsWith(it.to)
          return (
            <Link key={it.id} to={it.to} className="block">
              <motion.div whileHover={{ scale: 1.02 }} className={`flex items-center gap-3 p-3 rounded-lg ${active ? 'bg-gradient-to-r from-accent1/10 to-accent2/6' : 'glass'}`}>
                <div className={`p-2 rounded-md ${active ? 'bg-accent1/20' : ''}`}>{it.icon}</div>
                {!collapsed && <div className="text-sm font-medium">{it.label}</div>}
                {active && !collapsed && <motion.div layoutId="active-indicator" className="ml-auto h-2 w-2 rounded-full bg-accent3" />}
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </motion.aside>
  )
}
