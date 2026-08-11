import React from 'react'
import { motion } from 'framer-motion'
import { generateManagerData, TeamMember } from '../utils/fakeManagerData'
import TeamHeatmap from '../components/manager/TeamHeatmap'
import SkillMatrix from '../components/manager/SkillMatrix'
import CompatibilityScore from '../components/manager/CompatibilityScore'
import TeamBuilder from '../components/manager/TeamBuilder'
import WhySuggestion from '../components/manager/WhySuggestion'
import { apiFetch } from '../utils/api'

const data = generateManagerData()

export default function Manager(){
  const [compatibility, setCompatibility] = React.useState<number | null>(null)
  const [breakdown, setBreakdown] = React.useState<{ memberId: string | number; fit: number }[]>([])
  const [suggested, setSuggested] = React.useState<TeamMember[]>([])
  const [isSuggesting, setIsSuggesting] = React.useState(false)

  async function suggestTeam() {
    setIsSuggesting(true)
    try {
      const res = await apiFetch('/ai/team-compat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: data.members.map((member) => ({ id: member.id, skills: Object.entries(member.skills).map(([name, level]) => ({ name, level })) })) })
      })
      setCompatibility(res.score)
      setBreakdown(res.breakdown || [])
      const sorted = (res.breakdown || []).slice().sort((a:any,b:any)=>b.fit-a.fit)
      setSuggested(sorted.slice(0, 4).map((item:any) => data.members.find((member) => member.id === item.memberId) || data.members[Number(item.memberId)]).filter(Boolean) as TeamMember[])
    } catch (err) {
      console.error(err)
    } finally {
      setIsSuggesting(false)
    }
  }

  return (
    <div className="space-y-6 employee-hub">
      <motion.header initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.45}}>
        <h2 className="text-2xl font-semibold">Manager Console — AI Team Ops</h2>
        <p className="text-sm text-gray-300">Visualize team strengths, form AI teams, and explore compatibility.</p>
      </motion.header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div className="glass rounded-xlpanel p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Team Heatmap</div>
              <div className="text-sm text-gray-400">Realtime skills intensity</div>
            </div>
            <TeamHeatmap members={data.members} skills={data.skills} />
          </motion.div>

          <motion.div className="glass rounded-xlpanel p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Interactive Skill Matrix</div>
              <div className="text-sm text-gray-400">Hover cells for details</div>
            </div>
            <SkillMatrix members={data.members} skills={data.skills} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div className="glass rounded-xlpanel p-4">
            <div className="font-semibold mb-3">Team Compatibility</div>
            <CompatibilityScore members={data.members} />
          </motion.div>

          <motion.div className="glass rounded-xlpanel p-4">
            <div className="font-semibold mb-3">AI Team Formation</div>
            <TeamBuilder pool={data.members} skills={data.skills} />
          </motion.div>
        </div>
      </section>

      <section>
        <WhySuggestion />
      </section>
    </div>
  )
}
