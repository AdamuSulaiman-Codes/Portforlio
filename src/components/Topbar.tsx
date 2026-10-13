import { useEffect, useState } from 'react'
import { NAV_ITEMS, PROFILE } from '../data/content'
import { Close, Mail, Menu, Moon, Sun } from './Icons'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light'
}

export function Topbar() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  // Persist the theme; the initial value was already applied before paint by
  // the inline script in index.html.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('as-theme', theme)
    } catch {
      /* storage can be unavailable in private modes; the theme still applies */
    }
  }, [theme])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <header className="topbar" data-stuck={stuck}>
      <div className="wrap topbar__inner">
        <a className="brand" href="#top" aria-label={`${PROFILE.name} — back to top`}>
          <span className="brand__mark" aria-hidden="true">
            {PROFILE.initials}
          </span>
          <span className="brand__name">{PROFILE.shortName}</span>
          <span className="brand__role">{PROFILE.role}</span>
        </a>

        <nav className="nav" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} className="nav__link" href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <a className="btn btn--primary topbar__cta" href={`mailto:${PROFILE.email}`}>
            <Mail size={14} />
            Email
          </a>

          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu" id="mobile-menu">
          <div className="wrap">
            <nav aria-label="Sections">
              <ul className="mobile-menu__list">
                {NAV_ITEMS.map((item, index) => (
                  <li key={item.id}>
                    <a
                      className="mobile-menu__link"
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
