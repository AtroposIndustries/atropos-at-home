'use client'

import { useTheme } from '../../lib/theme-context'

/**
 * Button
 *
 * variant:
 *   'primary'      — solid fill with slide reveal (Technologies)
 *   'ghost'        — text + arrow
 *   'warm'         — gold fill (At Home)
 *   'outline-warm' — ghost gold (At Home)
 *   'submit'       — form submit with loading state
 *
 * The correct styling comes from base.css + the active theme CSS.
 * This component just applies the right className.
 */
export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  loading = false,
  onClick,
  className = '',
  style,
}) {
  const brand = useTheme()

  const variantClass = {
    primary:       'btn-primary',
    ghost:         'btn-ghost',
    warm:          'btn-warm',
    'outline-warm': 'btn-outline-warm',
    submit:        'btn-submit',
  }[variant] ?? 'btn-primary'

  const classes = [variantClass, loading ? 'sending' : '', className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {(variant === 'primary' || variant === 'warm') ? <span>{children}</span> : children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} style={style}>
      {variant === 'submit' ? (
        <>
          <span className="btn-submit-text">{children}</span>
          <span className="btn-submit-sending">Sending…</span>
        </>
      ) : (variant === 'primary' || variant === 'warm') ? (
        <span>{children}</span>
      ) : (
        children
      )}
    </button>
  )
}
