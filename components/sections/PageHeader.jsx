/**
 * PageHeader — the top of every interior page.
 *
 * Props:
 *   crumbs — optional [{ label, href }] trail above the title; the current
 *            page is appended as plain text
 *   title  — the page's h1
 *   body   — the paragraph beside it
 *   cta    — optional { label, href }; shown on phones only, where the
 *            form is a long scroll away
 */
export function PageHeader({ crumbs = [], title, body, cta }) {
  return (
    <section className="wrap grid page-header">
      {crumbs.length > 0 && (
        <p className="page-header__crumbs">
          {crumbs.map((c) => (
            <span key={c.href}><a href={c.href}>{c.label}</a> / </span>
          ))}
          {title}
        </p>
      )}
      <h1>{title}</h1>
      <div className="page-header__body">
        {body && <p>{body}</p>}
        {cta && <a href={cta.href} className="btn">{cta.label}</a>}
      </div>
    </section>
  )
}
