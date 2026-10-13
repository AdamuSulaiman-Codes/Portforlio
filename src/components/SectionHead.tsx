import { Reveal } from './Reveal'

export function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string
  title: string
  note?: string
}) {
  return (
    <Reveal>
      <div className="sec-head">
        <p className="mono">{eyebrow}</p>
        <div>
          <h2 className="sec-title">{title}</h2>
          {note ? <p className="sec-note">{note}</p> : null}
        </div>
      </div>
    </Reveal>
  )
}
