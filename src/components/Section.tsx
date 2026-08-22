import type { SectionId } from '../brain/sections'
import { SECTION_HEADS } from '../data/content'

interface Props {
  id: SectionId
  children: React.ReactNode
}

export function Section({ id, children }: Props) {
  const head = SECTION_HEADS[id]
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="mono">{head.mono}</div>
          <h2>{head.title}</h2>
          <p>{head.blurb}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
