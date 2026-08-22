let ctx: AudioContext | null = null
let enabled = false
let musicTimer: number | null = null
let musicStep = 0
let noiseBuffer: AudioBuffer | null = null

function ensureCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function getNoise(c: AudioContext): AudioBuffer {
  if (noiseBuffer) return noiseBuffer
  const len = c.sampleRate * 0.5
  noiseBuffer = c.createBuffer(1, len, c.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  return noiseBuffer
}

// Dark "activation" blip: low square/saw with fast pitch drop.
function blip(freq: number, dur = 0.18, gain = 0.05, when = 0, type: OscillatorType = 'square') {
  if (!enabled) return
  const c = ensureCtx()
  if (!c) return
  const t0 = c.currentTime + when
  const osc = c.createOscillator()
  const g = c.createGain()
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = Math.min(2800, freq * 3 + 500)
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(lp)
  lp.connect(g)
  g.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

const N = (n: number) => 440 * Math.pow(2, (n - 69) / 12)

export const sound = {
  get enabled() {
    return enabled
  },
  setEnabled(on: boolean) {
    enabled = on
    if (on) ensureCtx()
    else stopMusic()
  },
  hover() {
    blip(180, 0.09, 0.03, 0, 'triangle')
  },
  panel() {
    blip(N(40), 0.14, 0.05)
    blip(N(55), 0.2, 0.04, 0.06, 'sawtooth')
  },
  powerUp() {
    blip(90, 0.5, 0.07, 0, 'sawtooth')
    blip(140, 0.4, 0.05, 0.12)
    blip(220, 0.3, 0.04, 0.24)
  },
  back() {
    blip(220, 0.12, 0.045)
    blip(130, 0.18, 0.045, 0.07)
  },
  spark() {
    const c = ensureCtx()
    if (!c || !enabled) return
    const t0 = c.currentTime
    const src = c.createBufferSource()
    src.buffer = getNoise(c)
    const bp = c.createBiquadFilter()
    bp.type = 'highpass'
    bp.frequency.value = 1800
    const g = c.createGain()
    g.gain.setValueAtTime(0.08, t0)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08)
    src.connect(bp)
    bp.connect(g)
    g.connect(c.destination)
    src.start(t0)
    src.stop(t0 + 0.1)
  },
  shoot() {
    blip(70, 0.09, 0.06, 0, 'sawtooth')
    blip(130, 0.07, 0.04, 0.02, 'square')
  },
  // Villain cackle easter egg: a descending sequence of short tones.
  cackle() {
    if (!enabled) return
    const seq = [78, 74, 70, 74, 66, 62, 58, 62]
    seq.forEach((n, i) => blip(N(n), 0.09, 0.045, i * 0.07, 'square'))
    blip(N(58), 0.3, 0.05, seq.length * 0.07, 'square')
  },
}

// ---- low ambient hum loop (optional, muted by default) ----

const BASS = [40, 36, 43, 35]
const ARP = [52, 55, 59, 64]

export function startMusic() {
  if (!enabled || musicTimer !== null) return
  if (!ensureCtx()) return
  musicStep = 0
  const tick = () => {
    if (!enabled) return
    const beat = 0.5
    const b = BASS[Math.floor(musicStep / 2) % BASS.length]
    const a = ARP[musicStep % ARP.length]
    blip(N(b), 0.7, 0.03, 0.08, 'sine')
    if (musicStep % 4 === 2) blip(N(a), 0.4, 0.018, 0.08, 'triangle')
    musicStep++
    musicTimer = window.setTimeout(tick, beat * 1000)
  }
  tick()
}

export function stopMusic() {
  if (musicTimer !== null) {
    window.clearTimeout(musicTimer)
    musicTimer = null
  }
}
