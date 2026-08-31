'use client'

import { useTheme } from '../../lib/theme-context'

/**
 * Footer
 *
 * Props:
 *   logo          — img src string
 *   tagline       — tagline text (italic serif on At Home)
 *   location      — e.g. "Hobart, Tasmania"
 *   columns       — array of { heading, links: [{ label, href }] }
 *   copyright     — copyright string
 *   sisterLabel   — e.g. "Sister company:"
 *   sisterName    — e.g. "Atropos ↗"
 *   sisterHref    — link to sister site
 */
export function Footer({
  brand = 'home',
  logo,
  tagline,
  location,
  columns = [],
  copyright,
  sisterLabel,
  sisterName,
  sisterHref,
  social = true,
}) {
  const isHome = brand === 'home'

  const topClass    = isHome ? 'footer-top-home'    : 'footer-top'
  const logoClass   = isHome ? 'footer-logo-home'   : 'footer-logo'
  const taglineClass = isHome ? 'footer-tagline-home' : 'footer-tagline'
  const headingClass = isHome ? 'footer-heading-home' : 'footer-heading'
  const linksClass  = isHome ? 'footer-links-home'  : 'footer-links'
  const bottomClass = isHome ? 'footer-bottom-home' : 'footer-bottom'
  const copyClass   = isHome ? 'footer-copy-home'   : 'footer-copy'
  const sisterClass = isHome ? 'footer-sister-home' : 'footer-sister'

  return (
    <footer>
      <div className={topClass}>
        <div>
          <div className={logoClass}>
            <img src={logo} alt="Atropos logo" />
          </div>
          <p className={taglineClass}>{tagline}</p>
          {location && (
            <span style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.3em',
              color: isHome ? 'rgba(201,185,154,0.4)' : 'var(--gum)',
              textTransform: 'uppercase',
            }}>
              {location}
            </span>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <div className={headingClass}>{col.heading}</div>
            <ul className={linksClass}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={bottomClass}>
        <span className={copyClass}>{copyright}</span>
        {sisterName && (
          <span className={sisterClass}>
            {sisterLabel && <>{sisterLabel} </>}
            <a href={sisterHref}>{sisterName}</a>
          </span>
        )}
        {social && (
          <div className="footer-social">
            <a href="https://www.facebook.com/atroposptyltd" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/atroposptyltd" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
