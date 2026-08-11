import React, { useState } from 'react'
import AnimatedCursor from '../components/AnimatedCursor'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import Breadcrumbs from '../components/Breadcrumbs'
import FloatingNotifications from '../components/FloatingNotifications'
import MobileBottomNav from '../components/MobileBottomNav'
import { motion } from 'framer-motion'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="min-h-screen w-full overflow-visible text-white bg-gradient-to-b from-bg1 via-bg2 to-bg3 flex">
      <AnimatedCursor />
      <Sidebar collapsed={collapsed} onCollapse={()=>setCollapsed(c=>!c)} />
      <div className="flex-1 flex flex-col">
        <div className="px-6 md:px-8 lg:px-12 py-4">
          <TopNav onToggleSidebar={()=>setCollapsed(c=>!c)} />
        </div>

        <main className="p-6 md:p-8 lg:p-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="max-w-7xl mx-auto">
            <Breadcrumbs />
            <div className="glass rounded-xlpanel p-6">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
      <FloatingNotifications />
      <MobileBottomNav />
      <div className="mobile-bottom-spacer tablet:hidden" />
    </div>
  )
}
