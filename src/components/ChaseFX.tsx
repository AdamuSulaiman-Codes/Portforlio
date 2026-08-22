import { useEffect, useRef, useState } from 'react'
import { MascotSprite } from './MascotSprite'
import { sound } from '../lib/sound'

const VICINITY = 320
const FIRE_EVERY = 560
const HIT_DIST = 50

// The lair's villain lurks in the corner. He only reacts when you stray into
// his vicinity — then he opens fire at your cursor. And if you keep moving
// without clicking, he stops shooting long enough to demand a job.
export function ChaseFX() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const villainRef = useRef<HTMLDivElement>(null)
  const bulletsRef = useRef<HTMLDivElement>(null)
  const [demand, setDemand] = useState(false)
  const demandRef = useRef(false)
  const s = useRef({
    mx: -9999,
    my: -9999,
    lastMove: 0,
    lastClick: performance.now(),
    lastShot: 0,
    lastDemand: 0,
    raf: 0,
    inVicinity: false,
  })

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hover || reduced) return

    const cursor = cursorRef.current
    const villain = villainRef.current
    const bullets = bulletsRef.current
    if (!cursor || !villain || !bullets) return

    document.documentElement.classList.add('chase-active')

    const onMove = (e: PointerEvent) => {
      s.current.mx = e.clientX
      s.current.my = e.clientY
      s.current.lastMove = performance.now()
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const onClick = () => {
      s.current.lastClick = performance.now()
      demandRef.current = false
      setDemand(false)
    }

    const spawnBurst = (x: number, y: number, cls: string) => {
      const b = document.createElement('div')
      b.className = cls
      bullets.appendChild(b)
      b.style.left = `${x}px`
      b.style.top = `${y}px`
      window.setTimeout(() => b.remove(), 260)
    }

    const fireBullet = (x0: number, y0: number, x1: number, y1: number) => {
      const b = document.createElement('div')
      b.className = 'chase-bullet'
      bullets.appendChild(b)
      b.style.left = `${x0}px`
      b.style.top = `${y0}px`
      spawnBurst(x0, y0, 'chase-flash')
      requestAnimationFrame(() => {
        b.style.transform = `translate(${x1 - x0}px, ${y1 - y0}px)`
        b.style.opacity = '0'
      })
      window.setTimeout(() => {
        b.remove()
        // did it reach the cursor? hit reaction for the "user"
        const d = Math.hypot(s.current.mx - x1, s.current.my - y1)
        if (d < HIT_DIST) hitCursor(x1, y1)
      }, 320)
      sound.shoot()
    }

    const hitCursor = (x: number, y: number) => {
      cursor.classList.remove('hit')
      void cursor.offsetWidth
      cursor.classList.add('hit')
      window.setTimeout(() => cursor.classList.remove('hit'), 420)
      spawnBurst(x, y, 'burst-hit')
      sound.spark()
    }

    const loop = () => {
      const now = performance.now()
      // villain centre: fixed in the bottom-right corner (see CSS)
      const vx = window.innerWidth - 20 - 23
      const vy = window.innerHeight - 16 - 26

      const dist = Math.hypot(s.current.mx - vx, s.current.my - vy)
      s.current.inVicinity = dist < VICINITY

      // open fire while the cursor is in his vicinity and moving
      if (
        s.current.inVicinity &&
        now - s.current.lastShot > FIRE_EVERY &&
        now - s.current.lastMove < 300 &&
        !demandRef.current
      ) {
        fireBullet(vx, vy, s.current.mx, s.current.my)
        s.current.lastShot = now
      }

      // moving but no clicks for a while → the demand
      if (
        !demandRef.current &&
        now - s.current.lastClick > 3800 &&
        now - s.current.lastMove < 700 &&
        now - s.current.lastDemand > 26000
      ) {
        demandRef.current = true
        s.current.lastDemand = now
        setDemand(true)
      }

      s.current.raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onClick)
    s.current.raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('chase-active')
      cancelAnimationFrame(s.current.raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [])

  const hireMe = () => {
    demandRef.current = false
    setDemand(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="chase-layer" aria-hidden="true">
        <div className="chase-bullets" ref={bulletsRef} />
        <div className="chase-villain" ref={villainRef}>
          <div className="chase-villain-inner">
            <MascotSprite />
          </div>
        </div>
        <div className="chase-cursor" ref={cursorRef}>
          <svg viewBox="0 0 15 15" shapeRendering="crispEdges">
            <circle cx="7.5" cy="7.5" r="3.2" fill="none" stroke="#7fff6b" strokeWidth="1.4" />
            <line x1="7.5" y1="0.8" x2="7.5" y2="4.4" stroke="#7fff6b" strokeWidth="1.4" />
            <line x1="7.5" y1="10.6" x2="7.5" y2="14.2" stroke="#7fff6b" strokeWidth="1.4" />
            <line x1="0.8" y1="7.5" x2="4.4" y2="7.5" stroke="#7fff6b" strokeWidth="1.4" />
            <line x1="10.6" y1="7.5" x2="14.2" y2="7.5" stroke="#7fff6b" strokeWidth="1.4" />
            <circle cx="7.5" cy="7.5" r="1" fill="#ffb347" />
          </svg>
        </div>
      </div>

      {demand && (
        <div className="demand-overlay" role="dialog" aria-modal="true" aria-label="The villain demands a job">
          <div className="demand-card">
            <div className="demand-figure">
              <DemandVillain />
            </div>
            <div className="demand-text">
              <h2>GIVE ME A JOB.</h2>
              <p>I watched you from my corner, I shot at you, I have been very patient. Hire me, mortal.</p>
            </div>
            <div className="demand-actions">
              <button className="pixel-btn demand-btn" onClick={hireMe}>
                OK, DEAL
              </button>
              <button className="pixel-btn demand-btn ghost" onClick={hireMe}>
                HIRE ME → CONTACT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// The villain, holding a gun and pointing it straight at the viewer.
function DemandVillain() {
  const cells: { x: number; y: number; c: string }[] = []
  // gun barrel aimed at the camera (centre 21,10)
  for (let y = 0; y < 18; y++) {
    for (let x = 0; x < 30; x++) {
      const dx = x - 21
      const dy = y - 10
      const d = Math.hypot(dx, dy)
      if (d <= 2.3) cells.push({ x, y, c: '#05030a' })
      else if (d <= 4) cells.push({ x, y, c: '#241b2e' })
      else if (d <= 5.6) cells.push({ x, y, c: '#4c4159' })
      else if (d <= 7.6) cells.push({ x, y, c: '#3a3146' })
      else if ((Math.abs(dx) >= 7 && Math.abs(dy) <= 1) || (Math.abs(dy) >= 7 && Math.abs(dx) <= 1)) {
        cells.push({ x, y, c: '#5a4d68' })
      }
    }
  }
  const skin = '#8a5a3d'
  return (
    <svg viewBox="0 0 30 18" shapeRendering="crispEdges" aria-hidden="true" className="demand-figure-svg">
      {/* the villain, facing the viewer */}
      <svg x="0" y="0" width="14" height="16">
        <MascotSprite />
      </svg>
      {/* arms */}
      <rect x={8} y={5} width={2} height={4} fill={skin} />
      <rect x={12} y={5} width={2} height={4} fill={skin} />
      {/* hands gripping the barrel */}
      <rect x={13} y={6} width={3} height={6} fill={skin} />
      <rect x={26} y={6} width={3} height={6} fill={skin} />
      {/* the gun, pointing at you */}
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill={c.c} />
      ))}
      <rect x={19} y={8} width={4} height={4} className="muzzle-core" />
    </svg>
  )
}
