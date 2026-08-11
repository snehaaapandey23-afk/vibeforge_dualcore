import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type Node = { id: string; x: number; y: number; r: number; label: string }

export default function SkillGraph(){
  const ref = useRef<HTMLCanvasElement | null>(null)
  const nodesRef = useRef<Node[]>([])

  useEffect(()=>{
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = canvas.clientWidth * devicePixelRatio
    let h = canvas.height = canvas.clientHeight * devicePixelRatio
    const nodes: Node[] = []
    const labels = ['NLP','Vision','Prompting','RL','Planning','Safety','Search','Agents']
    for (let i=0;i<labels.length;i++){
      nodes.push({ id: String(i), x: Math.random()*w, y: Math.random()*h, r: 10 + Math.random()*12, label: labels[i] })
    }
    nodesRef.current = nodes

    let raf = 0
    const mouse = { x: w/2, y: h/2 }

    function onMove(e: MouseEvent){
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * devicePixelRatio
      mouse.y = (e.clientY - rect.top) * devicePixelRatio
    }
    window.addEventListener('mousemove', onMove)

    function step(){
      raf = requestAnimationFrame(step)
      ctx.clearRect(0,0,w,h)
      // simple repulsion & attraction to mouse
      for (let a=0;a<nodes.length;a++){
        const na = nodes[a]
        let vx = 0, vy = 0
        for (let b=0;b<nodes.length;b++) if (a!==b){
          const nb = nodes[b]
          const dx = na.x - nb.x, dy = na.y - nb.y
          const d = Math.max(4, Math.hypot(dx,dy))
          const force = 30 / (d*d)
          vx += (dx/d) * force
          vy += (dy/d) * force
        }
        // attraction to center
        vx += (w/2 - na.x) * 0.0008
        vy += (h/2 - na.y) * 0.0008
        // mouse repulse
        const dxm = na.x - mouse.x, dym = na.y - mouse.y
        const dm = Math.hypot(dxm,dym)
        if (dm < 120*devicePixelRatio) {
          vx += (dxm/dm) * (120*devicePixelRatio - dm) * 0.02
          vy += (dym/dm) * (120*devicePixelRatio - dm) * 0.02
        }
        na.x += vx
        na.y += vy
      }

      // draw links
      ctx.lineWidth = 1.2
      ctx.strokeStyle = 'rgba(79,140,255,0.12)'
      ctx.beginPath()
      for (let i=0;i<nodes.length;i++){
        for (let j=i+1;j<nodes.length;j++){
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x-b.x, a.y-b.y)
          if (d < 240*devicePixelRatio){
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          }
        }
      }
      ctx.stroke()

      // draw nodes
      for (const n of nodes){
        ctx.beginPath()
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r*3)
        grad.addColorStop(0, 'rgba(79,140,255,0.95)')
        grad.addColorStop(1, 'rgba(79,140,255,0.06)')
        ctx.fillStyle = grad
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2)
        ctx.fill()
        // label
        ctx.fillStyle = 'rgba(230,238,248,0.9)'
        ctx.font = `${12*devicePixelRatio}px Inter, system-ui, -apple-system` 
        ctx.fillText(n.label, n.x + n.r + 6, n.y + 4)
      }
    }
    step()

    return ()=>{
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div style={{ height: 300 }} className="relative">
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block', borderRadius: 12 }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute left-4 top-4 text-xs text-gray-300 glass rounded px-3 py-1">Interactive skill graph — hover to explore</motion.div>
    </div>
  )
}
