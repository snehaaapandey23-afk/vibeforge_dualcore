import React from 'react'
import { motion } from 'framer-motion'
import WidgetStat from '../components/employee/WidgetStat'
import LineChart from '../components/employee/LineChart'
import SkillGraph from '../components/employee/SkillGraph'
import HorizontalTimeline from '../components/employee/HorizontalTimeline'
import DashboardCard from '../components/employee/DashboardCard'

export default function Employee(){
  return (
    <div className="space-y-6">
      <motion.header initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.45}}>
        <h2 className="text-2xl font-semibold">Employee Hub</h2>
        <p className="text-sm text-gray-300">Personalized insights, skill graph, and activity timeline.</p>
      </motion.header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <WidgetStat title="Active Tasks" value="14" subtitle="Today" />
            <WidgetStat title="Focus Score" value="87%" subtitle="Last 24h" />
            <WidgetStat title="Utilization" value="72%" subtitle="This Week" />
          </div>

          <motion.div className="glass rounded-xlpanel p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Performance Trend</div>
              <div className="text-sm text-gray-400">Last 30 days</div>
            </div>
            <LineChart values={[10,12,9,14,18,16,20,24,22,26,28,30,27,32,34,33,36,38,40,42]} />
          </motion.div>

          <motion.div className="glass rounded-xlpanel p-4">
            <div className="mb-3 font-semibold">Skill Graph</div>
            <SkillGraph />
          </motion.div>
        </div>

        <div className="space-y-4">
          <DashboardCard title="Quick Actions" desc="Launch learning plans or schedule 1:1s." />
          <DashboardCard title="Recognition" desc="Recent kudos and peer praise." />
          <motion.div className="glass rounded-xlpanel p-4">
            <div className="font-semibold mb-3">Recent Activity</div>
            <HorizontalTimeline items={[{time:'09:12', text:'Completed assessment'},{time:'10:45', text:'Peer review'},{time:'14:02', text:'Deployed model'}]} />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
