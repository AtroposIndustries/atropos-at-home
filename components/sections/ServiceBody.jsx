/**
 * Intro — a service page's opening statement, optionally followed by steps.
 *
 * Props:
 *   title — h2
 *   body  — string; blank lines ("\n\n") separate paragraphs
 *   steps — optional [{ title, body }]
 */
export function Intro({ title, body = '', steps = [] }) {
  return (
    <section className="wrap grid intro">
      <h2 className="h2">{title}</h2>
      <div className="intro__body">
        {body.split(/\n\s*\n/).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>
      {steps.length > 0 && (
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

/**
 * FeatureList — what goes into the service, as a two-column ruled list.
 *
 * Props:
 *   title   — section heading
 *   items   — [{ title, desc }]
 *   backLink — optional { label, href } shown beside the heading
 */
export function FeatureList({ title = 'What goes into it', items = [], backLink }) {
  return (
    <section className="section section--tint">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">{title}</h2>
          {backLink && <a href={backLink.href} className="text-link">{backLink.label}</a>}
        </div>
        <ul className="features">
          {items.map((f) => (
            <li key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
