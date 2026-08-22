import { shotFor } from '../data/screenshots'
import type { Project } from '../data/content'

const KEYWORDS = new Set([
  'public', 'private', 'protected', 'static', 'final', 'void', 'class', 'interface',
  'return', 'if', 'else', 'new', 'throw', 'try', 'catch', 'for', 'while', 'const',
  'let', 'var', 'async', 'await', 'export', 'import', 'from', 'function', 'extends',
  'implements', 'String', 'boolean', 'int', 'long', 'double', 'def', 'true', 'false',
  'null', 'this', 'CheckInResult', 'Ticket', 'Entry', 'Category', 'Update', 'Event',
])

interface Tok {
  cls: 'cm' | 'str' | 'kw' | 'pl'
  text: string
}

function tokenize(line: string): Tok[] {
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@\w+)|(\s+)|(\S+)/g
  const out: Tok[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(line)) !== null) {
    const [full] = m
    if (m[1]) out.push({ cls: 'cm', text: full })
    else if (m[2]) out.push({ cls: 'str', text: full })
    else if (m[3]) out.push({ cls: 'kw', text: full })
    else if (m[4]) out.push({ cls: 'pl', text: full })
    else out.push({ cls: KEYWORDS.has(full) ? 'kw' : 'pl', text: full })
  }
  return out
}

function CodeFeed({ path, lines }: { path: string; lines: string[] }) {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="td" />
        <span className="td" />
        <span className="td" />
        <span className="tpath">{path}</span>
      </div>
      <div className="term-body">
        {lines.map((ln, i) => (
          <span className="ln" key={i}>
            {ln === '' ? '\u00a0' : tokenize(ln).map((t, j) => (
              <span key={j} className={t.cls}>
                {t.text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Screenshot({ slug, name }: { slug: string; name: string }) {
  const src = shotFor(slug)
  if (src) {
    return <img className="shot-img" src={src} alt={`Screenshot of ${name}`} loading="lazy" />
  }
  return (
    <div className="shot-placeholder" role="img" aria-label={`Screenshot slot for ${name}. Add ${slug}.png to src/assets/screenshots to display it.`}>
      <span className="shot-label">[SCREENSHOT PENDING]</span>
      <span className="shot-hint">drop {slug}.png into src/assets/screenshots/</span>
    </div>
  )
}

export function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <article className="project-card reveal" data-tilt>
      <div className="pc-left">
        <div className="pc-index">INVENTION / {String(index + 1).padStart(2, '0')}</div>
        <h3>{p.name}</h3>
        <div className="pc-stack">
          {p.stack.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <ul className="pc-points">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        <a className="repo-link" href={p.repo} target="_blank" rel="noreferrer">
          <span className="repo-arrow" aria-hidden="true">▸</span> [REPO LINK TBD]
        </a>
      </div>
      <div className="pc-right">
        <div className="inv-display">
          <div className="inv-titlebar">
            <span>CAM {String(index + 1).padStart(2, '0')} · {p.name.toUpperCase()}</span>
            <span className="rec-dot" aria-hidden="true" />
          </div>
          <Screenshot slug={p.slug} name={p.name} />
        </div>
        {p.code && <CodeFeed path={p.code.path} lines={p.code.lines} />}
      </div>
    </article>
  )
}
