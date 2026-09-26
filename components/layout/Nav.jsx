'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PHONE_DISPLAY, PHONE_TEL } from '../../lib/site.js'

const LOGO = '/img/atropos-logo-ink.svg'

/** '/residential/home-theatre/' and '/residential/home-theatre' are the same page. */
const clean = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/**
 * Nav — sticky site header, and the full-screen menu that replaces it on phones.
 *
 * Props:
 *   links     — array of { label, href } or { label, href, children: [{ label, href }] }
 *   ctaLabel  — the "Get in touch" link text
 *   ctaHref   — where it goes; every page carries #contact
 */
export function Nav({ links = [], ctaLabel = 'Get in touch', ctaHref = '#contact' }) {
  const [open, setOpen] = useState(false)
  const pathname  = clean(usePathname() ?? '/')
  const toggleRef = useRef(null)
  const menuRef   = useRef(null)
  const wasOpen   = useRef(false)

  const isCurrent = (href) => clean(href) === pathname
  const inSection = (href) => href !== '/' && (pathname === clean(href) || pathname.startsWith(`${clean(href)}/`))

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)

    if (open) {
      // The panel itself, not Close: a tap should not leave a focus ring on the button.
      menuRef.current?.focus()
    } else if (wasOpen.current) {
      toggleRef.current?.focus()
    }
    wasOpen.current = open

    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="wrap site-header__inner">
          <a href="/" className="site-logo" aria-label="Atropos home">
            <img src={LOGO} alt="" width="150" height="24" />
          </a>

          <nav className="site-nav" aria-label="Primary">
            <ul>
              {links.map((link) => (
                <li key={link.label} className="site-nav__item">
                  <a
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    className={inSection(link.href) ? 'is-active' : undefined}
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="site-nav__dropdown">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          aria-current={isCurrent(child.href) ? 'page' : undefined}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <a href={`tel:${PHONE_TEL}`} className="site-nav__phone">{PHONE_DISPLAY}</a>
            {ctaLabel && <a href={ctaHref} className="site-nav__cta">{ctaLabel}</a>}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            Menu
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </div>
      </header>

      <div ref={menuRef} id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" tabIndex={-1} hidden={!open}>
        <div className="wrap menu__header">
          <a href="/" className="site-logo" aria-label="Atropos home" onClick={close}>
            <img src={LOGO} alt="" width="150" height="24" />
          </a>
          <button type="button" className="menu-toggle" onClick={close}>
            Close
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="wrap menu__nav" aria-label="Menu">
          {links.map((link) => (
            <div key={link.label} className="menu__group">
              <a
                href={link.href}
                className="menu__parent"
                aria-current={isCurrent(link.href) ? 'page' : undefined}
                onClick={close}
              >
                {link.label}
              </a>
              {link.children?.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  className="menu__child"
                  aria-current={isCurrent(child.href) ? 'page' : undefined}
                  onClick={close}
                >
                  {child.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="wrap menu__actions">
          {ctaLabel && <a href={ctaHref} className="btn" onClick={close}>{ctaLabel}</a>}
          <a href={`tel:${PHONE_TEL}`} onClick={close}>{PHONE_DISPLAY}</a>
          <a href="mailto:hello@atropos.com.au" onClick={close}>hello@atropos.com.au</a>
        </div>
      </div>
    </>
  )
}
