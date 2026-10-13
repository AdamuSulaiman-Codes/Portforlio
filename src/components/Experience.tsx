import { TIMELINE } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead
          eyebrow="03 — Experience"
          title="Where I have worked and studied."
        />

        <div className="timeline">
          {TIMELINE.map((item, index) => (
            <Reveal key={`${item.period}-${item.title}`} delay={index * 70}>
              <div className={item.kind === 'education' ? 'tl tl--education' : 'tl'}>
                <p className="tl__period">{item.period}</p>
                <div>
                  <div className="tl__title-row">
                    <h3 className="tl__title">{item.title}</h3>
                    {item.kind === 'education' ? (
                      <span className="chip chip--accent">Education</span>
                    ) : null}
                  </div>
                  <p className="tl__org">
                    {item.org}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                  <ul className="tl__points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
