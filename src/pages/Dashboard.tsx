import React from 'react'
import FloatingPanel from '../components/FloatingPanel'

const initialMetrics = [
  { label: 'Active Teams', value: '18', detail: '7 new this week' },
  { label: 'Verified Skills', value: '1,240', detail: '12% growth' },
  { label: 'Open Roles', value: '46', detail: '4 high-priority' },
  { label: 'Retention Rate', value: '91%', detail: 'Stable across squads' }
]

function buildMetric(label: string) {
  switch (label) {
    case 'Active Teams':
      return { value: `${16 + Math.round(Math.random() * 6)}`, detail: `${3 + Math.round(Math.random() * 5)} new this week` }
    case 'Verified Skills':
      return { value: `${1080 + Math.round(Math.random() * 260)}`, detail: `${8 + Math.round(Math.random() * 8)}% growth` }
    case 'Open Roles':
      return { value: `${40 + Math.round(Math.random() * 10)}`, detail: `${2 + Math.round(Math.random() * 6)} high-priority` }
    case 'Retention Rate':
      return { value: `${88 + Math.round(Math.random() * 8)}%`, detail: 'Stable across squads' }
    default:
      return { value: '—', detail: 'Updated' }
  }
}

export default function Dashboard(){
  const [metrics, setMetrics] = React.useState(initialMetrics)
  const [lastUpdated, setLastUpdated] = React.useState('Just now')

  function refreshMetrics() {
    setMetrics(metrics.map((metric) => ({
      ...metric,
      ...buildMetric(metric.label)
    })))
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Workforce Overview</h2>
          <p className="text-gray-300 mt-2 max-w-2xl">
            See verified skills, team health, and role readiness at a glance. This dashboard helps you measure workforce confidence and reduce staffing risk.
          </p>
        </div>
        <button onClick={refreshMetrics} className="cta-button cta-primary">Refresh Metrics</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <FloatingPanel key={metric.label} className="p-6">
            <div className="text-sm uppercase tracking-[0.16em] text-gray-400">{metric.label}</div>
            <div className="text-4xl font-semibold mt-4">{metric.value}</div>
            <div className="text-sm text-gray-300 mt-2">{metric.detail}</div>
          </FloatingPanel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <FloatingPanel className="min-h-[380px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300">Skill health</div>
              <div className="text-xl font-semibold mt-2">Team skill readiness</div>
            </div>
            <div className="text-sm text-gray-300">Updated {lastUpdated}</div>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="glass rounded-3xl p-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Data Science</span>
                <span>87%</span>
              </div>
              <div className="h-2 mt-3 rounded-full bg-white/10"><div className="h-full rounded-full bg-sky-400" style={{ width: '87%' }} /></div>
            </div>
            <div className="glass rounded-3xl p-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>ML Ops</span>
                <span>78%</span>
              </div>
              <div className="h-2 mt-3 rounded-full bg-white/10"><div className="h-full rounded-full bg-fuchsia-400" style={{ width: '78%' }} /></div>
            </div>
            <div className="glass rounded-3xl p-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>NLP</span>
                <span>94%</span>
              </div>
              <div className="h-2 mt-3 rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: '94%' }} /></div>
            </div>
          </div>
        </FloatingPanel>

        <FloatingPanel className="min-h-[380px]">
          <div className="text-sm uppercase tracking-[0.24em] text-sky-300 mb-4">Risk signals</div>
          <div className="space-y-4 text-gray-300">
            <div className="glass rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <span>SkillFishing alerts</span>
                <span className="text-sm text-amber-300">Medium</span>
              </div>
              <p className="mt-3 text-sm text-gray-300">4 profiles flagged for inconsistent experience claims.</p>
            </div>
            <div className="glass rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <span>Turnover risk</span>
                <span className="text-sm text-emerald-300">Low</span>
              </div>
              <p className="mt-3 text-sm text-gray-300">Core teams are stable, with <strong>3%</strong> attrition risk.</p>
            </div>
            <div className="glass rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <span>Candidate load</span>
                <span className="text-sm text-sky-300">High</span>
              </div>
              <p className="mt-3 text-sm text-gray-300">42 active candidates are in verification workflows.</p>
            </div>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}
