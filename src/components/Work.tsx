import { PROJECTS, PROFILE, type Project } from '../data/content'
import { ArrowUpRight, GitHub, Lock } from './Icons'
import { ProjectMedia } from './ProjectMedia'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

function ProjectLinks({ project }: { project: Project }) {
  const privateRepos = project.links.filter(
    (link) => link.kind === 'repo' && link.repo.visibility === 'private',
  )

  const requestHref = () => {
    const names = privateRepos
      .map((link) => (link.kind === 'repo' ? link.repo.name : ''))
      .filter(Boolean)
      .join(', ')
    const subject = encodeURIComponent('Repository access request')
    const body = encodeURIComponent(
      `Hi Adamu,\n\nI'd like to look at ${names}. Could you grant me access or point me to a public copy?\n\nThanks,\n`,
    )
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="project__links">
      {project.links.map((link) => {
        if (link.kind === 'live') {
          return (
            <a
              key={link.href}
              className="btn btn--ghost"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
              <ArrowUpRight size={13} className="btn__icon" />
            </a>
          )
        }

        if (link.repo.visibility === 'public') {
          return (
            <a
              key={link.repo.url}
              className="btn btn--ghost"
              href={link.repo.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHub size={14} />
              {link.label}
            </a>
          )
        }

        return (
          <span className="chip chip--plain" key={link.repo.url}>
            <Lock size={12} />
            {link.repo.name} · private
          </span>
        )
      })}

      {privateRepos.length > 0 ? (
        <a className="btn btn--link" href={requestHref()}>
          Request access
          <ArrowUpRight size={12} className="btn__icon" />
        </a>
      ) : null}
    </div>
  )
}

function ProjectHead({ project }: { project: Project }) {
  return (
    <header className="project__head">
      <span className="project__index">{project.index}</span>
      <h3 className="project__name">{project.name}</h3>
      <span className="project__year">{project.year}</span>
    </header>
  )
}

function ProjectMetrics({ project }: { project: Project }) {
  return (
    <dl className="project__metrics">
      {project.metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="metric__v">{metric.value}</span>
            <span className="metric__l">{metric.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectStack({ project }: { project: Project }) {
  return (
    <div className="chips">
      {project.stack.map((item) => (
        <span className="chip" key={item}>
          {item}
        </span>
      ))}
    </div>
  )
}

function ProjectRow({ project, flip }: { project: Project; flip?: boolean }) {
  if (project.flagship) {
    return (
      <article className="project project--flagship" id={project.id}>
        <div className="project__intro">
          <ProjectHead project={project} />
          <p className="project__kicker">{project.kicker}</p>
          <p className="project__role">{project.role}</p>
        </div>

        <div className="project__media">
          <ProjectMedia media={project.media} eager />
        </div>

        <ProjectMetrics project={project} />

        <div className="project__lead">
          <p className="project__body">{project.body}</p>
          <ul className="project__list">
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="project__foot">
          <ProjectStack project={project} />
          <ProjectLinks project={project} />
        </div>
      </article>
    )
  }

  return (
    <article className={flip ? 'project project--flip' : 'project'} id={project.id}>
      <div className="project__media">
        <ProjectMedia media={project.media} />
      </div>

      <div className="project__content">
        <ProjectHead project={project} />
        <p className="project__kicker">{project.kicker}</p>
        <p className="project__role">{project.role}</p>
        <p className="project__body">{project.body}</p>

        <ul className="project__list">
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <ProjectMetrics project={project} />

        <div className="project__foot">
          <ProjectStack project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

export function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          eyebrow="01 — Selected work"
          title="Systems I designed, built and shipped."
          note="Five projects that went past the prototype stage. Each one has the parts I would want to defend in a code review: the data model, the failure cases, and the reason it was built that way."
        />

        <div className="work">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id}>
              <ProjectRow project={project} flip={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
