import React from 'react'
import FloatingPanel from '../components/FloatingPanel'
import { CheckCircle2, ShieldCheck, ClipboardList } from 'lucide-react'
import { apiFetch } from '../utils/api'

const sampleTasks = [
  'Complete AI skills assessment',
  'Submit project portfolio summary',
  'Prepare a 10-minute case study presentation'
]

export default function Candidate(){
  const [isImporting, setIsImporting] = React.useState(false)
  const [resumeStatus, setResumeStatus] = React.useState('No resume uploaded yet')
  const [tasks, setTasks] = React.useState<string[]>([])
  const [skills, setSkills] = React.useState<{name:string;confidence:number}[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setIsImporting(true)
    setResumeStatus(`Uploading ${file.name}...`)
    setTasks([])
    try {
      const form = new FormData()
      form.append('resume', file)
      const candidate = await apiFetch('/candidates/upload', {
        method: 'POST',
        body: form
      })

      const parsed = await apiFetch('/ai/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: candidate.resumeText || `Candidate resume for ${file.name}` })
      })

      setSkills(parsed.skills || [])
      setTasks(sampleTasks)
      setResumeStatus('Resume uploaded and analyzed successfully')
    } catch (err) {
      setResumeStatus('Upload failed, please try again')
      console.error(err)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-8">
      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Candidate Intelligence</h2>
          <p className="text-gray-300 mt-2 max-w-2xl">
            Review verified candidate skills, assessment status, and compatibility with open roles in one place.
          </p>
        </div>
        <button onClick={handleImportClick} className="cta-button cta-primary">
          {isImporting ? 'Analyzing...' : 'Import Candidate'}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <FloatingPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={20} className="text-sky-300" />
            <div className="text-sm uppercase tracking-[0.22em] text-sky-300">Verified skills</div>
          </div>
          <div className="text-4xl font-semibold">76%</div>
          <div className="text-sm text-gray-300 mt-3">of incoming candidates passed AI skill assessment.</div>
        </FloatingPanel>
        <FloatingPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList size={20} className="text-emerald-300" />
            <div className="text-sm uppercase tracking-[0.22em] text-emerald-300">Match confidence</div>
          </div>
          <div className="text-4xl font-semibold">91%</div>
          <div className="text-sm text-gray-300 mt-3">Average fit score for priority positions.</div>
        </FloatingPanel>
        <FloatingPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={20} className="text-fuchsia-400" />
            <div className="text-sm uppercase tracking-[0.22em] text-fuchsia-400">Resume status</div>
          </div>
          <div className="text-2xl font-semibold">{resumeStatus}</div>
          {skills.length > 0 && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="font-semibold">Extracted skills</div>
              <div className="grid gap-2">
                {skills.map((skill) => (
                  <div key={skill.name} className="glass rounded-3xl p-3 border border-white/10 flex items-center justify-between">
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-300">{skill.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tasks.length > 0 && (
            <div className="mt-4 space-y-2 text-gray-300">
              <div className="font-semibold">Next tasks</div>
              <ul className="list-disc list-inside">
                {tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          )}
        </FloatingPanel>
        <FloatingPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={20} className="text-fuchsia-400" />
            <div className="text-sm uppercase tracking-[0.22em] text-fuchsia-400">Assessment speed</div>
          </div>
          <div className="text-4xl font-semibold">2.4s</div>
          <div className="text-sm text-gray-300 mt-3">Average time to verify candidate claims.</div>
        </FloatingPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <FloatingPanel className="min-h-[420px]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-sky-300">Top candidate</div>
              <div className="text-xl font-semibold mt-2">Ayesha Patel</div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Candidate verified</span>
          </div>
          <div className="grid gap-4">
            <div className="glass rounded-3xl p-5 border border-white/10">
              <div className="font-semibold">Profile summary</div>
              <p className="mt-3 text-gray-300">AI assessment confirms strong ML Ops, NLP, and systems reasoning. Candidate has cross-functional project experience and recent leadership training.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['ML Ops', 'NLP', 'Systems', 'Collaboration'].map((skill) => (
                <div key={skill} className="glass rounded-3xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400">{skill}</div>
                  <div className="text-2xl font-semibold mt-2">{Math.floor(80 + Math.random() * 15)}%</div>
                </div>
              ))}
            </div>
          </div>
        </FloatingPanel>

        <FloatingPanel className="min-h-[420px]">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-300 mb-5">Activity timeline</div>
          <div className="space-y-4">
            <div className="glass rounded-3xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Resume AI scan</span>
                <span>Completed</span>
              </div>
              <p className="mt-3 text-gray-300">Detected 98% skills matching job requirements and flagged two overclaims for review.</p>
            </div>
            <div className="glass rounded-3xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Interview readiness</span>
                <span>In progress</span>
              </div>
              <p className="mt-3 text-gray-300">Generated personalized question deck and competency score prediction.</p>
            </div>
            <div className="glass rounded-3xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Verification report</span>
                <span>Ready</span>
              </div>
              <p className="mt-3 text-gray-300">Download the candidate verification summary for hiring review.</p>
            </div>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}
