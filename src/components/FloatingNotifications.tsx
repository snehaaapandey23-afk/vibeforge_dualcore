import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Note = { id: string; title: string; body?: string }

export default function FloatingNotifications(){
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(()=>{
    // demo notification
    const id = String(Date.now())
    const n: Note = { id, title: 'Welcome to CoWorks', body: 'Your AI workforce is live.' }
    setNotes([n])
    const t = setTimeout(()=> setNotes([]), 6000)
    return ()=> clearTimeout(t)
  }, [])

  function remove(id: string){ setNotes(s=>s.filter(n=>n.id!==id)) }

  return (
    <div className="fixed right-6 top-6 z-50">
      <AnimatePresence>
        {notes.map(n=> (
          <motion.div key={n.id} initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }} transition={{ type: 'spring' }} className="glass p-4 rounded-xl mb-3 w-80">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{n.title}</div>
                {n.body && <div className="text-sm text-gray-300 mt-1">{n.body}</div>}
              </div>
              <button onClick={()=>remove(n.id)} className="text-sm text-gray-400">Dismiss</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
