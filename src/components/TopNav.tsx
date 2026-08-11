import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, User, Menu, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useRole, Role } from '../context/RoleContext'

const roleRoutes: Record<Role, string> = {
  candidate: '/candidate',
  employee: '/employee',
  manager: '/manager',
  executive: '/executive'
}
const availableRoles: Role[] = ['candidate', 'employee', 'manager', 'executive']

export default function TopNav({ onToggleSidebar }: { onToggleSidebar: ()=>void }){
  const navigate = useNavigate()
  const { role, setRole } = useRole()
  const [open, setOpen] = useState(false)

  function switchRole(next: Role) {
    setRole(next)
    setOpen(false)
    navigate(roleRoutes[next])
  }

  return (
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: 0.45 }} className="w-full py-4 px-6 md:px-8 lg:px-12 flex items-center justify-between glass rounded-xlpanel shadow-soft">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-md glass">
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center text-black font-bold">CW</div>
          <div className="hidden sm:block">
            <div className="text-sm text-gray-300">CoWorks</div>
            <div className="text-xs text-gray-400">AI Workforce OS</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <input aria-label="global-search" placeholder="Search…" className="glass rounded-full px-4 py-2 w-64 md:w-96 text-sm outline-none placeholder-gray-400" />
          <Search className="absolute right-3 top-2.5 text-gray-300" />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/notifications')} className="p-2 rounded-md glass"><Bell size={18} /></motion.button>
        <div className="relative">
          <button onClick={()=> setOpen(o=>!o)} className="flex items-center gap-2 px-3 py-1 rounded-lg glass text-sm text-sky-200 hover:text-white">
            <span className="capitalize">{role}</span>
            <ChevronDown size={14} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-2xl glass border border-white/10 shadow-soft z-20">
              {availableRoles.map((nextRole) => (
                <button key={nextRole} type="button" onClick={() => switchRole(nextRole)} className="w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/10 capitalize">
                  {nextRole}
                </button>
              ))}
            </div>
          )}
        </div>
        <motion.div whileHover={{ scale: 1.03 }} className="p-1 rounded-full glass"><User size={18} /></motion.div>
        <Link to="/login" className="px-3 py-1 rounded-lg glass text-sm text-sky-200 hover:text-white">Login</Link>
      </div>
    </motion.div>
  )
}
