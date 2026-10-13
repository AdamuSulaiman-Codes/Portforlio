import { PROFILE } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>
          © {year} {PROFILE.name}
        </p>
        <div className="footer__links">
          <a href={`mailto:${PROFILE.email}`}>Email</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  )
}
