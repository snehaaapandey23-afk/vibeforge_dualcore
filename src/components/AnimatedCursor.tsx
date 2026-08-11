import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function AnimatedCursor(){
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    // create container
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '0'
    container.style.top = '0'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'
    container.className = 'coworks-cursor'
    document.body.appendChild(container)
    containerRef.current = container

    // hide default
    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    // elements
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    container.appendChild(glow)
    container.appendChild(ring)
    container.appendChild(dot)

    // spotlight overlay for cards
    const spotlight = document.createElement('div')
    spotlight.className = 'cursor-spotlight'
    spotlight.style.pointerEvents = 'none'
    document.body.appendChild(spotlight)

    // state
    let x = window.innerWidth/2, y = window.innerHeight/2
    let lastX = x, lastY = y
    let vx = 0, vy = 0
    let isHoverButton = false
    let isHoverCard = false
    let isHoverText = false
    let targetOffsetX = 0, targetOffsetY = 0

    function onMove(e: MouseEvent){
      const mx = e.clientX
      const my = e.clientY
      // magnetic to buttons
      const btn = (e.target as Element).closest('button, .cta-button') as HTMLElement | null
      if (btn) {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width/2
        const cy = rect.top + rect.height/2
        // offset towards center
        targetOffsetX = (cx - mx) * 0.18
        targetOffsetY = (cy - my) * 0.12
        isHoverButton = true
      } else {
        targetOffsetX = 0
        targetOffsetY = 0
        isHoverButton = false
      }

      // card hover
      const card = (e.target as Element).closest('.feature-card')
      isHoverCard = !!card

      // text/link hover
      const text = (e.target as Element).closest('a, .underline')
      isHoverText = !!text

      x = mx + targetOffsetX
      y = my + targetOffsetY

      // move spotlight
      if (spotlight) {
        spotlight.style.left = `${e.clientX}px`
        spotlight.style.top = `${e.clientY}px`
        spotlight.style.display = isHoverCard ? 'block' : 'none'
      }
    }

    function onDown(e: MouseEvent){
      // pulse and glow burst
      const pulse = document.createElement('div')
      pulse.className = 'cursor-pulse'
      pulse.style.left = `${e.clientX}px`
      pulse.style.top = `${e.clientY}px`
      document.body.appendChild(pulse)
      requestAnimationFrame(()=>{
        pulse.style.transform = 'translate(-50%, -50%) scale(2.8)'
        pulse.style.opacity = '0'
      })
      setTimeout(()=> pulse.remove(), 700)
    }

    function onClick(e: MouseEvent){
      const r = document.createElement('div')
      r.className = 'cursor-ripple'
      r.style.left = e.clientX + 'px'
      r.style.top = e.clientY + 'px'
      document.body.appendChild(r)
      requestAnimationFrame(()=>{
        r.style.transform = 'translate(-50%, -50%) scale(6)'
        r.style.opacity = '0'
      })
      setTimeout(()=> r.remove(), 800)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('click', onClick)

    // trailing particles
    const particles: HTMLDivElement[] = []
    function spawnParticle(px: number, py: number){
      const p = document.createElement('div')
      p.className = 'cursor-particle'
      p.style.left = px + 'px'
      p.style.top = py + 'px'
      container.appendChild(p)
      particles.push(p)
      requestAnimationFrame(()=>{
        p.style.transform = `translate(-50%, -50%) translateY(-18px) scale(0.3)`
        p.style.opacity = '0'
      })
      setTimeout(()=> { p.remove(); const i = particles.indexOf(p); if (i>-1) particles.splice(i,1) }, 900)
    }

    // RAF loop for smooth motion
    let raf = 0
    function loop(){
      raf = requestAnimationFrame(loop)
      // lerp position
      lastX += (x - lastX) * 0.22
      lastY += (y - lastY) * 0.22
      vx = lastX - lastX // compute velocity approx
      // compute simple velocity from difference
      const dx = x - lastX
      const dy = y - lastY
      const speed = Math.sqrt(dx*dx + dy*dy)

      // stretch based on speed
      const stretchX = Math.min(1 + speed * 0.025, 1.28)
      const stretchY = Math.max(1 - speed * 0.012, 0.82)

      // apply transforms
      ring.style.transform = `translate(${lastX - 22}px, ${lastY - 22}px) scale(${isHoverButton ? 1.28 : 1})`
      dot.style.transform = `translate(${lastX - 7}px, ${lastY - 7}px) scale(${isHoverButton ? 1.6 : 1}) translateZ(0) rotate(0.01deg)`
      glow.style.transform = `translate(${lastX - 36}px, ${lastY - 36}px) scale(${isHoverButton ? 1.3 : 1})`

      // stretch ring slightly
      ring.style.width = `${44 * stretchX}px`
      ring.style.height = `${44 * stretchY}px`

      // particle spawn based on speed
      if (speed > 6) spawnParticle(lastX, lastY)
    }
    loop()

    return ()=>{
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('click', onClick)
      document.body.style.cursor = prevCursor
      container.remove()
      spotlight.remove()
    }
  }, [])

  // Render nothing — all DOM handled imperatively for performance
  return null
}
