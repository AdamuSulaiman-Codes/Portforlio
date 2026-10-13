import { CONTACT_BODY, CONTACT_LEAD, PROFILE } from '../data/content'
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons'
import { Reveal } from './Reveal'

const DETAILS = [
  { k: 'Email', v: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { k: 'Phone', v: PROFILE.phone },
  { k: 'GitHub', v: 'AdamuSulaiman-Codes', href: PROFILE.github },
  { k: 'LinkedIn', v: 'adamu-sulaiman-muhammed', href: PROFILE.linkedin },
  { k: 'Location', v: PROFILE.location },
]

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="mono">05 — Contact</p>
            <div>
              <h2 className="contact__lead">{CONTACT_LEAD}</h2>
              <p className="contact__body">{CONTACT_BODY}</p>
            </div>
          </div>
        </Reveal>

        <div className="contact">
          <Reveal delay={60}>
            <div className="contact__actions">
              <a className="btn btn--primary" href={`mailto:${PROFILE.email}`}>
                <Mail size={15} />
                {PROFILE.email}
              </a>
              <a
                className="btn btn--ghost"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedIn size={15} />
                LinkedIn
                <ArrowUpRight size={12} className="btn__icon" />
              </a>
              <a
                className="btn btn--ghost"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GitHub size={15} />
                GitHub
                <ArrowUpRight size={12} className="btn__icon" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="details">
              {DETAILS.map((detail) => (
                <div className="details__row" key={detail.k}>
                  <dt className="details__k">{detail.k}</dt>
                  <dd className="details__v">
                    {detail.href ? (
                      <a href={detail.href}>{detail.v}</a>
                    ) : (
                      detail.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
