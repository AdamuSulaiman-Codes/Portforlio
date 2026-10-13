import { ABOUT, CURRENTLY } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead
          eyebrow="02 — About"
          title="Backend-first, but I build the whole product."
        />

        <div className="about">
          <div className="about__body">
            {ABOUT.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="panel">
              <div className="panel__head">
                <span className="panel__title">{CURRENTLY.title}</span>
              </div>
              <div className="panel__body">
                <ul className="bullets">
                  {CURRENTLY.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
