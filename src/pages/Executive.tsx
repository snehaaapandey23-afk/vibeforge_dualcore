import React from 'react'
import Filters from '../components/executive/Filters'
import KPICard from '../components/executive/KPICard'
import OrgHealth from '../components/executive/OrgHealth'
import RetentionRisk from '../components/executive/RetentionRisk'
import SkillReadiness from '../components/executive/SkillReadiness'
import LeadershipPipeline from '../components/executive/LeadershipPipeline'
import WhatIfSimulator from '../components/executive/WhatIfSimulator'
import { generateExecutiveData } from '../utils/fakeExecutiveData'
import { motion } from 'framer-motion'

const data = generateExecutiveData()

export default function Executive(){
  return (
    <div className="space-y-6">
      <motion.header initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} transition={{duration:0.45}}>
        <h2 className="text-2xl font-semibold">Executive Analytics</h2>
        <p className="text-sm text-gray-300">Strategic view — health, retention, skills, and leadership pipeline.</p>
      </motion.header>

      <Filters departments={data.departments} />

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <KPICard title="Org Health" value={`${data.orgHealth.score}%`} delta={data.orgHealth.delta} />
        <KPICard title="Retention Risk" value={`${data.retention.overall}%`} delta={data.retention.delta} />
        <KPICard title="Skill Readiness" value={`${data.skillReadiness.avg}%`} delta={data.skillReadiness.delta} />
        <KPICard title="Leadership Pipeline" value={`${data.leadership.pipelineScore}%`} delta={data.leadership.delta} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xlpanel p-4">
          <OrgHealth series={data.orgHealth.history} score={data.orgHealth.score} />
        </div>
        <div className="glass rounded-xlpanel p-4">
          <RetentionRisk departments={data.departments} retention={data.retention.byDept} />
        </div>
        <div className="glass rounded-xlpanel p-4">
          <SkillReadiness skills={data.skillReadiness.bySkill} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xlpanel p-4">
          <LeadershipPipeline levels={data.leadership.levels} />
        </div>
        <div className="glass rounded-xlpanel p-4">
          <WhatIfSimulator base={data} />
        </div>
      </section>
    </div>
  )
}
