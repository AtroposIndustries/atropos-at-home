'use client'

import { usePathname } from 'next/navigation'

const clean = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/**
 * Footer
 *
 * Props:
 *   tagline    — one line under the logo
 *   columns    — array of { heading, links: [{ label, href }] }
 *   copyright  — copyright string
 */
export function Footer({ tagline, columns = [], copyright }) {
  const pathname = clean(usePathname() ?? '/')

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid site-footer__top">
          <div className="site-footer__brand">
            <img src="/img/atropos-hero-ash.svg" alt="Atropos" width="138" height="22" />
            {tagline && <p>{tagline}</p>}
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="site-footer__col">
              <p className="site-footer__heading">{col.heading}</p>
              {col.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={clean(link.href) === pathname ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span>{copyright}</span>
          <div className="site-footer__social">
            <a href="https://www.facebook.com/atroposptyltd" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/atroposptyltd" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
