import { useEffect, useRef, useState } from 'react'
import { Nav } from './components/Nav'
import { BackgroundFX } from './components/BackgroundFX'
import { ChaseFX } from './components/ChaseFX'
import { LairScene } from './components/LairScene'
import { Ticker } from './components/Ticker'
import { Section } from './components/Section'
import { AboutBody, ContactBody, ExperienceBody, SkillsBody } from './components/Sections'
import { ProjectCard } from './components/ProjectCard'
import { PROJECTS, CONTACT } from './data/content'
import type { SectionId } from './brain/sections'
import { sound, startMusic, stopMusic } from './lib/sound'

const VISIT_FLAG = 'pw-lair-visited-v1'
const SOUND_FLAG = 'pw-lair-sound-v1'

export function App() {
  const [activating, setActivating] = useState<SectionId | null>(null)
  const [hint, setHint] = useState(false)
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem(SOUND_FLAG) === '1'
    } catch {
      return false
    }
  })
  const powerTimer = useRef<number | null>(null)

  useEffect(() => {
    sound.setEnabled(soundOn)
    if (soundOn) startMusic()
    else stopMusic()
  }, [soundOn])

  useEffect(() => {
    let first = true
    try {
      first = localStorage.getItem(VISIT_FLAG) !== '1'
    } catch {
      /* ignore */
    }
    if (first) {
      const t = window.setTimeout(() => {
        setHint(true)
        sound.cackle()
      }, 1100)
      return () => window.clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const dismissHint = () => {
    setHint(false)
    try {
      localStorage.setItem(VISIT_FLAG, '1')
    } catch {
      /* ignore */
    }
  }

  const open = (id: SectionId) => {
    dismissHint()
    sound.powerUp()
    setActivating(id)
    if (powerTimer.current) window.clearTimeout(powerTimer.current)
    powerTimer.current = window.setTimeout(() => setActivating(null), 480)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => () => {
    if (powerTimer.current) window.clearTimeout(powerTimer.current)
  }, [])

  const toggleSound = () => {
    setSoundOn((s) => {
      const next = !s
      try {
        localStorage.setItem(SOUND_FLAG, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <div className="app">
      <BackgroundFX />
      <ChaseFX />
      <Nav soundOn={soundOn} onToggleSound={toggleSound} />

      <div className="hero" id="top">
        <LairScene showHint={hint} onHintDismiss={dismissHint} onSelect={open} />
        <div className="hero-meta reveal">
          <span className="chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            Abuja, Nigeria
          </span>
          <a className="chip" href={CONTACT[0].href}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
            {CONTACT[0].value}
          </a>
          <span className="chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
            {CONTACT[1].value}
          </span>
        </div>
      </div>

      <Ticker />

      <main>
        <Section id="about">
          <AboutBody />
        </Section>

        <Section id="projects">
          <div className="project-list">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </Section>

        <Section id="experience">
          <ExperienceBody />
        </Section>

        <Section id="skills">
          <SkillsBody />
        </Section>
      </main>

      <ContactBody />

      <footer>
        <div className="wrap foot">
          <span className="mono">© 2026 Adamu Sulaiman Muhammed</span>
          <div className="right">
            <a href="#top">Back to top ↑</a>
            <a href="mailto:adamusulaiman740@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      {activating && <div className="power-flash" role="presentation" aria-hidden="true" />}
    </div>
  )
}
