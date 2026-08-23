'use client'

import { useState } from 'react'
import { useTheme } from '../../lib/theme-context'

// ── Sentence banks — Technologies (tech) ─────────────────

const TECH_HIGHLIGHTS = [
  { id: 'advisory',        label: 'Advisory & Strategy',          group: 'thread' },
  { id: 'cloud',           label: 'Cloud & Modern Workplace',     group: 'thread' },
  { id: 'managed',         label: 'Managed Services',             group: 'thread' },
  { id: 'security',        label: 'Security & Compliance',        group: 'thread' },
  { id: 'av_collab',       label: 'Audiovisual & Collaboration',  group: 'thread' },
  { id: 'communication',   label: 'Responsive communication',     group: 'highlight' },
  { id: 'expertise',       label: 'Technical expertise',          group: 'highlight' },
  { id: 'delivery',        label: 'On-time delivery',             group: 'highlight' },
  { id: 'pricing',         label: 'Competitive pricing',          group: 'highlight' },
  { id: 'professionalism', label: 'Professionalism',              group: 'highlight' },
  { id: 'explanations',    label: 'Clear explanations',           group: 'highlight' },
  { id: 'installation',    label: 'Quality of installation',      group: 'highlight' },
  { id: 'av',              label: 'AV systems & design',          group: 'highlight' },
  { id: 'it',              label: 'IT infrastructure',            group: 'highlight' },
  { id: 'support',         label: 'Ongoing support',              group: 'highlight' },
]

const TECH_OPENINGS = {
  5: [
    'Could not be happier with the result — exceptional service from start to finish.',
    'Genuinely one of the best technology partners we\'ve worked with.',
    'Five stars doesn\'t quite capture how pleased we are with the outcome.',
    'Outstanding work from a team that clearly takes pride in what they do.',
    'Absolutely first-class service, and the results speak for themselves.',
  ],
  4: [
    'Really pleased with how our project came together with the Atropos team.',
    'A very positive experience from start to finish.',
    'Solid, professional service and a great outcome overall.',
    'Very happy with the result — the team delivered on everything they promised.',
    'A smooth process and a quality result. Really happy with how it went.',
  ],
  3: [
    'A good experience overall with some genuine highlights.',
    'Decent service and a competent team who knew what they were doing.',
    'Generally positive — there were things that stood out along the way.',
    'A reasonable experience on the whole.',
  ],
  2: [
    'Mixed experience on balance.',
    'Some positives, but room for improvement in a few areas.',
    'There were things to appreciate, though not everything went smoothly.',
  ],
  1: [
    'A disappointing experience overall.',
    'Unfortunately not what we were hoping for.',
  ],
}

const TECH_SENTENCES = {
  advisory: [
    'Their advisory work gave us a clear technology roadmap and the confidence to execute it.',
    'The strategic guidance they provided was practical, well-considered, and aligned to where our business is heading.',
    'They took the time to understand our goals before making recommendations — the advice was genuinely valuable.',
  ],
  cloud: [
    'The migration to cloud and modern workplace tools was seamless — minimal disruption and a noticeably better outcome.',
    'Our move to Microsoft 365 and cloud infrastructure was handled with real care and expertise.',
    'The modern workplace transformation has made a tangible difference to how our team works day to day.',
  ],
  managed: [
    'Having Atropos manage our IT environment has removed a significant burden from our internal team.',
    'The managed services are proactive rather than reactive — issues are often resolved before we even notice them.',
    'Our managed IT experience has been consistently responsive and reliable.',
  ],
  security: [
    'They took our security and compliance posture seriously and delivered a meaningful improvement across the board.',
    'The security work gave us genuine confidence that our environment is well-protected and audit-ready.',
    'Their approach to security was thorough — they identified gaps we hadn\'t considered and addressed them properly.',
  ],
  av_collab: [
    'The audiovisual and collaboration setup has transformed the way our team communicates and presents.',
    'Our meeting rooms and collaboration spaces are now genuinely enjoyable to use — the AV work is exceptional.',
    'The AV and collaboration systems they designed are intuitive, reliable, and exactly what our team needed.',
  ],
  communication: [
    'They were incredibly responsive throughout — never had to chase anyone for an update.',
    'Communication at every stage was clear and proactive, which made the whole process far less stressful.',
    'The team kept us in the loop at every turn and always responded promptly to questions.',
  ],
  expertise: [
    'The technical expertise on display was impressive — they clearly know their craft inside out.',
    'Every person we dealt with demonstrated real depth of knowledge in their field.',
    'The level of technical knowledge across the team was evident from the very first consultation.',
  ],
  delivery: [
    'The project was delivered on time and exactly as agreed — no surprises, no delays.',
    'Everything was completed to the agreed schedule, which was refreshing to see.',
    'They delivered what they promised, when they promised it.',
  ],
  pricing: [
    'Pricing was competitive and completely transparent — no hidden costs or surprises at the end.',
    'The quote was accurate to the final invoice, which speaks to their professionalism.',
    'Very competitive on price without any compromise on quality.',
  ],
  professionalism: [
    'Every interaction was professional and courteous from start to finish.',
    'The team carried themselves with real professionalism throughout the engagement.',
    'From the initial consultation through to handover, the professionalism was consistent.',
  ],
  explanations: [
    'They explained everything in plain language — no unnecessary jargon, just clear guidance.',
    'Technical concepts were explained clearly and patiently, which we really appreciated.',
    'They took the time to explain what they were doing and why, which gave us real confidence.',
  ],
  installation: [
    'The installation work was incredibly tidy — everything routed neatly and labelled clearly.',
    'The quality of the installation was outstanding; it\'s obvious they take pride in the finish.',
    'Clean, professional installation with everything documented properly at handover.',
  ],
  av: [
    'The AV setup has completely transformed the way we use our space.',
    'The audiovisual work is exceptional — the quality and finish exceeded our expectations.',
    'Our new AV environment works exactly as we needed it to, and it looks fantastic.',
  ],
  it: [
    'The IT infrastructure they put in place is solid, well-documented, and easy to manage.',
    'The new IT setup has made a real difference to day-to-day operations.',
    'The infrastructure work was thorough and built to last.',
  ],
  support: [
    'The ongoing support has been reliable and genuinely helpful — issues get resolved quickly.',
    'Post-installation support has been excellent; they\'re still responsive long after the job was done.',
    'Their after-sales support is the kind you actually hope for — responsive and effective.',
  ],
}

const TECH_CLOSINGS = {
  5: [
    'Highly recommend Atropos to any business looking for a technology partner they can genuinely rely on.',
    'Would not hesitate to recommend them, and will absolutely be working with them again.',
    'If you\'re looking for an IT or AV partner that delivers, look no further.',
  ],
  4: [
    'Would recommend them to businesses looking for reliable IT or AV support.',
    'Happy to recommend Atropos to other local businesses.',
    'A reliable team delivering quality work — well worth considering for your next project.',
  ],
  3: [
    'Would work with them again for the right project.',
    'A reasonable option for IT or AV services in the area.',
  ],
  2: [
    'May consider them again with better communication next time.',
    'Worth a conversation, but manage expectations upfront.',
  ],
  1: [
    'Would be hesitant to recommend based on our experience.',
    'Hopefully others have a better outcome.',
  ],
}

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
  const brand  = useTheme()
  const isHome = brand === 'home'

  const highlights = isHome ? HOME_HIGHLIGHTS : TECH_HIGHLIGHTS
  const openings   = isHome ? HOME_OPENINGS   : TECH_OPENINGS
  const sentences  = isHome ? HOME_SENTENCES  : TECH_SENTENCES
  const closings   = isHome ? HOME_CLOSINGS   : TECH_CLOSINGS

  const [step,       setStep]       = useState(1)
  const [rating,     setRating]     = useState(0)
  const [hovered,    setHovered]    = useState(0)
  const [selected,   setSelected]   = useState([])
  const [reviewText, setReviewText] = useState('')
  const [copied,     setCopied]     = useState(false)
  const [generating, setGenerating] = useState(false)

  function toggleHighlight(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    )
  }

  async function callLLM() {
    const threads    = highlights.filter(h => h.group === 'thread'    && selected.includes(h.id)).map(h => h.label)
    const standouts  = highlights.filter(h => h.group === 'highlight' && selected.includes(h.id)).map(h => h.label)

    const res = await fetch('/api/review', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, threads, highlights: standouts, brand }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const { content, error } = await res.json()
    if (error) throw new Error(error)
    return content
  }

  async function generate() {
    setStep(3)
    setReviewText('')
    setGenerating(true)
    try {
      const text = await callLLM()
      setReviewText(text)
    } catch {
      setReviewText(buildReview(rating, selected, openings, sentences, closings))
    } finally {
      setGenerating(false)
    }
  }

  async function regenerate() {
    setReviewText('')
    setGenerating(true)
    try {
      const text = await callLLM()
      setReviewText(text)
    } catch {
      setReviewText(buildReview(rating, selected, openings, sentences, closings))
    } finally {
      setGenerating(false)
    }
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

          {generating ? (
            <div className="review-generating">
              <span className="review-generating-dot" /><span className="review-generating-dot" /><span className="review-generating-dot" />
              <span className="review-generating-label">Writing your review…</span>
            </div>
          ) : (
            <textarea
              className="review-output"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={6}
              aria-label="Suggested review text"
              spellCheck
            />
          )}

          <p className="review-hint">
            Not quite right?{' '}
            <button className="review-regen-inline" onClick={regenerate} disabled={generating} type="button">
              Try a different version
            </button>
            {' '}or edit the text above.
          </p>

          <div className="review-actions">
            <button
              className={`review-btn-ghost ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              disabled={generating || !reviewText}
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
