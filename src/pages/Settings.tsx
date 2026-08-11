import React from 'react'
import FloatingPanel from '../components/FloatingPanel'

export default function Settings(){
  const [name, setName] = React.useState('Ayesha Patel')
  const [email, setEmail] = React.useState('ayesha@workforce.ai')
  const [role, setRole] = React.useState('manager')
  const [notifications, setNotifications] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(true)
  const [autoSync, setAutoSync] = React.useState(true)
  const [savedMessage, setSavedMessage] = React.useState('')

  function handleSave() {
    setSavedMessage('Settings saved successfully')
    window.setTimeout(() => setSavedMessage(''), 2200)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Settings</h2>
          <p className="text-gray-300 mt-2 max-w-2xl">
            Customize your CoWorks experience, manage notifications, and configure security preferences.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {savedMessage && <div className="text-sm text-emerald-300">{savedMessage}</div>}
          <button onClick={handleSave} className="cta-button cta-primary">Save changes</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <FloatingPanel className="p-8">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-300 mb-4">Account</div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none">
                <option value="manager">Manager</option>
                <option value="executive">Executive</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </FloatingPanel>

        <FloatingPanel className="p-8">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-300 mb-4">Preferences</div>
          <div className="space-y-5">
            <div className="glass rounded-3xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold">Enable notifications</div>
                <div className="text-sm text-gray-400">Receive alerts for candidate screening and team updates.</div>
              </div>
              <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5 accent-sky-400" />
            </div>
            <div className="glass rounded-3xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold">Dark mode</div>
                <div className="text-sm text-gray-400">Keep the dashboard in the current immersive theme.</div>
              </div>
              <input type="checkbox" checked={darkMode} onChange={(e)=>setDarkMode(e.target.checked)} className="h-5 w-5 accent-sky-400" />
            </div>
            <div className="glass rounded-3xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold">Auto-sync HR systems</div>
                <div className="text-sm text-gray-400">Pull updates from connected tools every hour.</div>
              </div>
              <input type="checkbox" checked={autoSync} onChange={(e)=>setAutoSync(e.target.checked)} className="h-5 w-5 accent-sky-400" />
            </div>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}
