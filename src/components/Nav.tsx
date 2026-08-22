import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../brain/sections'

interface Props {
  soundOn: boolean
  onToggleSound: () => void
}

const SPEAKER = [
  '..###......',
  '.#####.....',
  '###.##.....',
  '###.##.....',
  '###.##.....',
  '.#####.....',
  '..###......',
]

const WAVES: [number, number][] = [
  [8, 1], [9, 2], [10, 3], [9, 4], [8, 5],
]

const X: [number, number][] = [
  [8, 1], [8, 2], [9, 3], [9, 4],
]

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 11 8" shapeRendering="crispEdges" aria-hidden="true" className="sound-icon">
      {SPEAKER.map((row, y) =>
        row.split('').map((ch, x) =>
          ch === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={on ? '#7fff6b' : '#5a4d68'} /> : null,
        ),
      )}
      {(on ? WAVES : X).map(([x, y], i) => (
        <rect key={`w${i}`} x={x} y={y} width={1} height={1} fill={on ? '#ffb347' : '#ff6b6b'} />
      ))}
    </svg>
  )
}

export function Nav({ soundOn, onToggleSound }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="brand" href="#top" onClick={close}>
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 10 12" width="14" height="16" shapeRendering="crispEdges">
              <path d="M5 1 L2 7 L4 7 L4 11 L8 5 L6 5 L7 1 Z" fill="currentColor" />
            </svg>
          </span>
          Adamu Sulaiman
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-cta">
          <a className="btn btn-sm btn-ghost" href="mailto:adamusulaiman740@gmail.com">
            Get in touch
          </a>
          <button
            className="pixel-btn sound-toggle"
            onClick={onToggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
          >
            <SoundIcon on={soundOn} />
          </button>
          <button
            className={`burger${open ? ' open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' show' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a className="btn btn-sm btn-ghost" href="mailto:adamusulaiman740@gmail.com" onClick={close}>
          Get in touch
        </a>
      </div>
    </>
  )
}
