// Pixel-art brain specimen — ANATOMICAL SIDE PROFILE.
// Big wrinkly hemisphere on top, a smaller temporal lobe tucked under the
// lower-front (below the lateral sulcus), a distinctly striped cerebellum at
// the lower-back, and a short brain stem descending below it.
const SPANS: [number, number][] = [
  [19, 21], [16, 24], [14, 23], [12, 27], [11, 26], [9, 29], [8, 28], [7, 31],
  [6, 33], [6, 33], [5, 33], [5, 32], [5, 31], [6, 30], [6, 29], [7, 28],
  [7, 28], [8, 28], [9, 27], [10, 27], [11, 28], [12, 28], [13, 28], [14, 27],
  [15, 26], [15, 25], [15, 24], [15, 23], [16, 22], [17, 21], [18, 20], [18, 19],
  [19, 18], [20, 17],
]

export const WIDTH = 40
export const ROWS = SPANS.length

// Preserved-specimen palette: light, base, shadow, deep.
export const PALETTE = ['#d2c2da', '#a88cb5', '#7d6489', '#4a3556']
export const OUTLINE = '#241b2e'

export interface Cell {
  x: number
  y: number
  tone: number // 0 light .. 3 deep
  outline: boolean
}

interface BBox {
  x: number
  y: number
  w: number
  h: number
}

// Wavy worm-like gyri ridges across the upper surface.
const GYRI: [number, number][][] = [
  [[8, 5], [10, 5], [12, 6], [14, 6], [16, 5], [18, 5]],
  [[10, 3], [12, 3], [14, 4], [16, 4]],
  [[18, 4], [20, 4], [22, 5], [24, 5], [26, 4]],
  [[12, 9], [14, 9], [16, 10], [18, 10], [20, 9], [22, 9]],
  [[24, 9], [26, 9], [28, 10], [30, 10]],
  [[6, 9], [7, 9], [8, 10], [9, 10], [10, 9]],
  [[9, 13], [11, 13], [13, 14], [15, 14], [17, 13]],
  [[20, 13], [22, 13], [24, 14], [26, 14], [28, 13]],
  [[8, 17], [10, 17], [12, 18], [14, 18], [16, 17], [18, 17]],
  [[26, 17], [28, 17], [30, 18]],
  [[18, 20], [20, 20], [22, 21], [24, 21], [26, 20]],
  [[12, 21], [14, 21], [16, 22], [18, 22], [20, 21]],
]

// The lateral sulcus: a groove curving down toward the lower-front,
// separating the temporal lobe below it from the main mass above.
const LATERAL: [number, number][] = [
  [8, 18], [10, 17], [12, 16], [14, 16], [16, 15], [18, 14], [20, 14], [22, 14],
]

// Temporal lobe wrinkles (below the lateral sulcus).
const TEMPORAL: [number, number][] = [
  [9, 21], [11, 21], [13, 22], [15, 22], [17, 21],
  [14, 24], [16, 24], [18, 25], [20, 25],
  [6, 25], [7, 25], [8, 26], [9, 26],
  [11, 23], [13, 23], [15, 24],
]

function baseTone(y: number): number {
  const ny = y / (ROWS - 1)
  if (ny < 0.15) return 0
  if (ny < 0.6) return 1
  if (ny < 0.72) return 2
  if (ny < 0.86) return 3
  if (ny < 0.94) return 4
  return 5
}

function buildSulcus(filled: Set<string>): Set<string> {
  const set = new Set<string>()
  const add = (pts: [number, number][]) => {
    for (const [x, y] of pts) if (filled.has(`${x},${y}`)) set.add(`${x},${y}`)
  }
  GYRI.forEach(add)
  add(LATERAL)
  add(TEMPORAL)
  // Cerebellum: tight, horizontal striping (visually distinct from the wavy
  // gyri of the main mass above it).
  for (const y of [21, 23, 25]) {
    for (let x = 20; x < 30; x++) add([[x, y]])
  }
  return set
}

let cache: { cells: Cell[]; bbox: BBox } | null = null

export function buildBrain(): { cells: Cell[]; bbox: BBox } {
  if (cache) return cache
  const filled: { x: number; y: number }[] = []
  const filledSet = new Set<string>()
  for (let y = 0; y < ROWS; y++) {
    const [a, b] = SPANS[y]
    for (let x = a; x <= b; x++) {
      filled.push({ x, y })
      filledSet.add(`${x},${y}`)
    }
  }

  const sulcus = buildSulcus(filledSet)
  const cells: Cell[] = filled.map(({ x, y }) => {
    const key = `${x},${y}`
    const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(
      ([dx, dy]) => !filledSet.has(`${x + dx},${y + dy}`),
    )
    let tone: number
    if (sulcus.has(key)) tone = 3
    else if (edge) tone = 3
    else {
      const t = baseTone(y)
      if (t === 2) tone = (x + y) % 2 === 0 ? 1 : 2
      else if (t === 3) tone = 2
      else if (t === 4) tone = (x + y) % 2 === 0 ? 2 : 3
      else tone = t
    }
    return { x, y, tone, outline: edge }
  })

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const c of cells) {
    x0 = Math.min(x0, c.x); y0 = Math.min(y0, c.y)
    x1 = Math.max(x1, c.x); y1 = Math.max(y1, c.y)
  }
  const bbox = { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }
  cache = { cells, bbox }
  return cache
}
