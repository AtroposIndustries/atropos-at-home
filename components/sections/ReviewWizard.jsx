'use client'

import { useState } from 'react'

// ── Sentence banks — Atropos at Home (home) ──────────────

const HOME_HIGHLIGHTS = [
  { id: 'smart_home',      label: 'Smart home design',        group: 'thread' },
  { id: 'audio',           label: 'Audio quality',            group: 'thread' },
  { id: 'finish',          label: 'Installation finish',      group: 'thread' },
  { id: 'home_theatre',    label: 'Home theatre experience',  group: 'thread' },
  { id: 'pm',              label: 'Project management',       group: 'thread' },
  { id: 'communication',   label: 'Communication',            group: 'highlight' },
  { id: 'professionalism', label: 'Professionalism',          group: 'highlight' },
  { id: 'detail',          label: 'Attention to detail',      group: 'highlight' },
  { id: 'expertise',       label: 'Technical expertise',      group: 'highlight' },
  { id: 'support',         label: 'Ongoing support',          group: 'highlight' },
]

const HOME_OPENINGS = {
  5: [
    'We couldn\'t be more impressed with what the Atropos at Home team has created for us.',
    'Genuinely exceptional work — the kind of result you hope for but rarely get.',
    'The finished result has exceeded every expectation we had going in.',
    'From the first consultation to final handover, this was a first-class experience.',
    'Our home has been completely transformed, and we couldn\'t be happier.',
  ],
  4: [
    'Really pleased with how the project came together from start to finish.',
    'A very positive experience and a beautiful result overall.',
    'The team delivered exactly what they promised, and the quality shows.',
    'Happy with how everything turned out — a professional team who knows their craft.',
  ],
  3: [
    'A good overall experience with some real highlights along the way.',
    'Generally positive — the quality of the work was solid.',
    'A decent outcome from a team that clearly knows what they\'re doing.',
    'Reasonable experience overall with some genuinely impressive moments.',
  ],
  2: [
    'Mixed experience on the whole.',
    'Some things impressed us, though not everything met expectations.',
    'There were positives, but also a few things that could have gone better.',
  ],
  1: [
    'Unfortunately not the experience we were hoping for.',
    'A disappointing outcome on the whole.',
  ],
}

const HOME_SENTENCES = {
  smart_home: [
    'The smart home system they designed is intuitive and genuinely transforms daily life.',
    'The automation is invisible until you need it — exactly how good smart home should feel.',
    'Every element of the smart home design was tailored to how we actually live.',
  ],
  audio: [
    'The sound quality throughout the house is extraordinary — we couldn\'t believe the difference.',
    'Whole-home audio that sounds incredible in every room, at any volume.',
    'The audio system is simply stunning — our guests always comment on it.',
  ],
  finish: [
    'The installation is impeccably neat — no visible cabling, everything seamlessly integrated.',
    'Every detail of the installation is finished beautifully, as if it were always part of the house.',
    'The install quality is exceptional — clean, precise, and completely discreet.',
  ],
  home_theatre: [
    'Our home theatre is beyond anything we imagined — the experience is genuinely cinematic.',
    'The home theatre design and calibration is extraordinary; it\'s become our favourite room.',
    'A truly immersive cinema experience that the whole family loves.',
  ],
  communication: [
    'Communication throughout the project was clear, consistent and always prompt.',
    'They kept us fully informed at every stage without us ever needing to follow up.',
    'The team was always available and responsive — a level of communication we rarely experience.',
  ],
  professionalism: [
    'Every person involved in the project was professional, respectful and a pleasure to deal with.',
    'The team\'s professionalism made the whole process smooth and completely stress-free.',
    'From the design team through to the installers, the professionalism was consistent throughout.',
  ],
  detail: [
    'The attention to detail is evident in every aspect of the finished result.',
    'They sweated the small things as much as the big things — the result speaks for itself.',
    'Every detail was considered and executed with real care and precision.',
  ],
  expertise: [
    'The depth of technical knowledge the team brought to the project was genuinely impressive.',
    'It\'s clear the team are true experts — they advised us brilliantly at every decision point.',
    'The technical expertise gave us complete confidence throughout the entire process.',
  ],
  pm: [
    'Project management was excellent — on time, on budget, and clearly communicated throughout.',
    'The project ran like clockwork from design through to commissioning.',
    'They managed the entire project with real precision, coordinating all trades seamlessly.',
  ],
  support: [
    'Post-installation support has been excellent — they remain just as responsive now as during the build.',
    'Any follow-up queries have been handled quickly and professionally.',
    'Ongoing support has been everything you\'d hope for after a significant investment.',
  ],
}

const HOME_CLOSINGS = {
  5: [
    'Unreservedly recommend Atropos at Home to anyone investing in premium technology for their home.',
    'Without hesitation — the finest smart home and AV team we\'ve encountered.',
    'We\'ll be recommending them to every architect and homeowner we know.',
  ],
  4: [
    'Would happily recommend them to anyone looking for quality residential AV or smart home work.',
    'A great result from a professional team — well worth considering.',
    'Genuinely good people doing genuinely good work.',
  ],
  3: [
    'Would consider them again for future work.',
    'A solid option for residential AV and smart home in the area.',
  ],
  2: [
    'May consider them again given some improvements in communication.',
    'Worth a consultation, but clarify expectations upfront.',
  ],
  1: [
    'Would be hesitant to recommend based on our experience.',
    'Hopefully others have a better outcome.',
  ],
}

// ── Helpers ───────────────────────────────────────────────

const STAR_LABELS = ['', 'Poor', 'Below average', 'Average', 'Good', 'Excellent']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildReview(rating, highlights, openings, sentences, closings) {
  const opening = pick(openings[rating] ?? openings[3])
  const closing = pick(closings[rating] ?? closings[3])
  const shuffled = [...highlights].sort(() => Math.random() - 0.5).slice(0, 3)
  const body = shuffled
    .filter(id => sentences[id])
    .map(id => pick(sentences[id]))
  return [opening, ...body, closing].join(' ')
}

// ── Component ─────────────────────────────────────────────

/**
 * ReviewWizard
 *
 * A 3-step wizard that helps a customer compose a Google review:
 *   1. Star rating
 *   2. Multi-select highlights (brand-appropriate options)
 *   3. Generated review text + copy + Google link
 *
 * Props:
 *   googleReviewUrl  — the Google Business review URL for this brand
 */
export function ReviewWizard({ googleReviewUrl = '#' }) {
  const highlights = HOME_HIGHLIGHTS
  const openings   = HOME_OPENINGS
  const sentences  = HOME_SENTENCES
  const closings   = HOME_CLOSINGS

  const [step,       setStep]       = useState(1)
  const [rating,     setRating]     = useState(0)
  const [hovered,    setHovered]    = useState(0)
  const [selected,   setSelected]   = useState([])
  const [reviewText, setReviewText] = useState('')
  const [copied,     setCopied]     = useState(false)

  function toggleHighlight(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    )
  }

  function generate() {
    setStep(3)
    setReviewText(buildReview(rating, selected, openings, sentences, closings))
  }

  function regenerate() {
    setReviewText(buildReview(rating, selected, openings, sentences, closings))
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(reviewText)
    } catch {
      const el = document.querySelector('.review-output')
      if (el) { el.select(); document.execCommand('copy') }
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const displayRating = hovered || rating

  return (
    <div className="review-wizard">

      {/* ── Step dots ─────────────────────────── */}
      <div className="review-steps" aria-label="Progress">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`review-step-dot ${step >= n ? 'active' : ''} ${step === n ? 'current' : ''}`}
            aria-current={step === n ? 'step' : undefined}
          />
        ))}
      </div>

      {/* ── Step 1: Star rating ───────────────── */}
      {step === 1 && (
        <div className="review-panel">
          <p className="review-step-label">Step 1 of 3</p>
          <h2 className="review-panel-title">
            How would you rate your experience?
          </h2>
          <p className="review-panel-body">
            Tap a star to choose your overall rating.
          </p>

          <div
            className="review-stars"
            onMouseLeave={() => setHovered(0)}
            role="radiogroup"
            aria-label="Star rating"
          >
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                className={`review-star ${displayRating >= n ? 'lit' : ''}`}
                onMouseEnter={() => setHovered(n)}
                onClick={() => setRating(n)}
                aria-label={`${n} star${n !== 1 ? 's' : ''}`}
                aria-pressed={rating === n}
                type="button"
              >
                ★
              </button>
            ))}
          </div>

          {displayRating > 0 && (
            <p className="review-star-label">{STAR_LABELS[displayRating]}</p>
          )}

          {rating > 0 && (
            <div className="review-actions review-actions--right">
              <button
                className="review-btn-primary"
                onClick={() => setStep(2)}
                type="button"
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Step 2: Highlights ────────────────── */}
      {step === 2 && (
        <div className="review-panel">
          <p className="review-step-label">Step 2 of 3</p>
          <h2 className="review-panel-title">Tell us about your experience</h2>
          <p className="review-panel-body">
            Select everything that applies. Your choices shape the suggested text.
          </p>

          <div className="review-highlight-section">
            <p className="review-highlight-heading">Our threads</p>
            <div className="review-highlights" role="group" aria-label="Service threads">
              {highlights.filter(h => h.group === 'thread').map(h => (
                <button
                  key={h.id}
                  className={`review-chip ${selected.includes(h.id) ? 'selected' : ''}`}
                  onClick={() => toggleHighlight(h.id)}
                  aria-pressed={selected.includes(h.id)}
                  type="button"
                >
                  {selected.includes(h.id) && (
                    <span className="review-chip-tick">✓</span>
                  )}
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div className="review-highlight-section">
            <p className="review-highlight-heading">What stood out</p>
            <div className="review-highlights" role="group" aria-label="What stood out">
              {highlights.filter(h => h.group === 'highlight').map(h => (
                <button
                  key={h.id}
                  className={`review-chip ${selected.includes(h.id) ? 'selected' : ''}`}
                  onClick={() => toggleHighlight(h.id)}
                  aria-pressed={selected.includes(h.id)}
                  type="button"
                >
                  {selected.includes(h.id) && (
                    <span className="review-chip-tick">✓</span>
                  )}
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div className="review-actions">
            <button
              className="review-btn-ghost"
              onClick={() => { setStep(1); setSelected([]) }}
              type="button"
            >
              ← Back
            </button>
            <button
              className={`review-btn-primary ${selected.length === 0 ? 'disabled' : ''}`}
              onClick={selected.length > 0 ? generate : undefined}
              disabled={selected.length === 0}
              type="button"
            >
              Build my review →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Review text ───────────────── */}
      {step === 3 && (
        <div className="review-panel">
          <p className="review-step-label">Step 3 of 3</p>
          <h2 className="review-panel-title">Your review is ready</h2>
          <p className="review-panel-body">
            Copy this text, then paste it when Google asks for your review. Feel free to edit it first.
          </p>

          <textarea
            className="review-output"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            rows={6}
            aria-label="Suggested review text"
            spellCheck
          />

          <p className="review-hint">
            Not quite right?{' '}
            <button className="review-regen-inline" onClick={regenerate} type="button">
              Try a different version
            </button>
            {' '}or edit the text above.
          </p>

          <div className="review-actions">
            <button
              className={`review-btn-ghost ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              disabled={!reviewText}
              type="button"
            >
              {copied ? '✓ Copied!' : 'Copy text'}
            </button>
            <a
              className="review-btn-primary"
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave review on Google →
            </a>
          </div>

          <button
            className="review-regenerate"
            onClick={() => setStep(2)}
            type="button"
          >
            ← Change my selections
          </button>
        </div>
      )}
    </div>
  )
}
