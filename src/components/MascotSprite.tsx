const MASCOT_MAP = [
  '...hhhhhh.....',
  '..hhhhhhhh....',
  '..sssssssss...',
  '.sbsseessbss..',
  '.sssssssssss..',
  '..smmmmmmms...',
  '...sssssss....',
  '....nnnnn.....',
  '..cccccccccc..',
  '.ccccckkcccc..',
  '.ccccckkcccc..',
  '.ccccccccccc..',
  '..cccccccccc..',
  '..ll......ll..',
  '..ll......ll..',
  '.fff......fff.',
]

const COLORS: Record<string, string> = {
  h: '#1c1230',
  s: '#8a5a3d',
  b: '#1c1230',
  e: '#7fff6b',
  m: '#f0e6d6',
  n: '#cfd4da',
  c: '#cfd4da',
  k: '#6b7280',
  l: '#3a3a4a',
  f: '#2c2c38',
}

export function MascotSprite({ className }: { className?: string }) {
  const cape = []
  for (let y = 3; y <= 15; y++) {
    cape.push({ x: 0, y }, { x: 13, y })
  }
  return (
    <svg className={className} viewBox="0 0 14 16" shapeRendering="crispEdges" aria-hidden="true">
      <g className="mascot-cape">
        {cape.map(({ x, y }, i) => (
          <rect key={`c${i}`} x={x} y={y} width={1} height={1} fill="#5a2a75" />
        ))}
      </g>
      {MASCOT_MAP.map((row, y) =>
        row.split('').map((ch, x) => {
          const fill = COLORS[ch]
          if (!fill) return null
          const key = `${x}-${y}`
          if (ch === 'e') {
            return (
              <g key={key} className="mascot-eye">
                <rect x={x} y={y} width={1} height={1} fill={fill} />
              </g>
            )
          }
          return <rect key={key} x={x} y={y} width={1} height={1} fill={fill} />
        }),
      )}
    </svg>
  )
}
