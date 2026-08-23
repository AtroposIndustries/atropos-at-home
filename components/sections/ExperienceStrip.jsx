'use client'

/**
 * ExperienceStrip
 * At Home — 4-col icon + label strip below the hero.
 *
 * Props:
 *   items — array of { icon (JSX), title, sub }
 */
export function ExperienceStrip({ items = [] }) {
  return (
    <div className="experience-strip" aria-label="Our capabilities">
      {items.map((item) => (
        <div key={item.title} className="exp-item">
          {item.icon && (
            <div className="exp-icon" aria-hidden="true">{item.icon}</div>
          )}
          <div className="exp-title">{item.title}</div>
          <div className="exp-sub">{item.sub}</div>
        </div>
      ))}
    </div>
  )
}
