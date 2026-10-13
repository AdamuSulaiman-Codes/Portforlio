import { HEADLINE, HERO_FACTS, PROFILE } from '../data/content'
import { ArrowDown, ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <Reveal>
            <p className="hero__eyebrow">
              <span className="status">
                <span className="status__dot" aria-hidden="true" />
                {PROFILE.status}
              </span>
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="hero__title">
              {HEADLINE.lead.before}
              <em>{HEADLINE.lead.em}</em>
              {HEADLINE.lead.after}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="hero__lede">{HEADLINE.support}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="hero__actions">
              <a className="btn btn--primary" href={`mailto:${PROFILE.email}`}>
                <Mail size={15} />
                Email me
              </a>
              <a className="btn btn--ghost" href="#work">
                Selected work
                <ArrowDown size={14} className="btn__icon" />
              </a>
              <div className="hero__socials">
                <a
                  className="icon-btn"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <GitHub />
                </a>
                <a
                  className="icon-btn"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedIn />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="panel">
            <div className="panel__head">
              <span className="panel__title">Profile</span>
              <span className="mono">2026</span>
            </div>
            <dl className="facts">
              {HERO_FACTS.map((fact) => (
                <div className="facts__row" key={fact.label}>
                  <dt className="facts__k">{fact.label}</dt>
                  <dd className="facts__v">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="panel__foot">
              <a
                className="btn btn--ghost"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                Connect on LinkedIn
                <ArrowUpRight size={13} className="btn__icon" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
