import React from 'react'
import { Home, Users, Briefcase, BarChart2, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function MobileBottomNav(){
  const loc = useLocation()
  const items = [
    { to: '/', icon: <Home size={18} />, label: 'Home' },
    { to: '/candidate', icon: <Users size={18} />, label: 'Candidates' },
    { to: '/employee', icon: <Briefcase size={18} />, label: 'Employee' },
    { to: '/manager', icon: <BarChart2 size={18} />, label: 'Manager' },
    { to: '/settings', icon: <Settings size={18} />, label: 'Settings' }
  ]
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] mobile:block tablet:hidden">
      <div className="glass rounded-2xl px-3 py-2 flex items-center justify-between">
        {items.map(it=> (
          <Link key={it.to} to={it.to} className={`flex-1 flex flex-col items-center text-xs py-1 ${loc.pathname===it.to? 'text-white':'text-gray-300'}`}>
            {it.icon}
            <span className="mt-1">{it.label.split(' ')[0]}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
