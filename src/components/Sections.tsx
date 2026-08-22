import { ABOUT, CONTACT, EXPERIENCE, FACTS, SKILLS, CONTACT_BLURB } from '../data/content'

function Rich({ text }: { text: string }) {
  const parts = text.split(/(<\/?b>)/)
  let bold = false
  return (
    <>
      {parts.map((p, i) => {
        if (p === '<b>') {
          bold = true
          return null
        }
        if (p === '</b>') {
          bold = false
          return null
        }
        return bold ? <b key={i}>{p}</b> : <span key={i}>{p}</span>
      })}
    </>
  )
}

export function AboutBody() {
  return (
    <div className="about-grid">
      <div className="about-copy reveal">
        {ABOUT.map((p, i) => (
          <p key={i}>
            <Rich text={p} />
          </p>
        ))}
      </div>
      <div className="facts reveal">
        {FACTS.map((f) => (
          <div className="fact" key={f.k}>
            <span className="k">{f.k}</span>
            <span className="v">{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ExperienceBody() {
  return (
    <div className="exp-list">
      {EXPERIENCE.map((e) => (
        <div className="exp-item reveal" key={e.year}>
          <div className="exp-year">{e.year}</div>
          <div className="exp-role">
            <h3>{e.role}</h3>
            <div className="org">{e.org}</div>
            <ul>
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkillsBody() {
  return (
    <div className="skills-grid">
      {SKILLS.map((g) => (
        <div className="skill-group reveal" key={g.name}>
          <div className="mono">{g.name}</div>
          <h3>{g.heading}</h3>
          <div className="tags">
            {g.items.map((t) => (
              <span className={`tch${t.hot ? ' hot' : ''}`} key={t.name}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContactBody() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div className="mono reveal">05 — CONTACT</div>
        <h2 className="reveal">
          Let&apos;s build something that holds up in production.
        </h2>
        <p className="sub reveal">{CONTACT_BLURB}</p>
        <div className="contact-ctas reveal">
          <a className="btn btn-accent btn-lg" href={CONTACT[0].href}>
            {CONTACT[0].value} <span aria-hidden="true">▸</span>
          </a>
          <a className="btn btn-ghost btn-lg" href="tel:+2348160603614">
            {CONTACT[1].value}
          </a>
          {CONTACT[2].href && (
            <a className="btn btn-ghost btn-lg" href={CONTACT[2].href} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
