import { buildBrain, OUTLINE, PALETTE, ROWS, WIDTH } from '../brain/pixelBrain'

const CELL = 1
const { cells } = buildBrain()

interface Props {
  className?: string
  ariaLabel?: string
}

export function BrainSprite({ className, ariaLabel = 'A brain specimen in a jar' }: Props) {
  return (
    <svg
      className={`brain-svg ${className ?? ''}`}
      viewBox={`0 0 ${WIDTH} ${ROWS}`}
      role="img"
      aria-label={ariaLabel}
      shapeRendering="crispEdges"
    >
      {cells.map((c) => (
        <rect
          key={`${c.x},${c.y}`}
          x={c.x}
          y={c.y}
          width={CELL}
          height={CELL}
          fill={c.outline ? OUTLINE : PALETTE[c.tone]}
        />
      ))}
    </svg>
  )
}
