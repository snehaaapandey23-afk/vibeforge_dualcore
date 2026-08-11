import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

const roles = ['candidate', 'employee', 'manager', 'executive']

export default function Login() {
  const navigate = useNavigate()
  const { role, setRole } = useRole()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleContinue() {
    const routeMap: Record<string, string> = {
      candidate: '/candidate',
      employee: '/employee',
      manager: '/manager',
      executive: '/executive'
    }
    navigate(routeMap[role] || '/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-10"
      >
        <div className="text-sm uppercase tracking-[0.24em] text-sky-300 mb-4">Role-based access</div>
        <h1 className="text-4xl font-bold mb-4">Sign in to your role workspace</h1>
        <p className="text-gray-300 max-w-xl leading-7">
          Choose the role that matches your workflow and get a tailored dashboard for candidates,
          employees, managers and executives.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {roles.map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-2xl border px-4 py-3 text-left transition ${role === item ? 'border-sky-400 bg-white/5' : 'border-white/10 bg-white/5 hover:border-sky-300'}`}
              onClick={() => setRole(item as any)}
            >
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400">{item}</div>
              <div className="mt-2 text-lg font-semibold capitalize">{item} portal</div>
            </button>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="glass rounded-3xl p-10"
      >
        <div className="text-sm text-gray-300 mb-4">Login as</div>
        <div className="text-sm text-gray-300 mb-4">Current portal: <span className="font-semibold text-white capitalize">{role}</span></div>
        <form onSubmit={(e) => { e.preventDefault(); handleContinue() }} className="grid gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-sky-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-sky-300"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="cta-button cta-primary w-full py-3 mt-3">Continue as {role}</button>

          <div className="text-sm text-gray-400">
            Need a test account? Use any email and password to simulate the login flow.
          </div>

          <Link to="/dashboard" className="text-sm text-sky-300 hover:underline">
            Skip to demo dashboard
          </Link>
        </form>
      </motion.div>
    </div>
  )
}
