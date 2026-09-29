import { LinkList }  from './LinkList'
import { CaseStudy } from './CaseStudy'

/**
 * IndustryBody — everything between an industry page's header and its
 * contact form (spec 2026-09-30-industries, decision 4): what we do for
 * this industry, a typical job in three steps, and the case study slot.
 *
 * Props:
 *   services  — { title, items: [{ name, desc, href }] }
 *   steps     — { title, items: [{ title, body }] }
 *   backLink  — { label, href } beside the services heading
 *   caseStudy — see CaseStudy.jsx; null renders nothing
 */
export function IndustryBody({ services, steps, backLink, caseStudy }) {
  return (
    <>
      <section className="section section--tint">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">{services.title}</h2>
            {backLink && <a href={backLink.href} className="text-link">{backLink.label}</a>}
          </div>
          <LinkList items={services.items.map((s) => ({ label: s.name, desc: s.desc, href: s.href }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h2 section-head">{steps.title}</h2>
          <ol className="steps">
            {steps.items.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CaseStudy study={caseStudy} />
    </>
  )
}
