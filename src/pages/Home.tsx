import React from 'react'
import { useNavigate } from 'react-router-dom'
import NeuralNetwork from '../components/NeuralNetwork'
import HeroCTAs from '../components/HeroCTAs'
import FeatureCard from '../components/FeatureCard'
import { motion } from 'framer-motion'
import FloatingPanel from '../components/FloatingPanel'

const words = ['Workforce Intelligence.', 'Powered by AI.']

export default function Home(){
  const navigate = useNavigate()
  return (
    <>
      <section className="hero">
        <NeuralNetwork />
        <div className="hero-inner">
          <motion.h1 className="hero-title" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
            {words.map((w, i)=> (
              <motion.span key={w} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay: 0.15 + i * 0.14}} style={{display:'block'}}>{w}</motion.span>
            ))}
          </motion.h1>
          <motion.p className="hero-sub" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
            One AI platform for Candidates, Employees, Managers, HR Leaders, Executives.
          </motion.p>

          <HeroCTAs />

          <div className="scroll-indicator">
            <div className="bar glass"><div className="dot animate-pulse" /></div>
          </div>
        </div>
      </section>

      <section className="features px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="AI Team Formation" desc="Assemble agent teams aligned to outcomes." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="2" fill="#4F8CFF"/><rect x="6" y="12" width="12" height="6" rx="2" fill="#6C63FF"/></svg>} />
          <FeatureCard title="Skill Intelligence" desc="Surface capabilities across your fleet." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round"/></svg>} />
          <FeatureCard title="Career Growth" desc="Personalized growth paths for contributors." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16" stroke="#A855F7" strokeWidth="2" strokeLinecap="round"/></svg>} />
          <FeatureCard title="Hiring Verification" desc="Trustworthy verification for external agents." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12h16" stroke="#4F8CFF" strokeWidth="2" strokeLinecap="round"/></svg>} />
          <FeatureCard title="Leadership Analytics" desc="Actionable insights for strategic decisions." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="16" r="2" fill="#6C63FF"/><circle cx="16" cy="12" r="2" fill="#00E5FF"/></svg>} />
        </div>
      </section>

      <section className="skill-verifier-section px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="section-label">Workforce Intelligence</div>
            <h2 className="section-heading">AI-powered verification and workforce planning for every role.</h2>
            <p className="section-copy">
              CoWorks verifies skill claims, personalizes career development, helps managers form high-performing teams,
              and gives executives predictive analytics — all from one unified intelligence layer.
            </p>
            <ul className="verifier-list">
              <li>Verifies candidate skills through AI-powered assessments, reducing hiring mismatches.</li>
              <li>Creates personalized career roadmaps and learning recommendations for employees.</li>
              <li>Helps managers build high-performing teams using AI-driven team formation, workload analysis, and collaboration insights.</li>
              <li>Provides HR and executives with predictive workforce analytics, skill readiness, attrition risk, and succession planning.</li>
              <li>Connects existing HR systems into one unified intelligence layer, eliminating fragmented decision making.</li>
            </ul>
            <div className="cta-row verifier-cta-row">
              <button onClick={()=>navigate('/login')} className="cta-button cta-primary">Launch Intelligence</button>
              <button onClick={()=>navigate('/dashboard')} className="cta-button cta-ghost">See Case Study</button>
            </div>
          </div>

          <div className="glass verifier-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-sky-300">Unified HR intelligence</div>
                <div className="text-3xl font-semibold mt-3">Trusted by modern workforce teams</div>
              </div>
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100">Live</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-3xl p-4 border border-white/10">
                <div className="text-sm text-gray-300">Candidate mismatch reduction</div>
                <div className="text-xl font-semibold mt-2">82%</div>
              </div>
              <div className="glass rounded-3xl p-4 border border-white/10">
                <div className="text-sm text-gray-300">Career plan activation</div>
                <div className="text-xl font-semibold mt-2">94%</div>
              </div>
            </div>
            <div className="meter mt-8">
              <div className="meter-track">
                <div className="meter-fill" style={{ width: '89%' }} />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Connected HR systems</span>
                <span>Higher workforce confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stakeholders px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="section-label">Stakeholder problems solved</div>
          <h2 className="section-heading">Drive results for every workforce leader.</h2>
          <div className="grid gap-6 mt-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">HR</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Resume screening</li>
                <li>Skill verification</li>
                <li>Interview scheduling</li>
                <li>Onboarding</li>
                <li>Compliance</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">Hiring Manager</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Candidate comparison</li>
                <li>Project staffing</li>
                <li>Team fit insights</li>
                <li>Interview support</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">Team Lead</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Workload balancing</li>
                <li>Collaboration insights</li>
                <li>Skill discovery</li>
                <li>Mentoring</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">Employee</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Career planning</li>
                <li>Learning paths</li>
                <li>Internal mobility</li>
                <li>Performance feedback</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">CHRO</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Workforce planning</li>
                <li>Diversity</li>
                <li>Retention</li>
                <li>Succession planning</li>
                <li>Hiring analytics</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="font-semibold text-lg">CEO</div>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li>Organization health</li>
                <li>Productivity trends</li>
                <li>Hiring ROI</li>
                <li>Future workforce forecasting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-12">
        <FloatingPanel>
          <div className="text-gray-300">Explore the OS — demo coming soon.</div>
        </FloatingPanel>
      </section>
    </>
  )
}
