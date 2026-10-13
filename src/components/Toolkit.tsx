import { TOOLKIT } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function Toolkit() {
  return (
    <section className="section" id="toolkit">
      <div className="wrap">
        <SectionHead
          eyebrow="04 — Toolkit"
          title="The tools I reach for."
          note="Listed honestly: things I have used to build and ship, not things I have read about."
        />

        <Reveal>
          <div className="toolkit">
            {TOOLKIT.map((group) => (
              <div className="tool" key={group.group}>
                <h3 className="tool__group">{group.group}</h3>
                <div className="chips tool__items">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
