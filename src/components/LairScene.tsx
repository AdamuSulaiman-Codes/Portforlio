import { useState } from 'react'
import { BrainSprite } from './BrainSprite'
import { MascotSprite } from './MascotSprite'
import { SECTIONS, sectionMeta, type SectionId } from '../brain/sections'
import { sound } from '../lib/sound'

interface LairProps {
  onSelect: (id: SectionId) => void
  showHint: boolean
  onHintDismiss: () => void
}

const PANEL_POS: Record<SectionId, { className: string; cable: string }> = {
  about: {
    className: 'pos-tl',
    cable: 'M 15 31 C 25 35, 36 41, 47 50',
  },
  skills: {
    className: 'pos-tr',
    cable: 'M 85 31 C 75 35, 64 41, 53 50',
  },
  projects: {
    className: 'pos-bl',
    cable: 'M 15 70 C 25 66, 36 60, 47 52',
  },
  experience: {
    className: 'pos-br',
    cable: 'M 85 70 C 75 66, 64 60, 53 52',
  },
}

export function LairScene({ onSelect, showHint, onHintDismiss }: LairProps) {
  const [focused, setFocused] = useState<SectionId | null>(null)
  return (
    <div className="lair">
      <div className="lair-bg" aria-hidden="true">
        <div className="lair-glow" />
      </div>

      <BackgroundProps />
      <Floor />

      <div className="lair-title">
        <h1>THE LAB</h1>
        <p>Welcome, visitor. Pick a panel — or scroll on, if you dare.</p>
      </div>

      <Cables focused={focused} />

      <div className="jar-wrap">
        <Jar />
      </div>

      {SECTIONS.map((s) => (
        <ControlPanel
          key={s.id}
          section={s.id}
          hot={focused === s.id}
          dim={focused !== null && focused !== s.id}
          onFocus={setFocused}
          onSelect={onSelect}
        />
      ))}

      <Mascot showHint={showHint} onHintDismiss={onHintDismiss} />
    </div>
  )
}

// ---------- cables ----------

function Cables({ focused }: { focused: SectionId | null }) {
  return (
    <svg className="cables" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {SECTIONS.map((s) => {
        const meta = sectionMeta(s.id)
        const hot = focused === s.id
        const dim = focused !== null && !hot
        return (
          <g key={s.id} className={`cable${hot ? ' hot' : ''}${dim ? ' dim' : ''}`}>
            <path d={PANEL_POS[s.id].cable} fill="none" stroke="#241b2e" strokeWidth="0.7" />
            <path
              d={PANEL_POS[s.id].cable}
              fill="none"
              stroke={meta.accent}
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray={hot ? '0.9 1.1' : '1.4 2.6'}
              opacity={hot ? 1 : 0.5}
            />
          </g>
        )
      })}
    </svg>
  )
}

// ---------- control panels ----------

interface PanelProps {
  section: SectionId
  hot: boolean
  dim: boolean
  onFocus: (id: SectionId | null) => void
  onSelect: (id: SectionId) => void
}

function ControlPanel({ section, hot, dim, onFocus, onSelect }: PanelProps) {
  const meta = sectionMeta(section)
  return (
    <button
      className={`panel ${PANEL_POS[section].className}${hot ? ' hot' : ''}${dim ? ' dim' : ''}`}
      style={{ '--accent': meta.accent, '--dim': meta.dim } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={`Open ${meta.label}`}
      onClick={() => {
        sound.panel()
        onSelect(section)
      }}
      onMouseEnter={() => {
        sound.hover()
        onFocus(section)
      }}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(section)}
      onBlur={() => onFocus(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          sound.panel()
          onSelect(section)
        }
      }}
    >
      <span className="panel-led" aria-hidden="true" />
      <span className="panel-screen">
        <span className="panel-label">{meta.label}</span>
        <span className="panel-file">{meta.file}</span>
        <span className="panel-data" aria-hidden="true">
          {scrollingData[section]}
        </span>
      </span>
      <span className="panel-scan" aria-hidden="true" />
    </button>
  )
}

const scrollingData: Record<SectionId, string> = {
  about: 'SIG ▓▓░▐▌▒ SIGNAL ░▐▒▓ SUBJECT DETECTED ▓▒▐░',
  skills: 'PWR ▒▐▓░ LOAD ░▒▐ LOAD ▓▒▐ POWER ▐▒▓░',
  projects: 'DATA ▐▒▓ RUN ░▐▒ BUILD ▓░▐ SHIP ▒▓░▐',
  experience: 'LOG ▓▒▐ 2025 ░▐▒ ENTRY ▒▓░ REC ▐▒▓',
}

// ---------- the brain jar ----------

function Jar() {
  return (
    <div className="jar" role="img" aria-label="A brain specimen floating in a jar of glowing green liquid, crackling with electricity.">
      <svg className="jar-svg" viewBox="0 0 120 160" aria-hidden="true">
        {/* pedestal */}
        <g>
          <rect x={18} y={146} width={84} height={8} rx={2} fill="#3a3146" />
          <rect x={26} y={138} width={68} height={10} rx={2} fill="#4c4159" />
          <rect x={32} y={130} width={56} height={10} rx={2} fill="#5a4d68" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={36 + i * 6} y={132} width={3} height={6} fill="#7d6a8c" />
          ))}
        </g>
        {/* glass back */}
        <rect x={30} y={26} width={60} height={106} rx={10} fill="rgba(200,220,255,0.05)" />
        <rect x={30} y={26} width={60} height={106} rx={10} fill="none" stroke="#8fa0b8" strokeOpacity={0.5} strokeWidth={1.5} />
        {/* metal lid + rim */}
        <rect x={24} y={22} width={72} height={8} rx={3} fill="#6b5d7a" />
        <rect x={24} y={22} width={72} height={3} rx={1.5} fill="#8a7a99" />
        {/* lid prongs (electrodes) into the jar */}
        <rect x={46} y={30} width={2} height={26} fill="#8fa0b8" />
        <rect x={72} y={30} width={2} height={26} fill="#8fa0b8" />
        <rect x={59} y={30} width={2} height={18} fill="#8fa0b8" />
        {/* liquid */}
        <path
          d="M33 96 q3 -4 6 -2 q4 -3 8 0 q5 -4 10 0 q4 -3 8 0 q5 -3 9 0 q3 -2 5 0 q3 -3 6 0 l2 50 q-2 3 -5 3 l-44 0 q-3 0 -5 -3 Z"
          fill="url(#liqGrad)"
        />
        {/* bubbles */}
        <circle className="bub b1" cx={52} cy={118} r={2.2} fill="#b6ff9a" />
        <circle className="bub b2" cx={68} cy={124} r={1.6} fill="#b6ff9a" />
        <circle className="bub b3" cx={58} cy={128} r={2.6} fill="#b6ff9a" />
        <circle className="bub b4" cx={74} cy={112} r={1.8} fill="#b6ff9a" />
        <circle className="bub b5" cx={48} cy={126} r={1.4} fill="#b6ff9a" />
        <defs>
          <linearGradient id="liqGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fff6b" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#2f9e3a" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        {/* electrical arcs */}
        <g className="arc arc1">
          <polyline points="47,32 42,44 49,44 44,58" fill="none" stroke="#b6ff9a" strokeWidth={1.4} />
        </g>
        <g className="arc arc2">
          <polyline points="73,32 78,46 70,48 76,60" fill="none" stroke="#caffb8" strokeWidth={1.2} />
        </g>
        <g className="arc arc3">
          <polyline points="60,30 56,42 63,44 58,54" fill="none" stroke="#7fff6b" strokeWidth={1.1} />
        </g>
        {/* glass front highlight */}
        <rect x={35} y={34} width={8} height={88} rx={4} fill="#eaf2ff" opacity={0.12} />
        <rect x={30} y={26} width={60} height={106} rx={10} fill="none" stroke="#c9d6ef" strokeOpacity={0.35} strokeWidth={1} />
      </svg>

      <div className="jar-brain">
        <BrainSprite />
      </div>

      <div className="jar-glow" aria-hidden="true" />
    </div>
  )
}

// ---------- villain mascot ----------

function Mascot({ showHint, onHintDismiss }: { showHint: boolean; onHintDismiss: () => void }) {
  return (
    <div className="mascot">
      <button
        className="mascot-sprite"
        aria-label="Adamu, the villainous lab assistant. Click to hear his cackle."
        onClick={() => sound.cackle()}
      >
        <MascotSprite />
      </button>

      {showHint && (
        <div className="mascot-bubble">
          <p>Ahh, a visitor! Poke around my lab — every panel holds a secret.</p>
          <span className="bubble-tail" aria-hidden="true" />
          <button className="close-x" onClick={onHintDismiss} aria-label="Dismiss hint">
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

// ---------- background props ----------

function BackgroundProps() {
  return (
    <div className="bg-props" aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" className="bg-svg">
        {/* pipes */}
        <g stroke="#3a3146" strokeWidth={6} fill="none">
          <path d="M-10 40 H120 V70 H300 V40 H410" />
        </g>
        <g stroke="#4c4159" strokeWidth={3} fill="none">
          <path d="M-10 52 H90 V82 H290 V52 H410" />
        </g>
        {/* gauge */}
        <g transform="translate(46 120)">
          <circle r={14} fill="#241b2e" stroke="#6b5d7a" strokeWidth={3} />
          <line x1={0} y1={0} x2={7} y2={-8} stroke="#7fff6b" strokeWidth={2} />
          <circle r={2} fill="#7fff6b" />
        </g>
        {/* tesla coil left */}
        <g transform="translate(330 150)">
          <rect x={-8} y={-60} width={16} height={60} fill="#3a3146" />
          <circle r={12} cy={-64} fill="#241b2e" stroke="#6b5d7a" strokeWidth={2} />
          <path d="M-12 -64 L12 -64" stroke="#7fff6b" strokeWidth={1.5} className="coil-spark" />
          <path d="M0 -64 L0 -76" stroke="#7fff6b" strokeWidth={1.5} className="coil-spark" />
        </g>
        {/* tesla coil right */}
        <g transform="translate(56 190)">
          <rect x={-7} y={-50} width={14} height={50} fill="#3a3146" />
          <circle r={10} cy={-53} fill="#241b2e" stroke="#6b5d7a" strokeWidth={2} />
          <path d="M-10 -53 L10 -53" stroke="#b48cff" strokeWidth={1.5} className="coil-spark s2" />
        </g>
        {/* pipes vertical */}
        <g stroke="#2e2638" strokeWidth={5} fill="none">
          <path d="M0 300 V90 H40 V0" />
          <path d="M400 300 V70 H360 V0" />
        </g>
      </svg>
    </div>
  )
}

function Floor() {
  return (
    <div className="floor" aria-hidden="true">
      <div className="floor-tiles" />
      <div className="mist m1" />
      <div className="mist m2" />
      <div className="mist m3" />
    </div>
  )
}
