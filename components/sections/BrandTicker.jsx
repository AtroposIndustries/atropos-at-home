'use client'

import { useState } from 'react'

/**
 * BrandTicker — the brand list, scrolling right to left.
 *
 * The list is rendered twice so the loop is seamless; the copy is hidden from
 * screen readers. Moving content that runs for more than five seconds needs a
 * way to stop it (WCAG 2.2.2), hence the Pause button. Reduced-motion users
 * get a static, wrapped list instead.
 *
 * Props:
 *   label  — the line before the ticker
 *   brands — array of brand names
 *   more   — optional trailing item, e.g. 'and more'
 */
export function BrandTicker({ label, brands = [], more }) {
  const [paused, setPaused] = useState(false)
  const items = more ? [...brands, more] : brands

  const list = (hidden) => (
    <ul className="ticker__list" aria-hidden={hidden || undefined}>
      {items.map((b) => (
        <li key={b} className={b === more ? 'ticker__more' : undefined}>{b}</li>
      ))}
    </ul>
  )

  return (
    <section className="brands" aria-label={label}>
      <p className="label">{label}</p>
      <div className={paused ? 'ticker is-paused' : 'ticker'}>
        <div className="ticker__track">
          {list(false)}
          {list(true)}
        </div>
      </div>
      <button
        type="button"
        className="ticker__toggle"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? 'Play' : 'Pause'}
      </button>
    </section>
  )
}
