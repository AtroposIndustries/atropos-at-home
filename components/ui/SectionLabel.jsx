'use client'

import { useTheme } from '../../lib/theme-context'

/**
 * SectionLabel
 * Renders the correct eyebrow style based on brand:
 *   tech  → .section-label  (left-aligned with leading line)
 *   home  → .section-eyebrow (centred with flanking lines)
 *
 * You can force a variant by passing variant="label" or variant="eyebrow"
 */
export function SectionLabel({ children, variant, className = '', style }) {
  const brand = useTheme()
  const resolved = variant ?? (brand === 'home' ? 'eyebrow' : 'label')
  const cls = resolved === 'eyebrow' ? 'section-eyebrow' : 'section-label'

  return (
    <div className={`${cls} ${className}`} style={style}>
      {children}
    </div>
  )
}
