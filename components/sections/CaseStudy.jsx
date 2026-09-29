/**
 * CaseStudy — one real job, told briefly. Renders nothing without one.
 *
 * Every industry page has a slot for this (spec 2026-09-30-industries). It
 * stays empty on the live site until there is a real project to put in it:
 * no placeholders, no invented clients. To fill it, set CASE_STUDY in the
 * page's content.js:
 *
 *   export const CASE_STUDY = {
 *     label:  'From a venue we have worked with',
 *     client: 'The venue name and suburb',        // with their permission
 *     body:   'What was not working, what we did, and what changed.',
 *     quote:  'Optional: a line from the client, in their words.',
 *     image:  { src, alt, width, height },        // optional, a real photo
 *   }
 */
export function CaseStudy({ study }) {
  if (!study) return null

  return (
    <section className="section">
      <div className="wrap grid case-study">
        <div className="case-study__body">
          <p className="label">{study.label}</p>
          {study.client && <h2 className="h3">{study.client}</h2>}
          <p className="lead">{study.body}</p>
          {study.quote && <blockquote className="pull">&ldquo;{study.quote}&rdquo;</blockquote>}
        </div>
        {study.image && (
          <img src={study.image.src} alt={study.image.alt} width={study.image.width} height={study.image.height} loading="lazy" />
        )}
      </div>
    </section>
  )
}
