'use client'

import { useState } from 'react'
import { useNavScroll } from '../../hooks/useNavScroll'

/**
 * Nav
 *
 * Props:
 *   brand     — 'tech' | 'home'
 *   logo      — img src string or JSX element
 *   links     — array of { label, href }
 *               or { label, children: [{ label, href, desc? }] } for dropdowns
 *   ctaLabel  — CTA button text
 *   ctaHref   — CTA button href
 */
export function Nav({ brand = 'home', logo, links = [], ctaLabel, ctaHref = '#contact' }) {
  const scrolled = useNavScroll()
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [openIndex, setOpenIndex]     = useState(null)

  const toggleDrawer    = () => setDrawerOpen((o) => !o)
  const closeDrawer     = () => { setDrawerOpen(false); setOpenIndex(null) }
  const toggleAccordion = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <>
      {/* ── Mobile Drawer ──────────────────────────────── */}
      <div
        className={`nav-drawer${drawerOpen ? ' open' : ''}`}
        style={{ display: drawerOpen ? 'flex' : 'none' }}
        aria-hidden={!drawerOpen}
      >
        {links.map((link, i) =>
          link.children ? (
            <div key={link.label} className="nav-drawer-group">
              <div className={`nav-drawer-parent${openIndex === i ? ' open' : ''}`}>
                {link.href ? (
                  <a href={link.href} onClick={closeDrawer}>{link.label}</a>
                ) : (
                  <span>{link.label}</span>
                )}
                <button
                  className="nav-drawer-chevron-btn"
                  onClick={() => toggleAccordion(i)}
                  aria-expanded={openIndex === i}
                  aria-label={`Toggle ${link.label}`}
                >
                  <span className="nav-drawer-chevron" aria-hidden="true">+</span>
                </button>
              </div>
              <div className={`nav-drawer-children${openIndex === i ? ' open' : ''}`}>
                {link.children.map((child) => (
                  <a key={child.href} href={child.href} onClick={closeDrawer}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a key={link.href} href={link.href} onClick={closeDrawer}>
              {link.label}
            </a>
          )
        )}
        {ctaLabel && (
          <a
            href={ctaHref}
            onClick={closeDrawer}
            className={brand === 'home' ? 'btn-warm nav-drawer-cta' : 'btn-primary nav-drawer-cta'}
          >
            {brand === 'tech' ? <span>{ctaLabel}</span> : ctaLabel}
          </a>
        )}
      </div>

      {/* ── Main Nav ───────────────────────────────────── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nav-logo" aria-label="Atropos home">
          {typeof logo === 'string' ? (
            <img src={logo} alt="Atropos logo" />
          ) : (
            logo
          )}
        </a>

        <ul className="nav-links" aria-label="Primary navigation">
          {links.map((link) =>
            link.children ? (
              <li key={link.label} className="nav-item nav-item--has-dropdown">
                {link.href ? (
                  <a href={link.href} className="nav-link-btn" aria-haspopup="true">
                    {link.label}
                    <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </a>
                ) : (
                  <button className="nav-link-btn" aria-haspopup="true">
                    {link.label}
                    <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
                <div className="nav-dropdown" role="menu">
                  {link.children.map((child) => (
                    <a key={child.href} href={child.href} className="nav-dropdown-item" role="menuitem">
                      <span className="nav-dropdown-label">{child.label}</span>
                      {child.desc && <span className="nav-dropdown-desc">{child.desc}</span>}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.href} className="nav-item">
                <a href={link.href}>{link.label}</a>
              </li>
            )
          )}
        </ul>

        {ctaLabel && (
          <a href={ctaHref} className="nav-cta">
            {ctaLabel}
          </a>
        )}

        <button
          className={`nav-toggle${drawerOpen ? ' open' : ''}`}
          onClick={toggleDrawer}
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}
