'use client'

import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to all .reveal elements inside
 * the ref'd container, adding .visible when they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <section ref={ref}>
 *     <div className="reveal">...</div>
 *   </section>
 */
export function useScrollReveal(threshold = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    container.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
