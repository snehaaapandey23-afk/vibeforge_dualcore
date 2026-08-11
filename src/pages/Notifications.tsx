import React from 'react'
import FloatingPanel from '../components/FloatingPanel'

const notes = [
  { id: '1', title: 'Skill verification complete', detail: 'Ayesha Patel passed the NLP verification check.', type: 'skill' },
  { id: '2', title: 'Team risk flag', detail: 'Team Orion has an emerging workload imbalance.', type: 'risk' },
  { id: '3', title: 'Candidate matched', detail: 'New candidate ranked highly for the Data Science role.', type: 'candidate' }
]

export default function Notifications(){
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Notifications</h2>
        <p className="text-gray-300 mt-2 max-w-2xl">All alerts, updates, and action items across your selected roles.</p>
      </div>
      <div className="grid gap-4">
        {notes.map((note)=>(
          <FloatingPanel key={note.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-sky-300">{note.type}</div>
                <div className="mt-2 text-xl font-semibold">{note.title}</div>
                <div className="mt-3 text-gray-300">{note.detail}</div>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-[0.24em]">New</div>
            </div>
          </FloatingPanel>
        ))}
      </div>
    </div>
  )
}
