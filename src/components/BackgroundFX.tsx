import { useEffect, useRef } from 'react'

// A subtle lab background: a sparse grid of pixel-dust dots that brighten and
// swell near the cursor, plus a soft green light that follows the mouse.
// Only active on hover-capable devices; honours reduced-motion.
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hover || reduced) return

    const canvas = canvasRef.current
    const glow = glowRef.current
    if (!canvas || !glow) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    glow.style.opacity = '1'
    let raf = 0
    let dots: { x: number; y: number }[] = []
    const mouse = { x: -9999, y: -9999 }
    const cur = { x: -9999, y: -9999 }
    const spacing = 48
    const R = 150
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const size = () => {
      canvas.width = window.innerWidth * DPR
      canvas.height = window.innerHeight * DPR
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      dots = []
      for (let x = 40; x < window.innerWidth - 20; x += spacing) {
        for (let y = 40; y < window.innerHeight - 20; y += spacing) {
          dots.push({ x: x + (Math.random() * 8 - 4), y: y + (Math.random() * 8 - 4) })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      cur.x += (mouse.x - cur.x) * 0.12
      cur.y += (mouse.y - cur.y) * 0.12
      for (const d of dots) {
        const k = Math.max(0, 1 - Math.hypot(d.x - cur.x, d.y - cur.y) / R)
        ctx.beginPath()
        ctx.arc(d.x, d.y, k > 0 ? 1.7 + k * 1.8 : 1.3, 0, Math.PI * 2)
        ctx.fillStyle = k > 0 ? `rgba(127,255,107,${0.1 + k * 0.5})` : 'rgba(139,126,160,0.09)'
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      glow.style.setProperty('--mx', `${e.clientX}px`)
      glow.style.setProperty('--my', `${e.clientY}px`)
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    size()
    window.addEventListener('resize', size)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="bg-fx" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  )
}
