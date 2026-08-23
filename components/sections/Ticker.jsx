'use client'

/**
 * Ticker
 * Horizontally scrolling marquee strip.
 *
 * Props:
 *   items — array of strings
 */
export function Ticker({ items = [] }) {
  const doubled = [...items, ...items]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
