import type { ProjectMedia as Media } from '../data/content'

type Token = { cls: 'pl' | 'cm' | 'str'; text: string }

/**
 * Two classes of emphasis only — comments and strings. Colouring every keyword
 * would fight the page's restraint, and comments are the part of a code excerpt
 * worth skimming.
 */
function highlight(lines: string[]): Token[][] {
  let inBlock = false

  return lines.map((raw) => {
    const trimmed = raw.trim()

    if (inBlock) {
      if (trimmed.includes('"""')) inBlock = false
      return [{ cls: 'str', text: raw }]
    }

    if (trimmed.startsWith('"""')) {
      if ((trimmed.match(/"""/g) ?? []).length < 2) inBlock = true
      return [{ cls: 'str', text: raw }]
    }

    if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
      return [{ cls: 'cm', text: raw }]
    }

    const tokens: Token[] = []
    const pattern = /("[^"]*"|'[^']*')/g
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(raw)) !== null) {
      if (match.index > cursor) {
        tokens.push({ cls: 'pl', text: raw.slice(cursor, match.index) })
      }
      tokens.push({ cls: 'str', text: match[0] })
      cursor = match.index + match[0].length
    }

    if (cursor < raw.length) {
      tokens.push({ cls: 'pl', text: raw.slice(cursor) })
    }

    return tokens.length ? tokens : [{ cls: 'pl', text: ' ' }]
  })
}

function CodePanel({ media }: { media: Extract<Media, { type: 'code' }> }) {
  const lines = highlight(media.lines)

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__dots" aria-hidden="true">
          <span className="code__dot" />
          <span className="code__dot" />
          <span className="code__dot" />
        </span>
        <span className="code__path">{media.path}</span>
      </div>
      <pre className="code__body" aria-label={`Excerpt from ${media.path}`}>
        {lines.map((tokens, lineIndex) => (
          <span className="code__line" key={lineIndex}>
            {tokens.map((token, tokenIndex) => (
              <span className={`tk--${token.cls}`} key={tokenIndex}>
                {token.text}
              </span>
            ))}
          </span>
        ))}
      </pre>
    </div>
  )
}

export function ProjectMedia({
  media,
  eager = false,
}: {
  media: Media
  eager?: boolean
}) {
  if (media.type === 'image') {
    return (
      <figure className="frame">
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </figure>
    )
  }

  return <CodePanel media={media} />
}
