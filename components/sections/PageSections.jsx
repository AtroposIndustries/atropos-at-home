'use client'

import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'

/* ── StatRow ──────────────────────────────────────────────── */
/**
 * Props:
 *   stats — array of { num, label, desc? }
 */
export function StatRow({ stats = [] }) {
  const ref = useScrollReveal()
  return (
    <div className="stat-row" ref={ref}>
      {stats.map((s) => (
        <div key={s.label} className="stat-block reveal">
          <div className="stat-block-num">{s.num}</div>
          <div className="stat-block-label">{s.label}</div>
          {s.desc && <div className="stat-block-desc">{s.desc}</div>}
        </div>
      ))}
    </div>
  )
}

/* ── FeatureRow ───────────────────────────────────────────── */
/**
 * Props:
 *   features — array of { icon (JSX), title, desc }
 */
export function FeatureRow({ features = [] }) {
  const ref = useScrollReveal()
  return (
    <div className="feature-row" ref={ref}>
      {features.map((f) => (
        <div key={f.title} className="feature-item reveal">
          {f.icon && (
            <div className="feature-item-icon" aria-hidden="true">{f.icon}</div>
          )}
          <div className="feature-item-title">{f.title}</div>
          <p className="feature-item-desc">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── TeamGrid ─────────────────────────────────────────────── */
/**
 * Props:
 *   members — array of { name, role, bio, imgSrc? }
 */
export function TeamGrid({ members = [] }) {
  const ref = useScrollReveal()
  return (
    <div className="team-grid" ref={ref}>
      {members.map((m) => (
        <div key={m.name} className="team-card reveal">
          <div
            className="team-card-img"
            style={m.imgSrc ? {
              backgroundImage: `url(${m.imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {}}
          />
          <div className="team-card-name">{m.name}</div>
          <div className="team-card-role">{m.role}</div>
          <p className="team-card-bio">{m.bio}</p>
        </div>
      ))}
    </div>
  )
}

/* ── PullQuote ────────────────────────────────────────────── */
/**
 * Props:
 *   quote       — quote text
 *   attribution — attribution string
 */
export function PullQuote({ quote, attribution }) {
  const ref = useScrollReveal()
  return (
    <div className="pull-quote reveal" ref={ref}>
      <p>&quot;{quote}&quot;</p>
      {attribution && <cite>— {attribution}</cite>}
    </div>
  )
}

/* ── FAQ ──────────────────────────────────────────────────── */
/**
 * Props:
 *   items — array of { question, answer }
 */
export function FAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useScrollReveal()

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="faq" ref={ref}>
      {items.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {item.question}
            <span className="faq-icon" aria-hidden="true">+</span>
          </button>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── SectionIntro ─────────────────────────────────────────── */
/**
 * Full-width intro block for inner pages.
 * Props:
 *   label     — eyebrow
 *   title     — JSX heading
 *   body      — paragraph
 *   variant   — 'dark' | 'raised'
 */
export function SectionIntro({ label, title, body, variant = 'dark', labelVariant }) {
  const ref = useScrollReveal()
  const cls = variant === 'raised' ? 'section-raised' : 'section-dark'

  return (
    <section className={cls} ref={ref}>
      <div className="section-intro">
        {label && (
          <SectionLabel variant={labelVariant} style={{ marginBottom: '24px' }}>{label}</SectionLabel>
        )}
        {title && <h2 className="section-title reveal">{title}</h2>}
        {body && (
          <p className="reveal" style={{
            fontSize: 'var(--text-md)',
            color: 'var(--text-secondary)',
            lineHeight: 1.9,
            maxWidth: '680px',
            marginTop: '24px',
          }}>
            {body}
          </p>
        )}
      </div>
    </section>
  )
}

/* ── SectionSplit ─────────────────────────────────────────── */
/**
 * Two-column text/media split.
 * Props:
 *   left      — JSX for left column
 *   right     — JSX for right column
 *   variant   — 'dark' | 'raised'
 *   reverse   — boolean, swaps columns on desktop
 */
export function SectionSplit({ left, right, variant = 'dark', reverse = false }) {
  const ref = useScrollReveal()
  const cls = variant === 'raised' ? 'section-raised' : 'section-dark'

  return (
    <section
      className={`section-split ${cls}`}
      ref={ref}
      style={reverse ? { direction: 'rtl' } : {}}
    >
      <div style={reverse ? { direction: 'ltr' } : {}}>{left}</div>
      <div style={reverse ? { direction: 'ltr' } : {}}>{right}</div>
    </section>
  )
}
