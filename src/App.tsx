import React from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Candidate from './pages/Candidate'
import Employee from './pages/Employee'
import Manager from './pages/Manager'
import Executive from './pages/Executive'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Login from './pages/Login'
import { pageTransition } from './animations/motion'
import PageTransition from './components/PageTransition'
import LoadingOverlay from './components/LoadingOverlay'

export default function App() {
  const location = useLocation()
  const navType = useNavigationType()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=>{
    // show a brief loading overlay during navigation for smooth transitions
    setLoading(true)
    const t = setTimeout(()=> setLoading(false), 450)
    return ()=> clearTimeout(t)
  }, [location.pathname, navType])
  return (
    <MainLayout>
      <LoadingOverlay show={loading} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/candidate" element={<PageWrapper><Candidate /></PageWrapper>} />
          <Route path="/employee" element={<PageWrapper><Employee /></PageWrapper>} />
          <Route path="/manager" element={<PageWrapper><Manager /></PageWrapper>} />
          <Route path="/executive" element={<PageWrapper><Executive /></PageWrapper>} />
          <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition type="blur">
      <div className="w-full h-full">{children}</div>
    </PageTransition>
  )
}
