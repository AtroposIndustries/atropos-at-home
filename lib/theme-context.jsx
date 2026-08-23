'use client'

import { createContext, useContext } from 'react'

/**
 * ThemeContext
 * Provides brand identity ('tech' | 'home' | 'industries') to
 * every component in the tree. Set once in the app's root layout.
 */

const ThemeContext = createContext('home')

export function ThemeProvider({ brand, children }) {
  return (
    <ThemeContext.Provider value={brand}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

/**
 * Brand-aware class helper.
 * Returns the right class string for the current brand.
 *
 * Usage:
 *   const cls = useBrandClass()
 *   <button className={cls({ tech: 'btn-primary', home: 'btn-warm' })} />
 */
export function useBrandClass() {
  const brand = useTheme()
  return (map) => map[brand] ?? map.home ?? ''
}
