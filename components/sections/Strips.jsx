'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * ClientsStrip — Technologies logo row
 *
 * Props:
 *   label   — e.g. "Trusted By"
 *   clients — array of strings (replace with <img> when logos available)
 */
export function ClientsStrip({ label = 'Trusted By', clients = [] }) {
  const ref = useScrollReveal()

  return (
    <div className="clients reveal" ref={ref}>
      <div className="clients-inner">
        <div className="clients-label">{label}</div>
        <div className="clients-logos">
          {clients.map((c) => (
            <div key={c} className="client-placeholder">{c}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * BrandsStrip — At Home brand partner row
 *
 * Props:
 *   label  — e.g. "Brands We Work With"
 *   brands — array of strings
 */
export function BrandsStrip({ label = 'Brands We Work With', brands = [] }) {
  const ref = useScrollReveal()

  return (
    <div className="brands reveal" ref={ref}>
      <div className="brands-inner">
        <div className="brands-label">{label}</div>
        <div className="brands-list">
          {brands.map((b) => (
            <div key={b} className="brand-name">{b}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
