'use client'

import { useEffect, useState } from 'react'

/**
 * useNavScroll
 * Returns true when the page has scrolled past the threshold.
 * Use to add a solid background to the fixed nav.
 */
export function useNavScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
