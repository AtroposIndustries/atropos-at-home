/**
 * LinkList — services as a ruled list of links, each ending in an arrow.
 *
 * Props:
 *   items — [{ label, href?, desc? }]; any desc switches to the described
 *           layout used on the landing pages. An item without an href is a
 *           plain row with no arrow: listed before its page exists.
 */
export function LinkList({ items = [] }) {
  const described = items.some((i) => i.desc)

  return (
    <ul className={described ? 'link-list link-list--described' : 'link-list'}>
      {items.map((item) => (
        <li key={item.href ?? item.label}>
          {item.href ? (
            <a href={item.href}>
              <span className="link-list__name">{item.label}</span>
              {item.desc && <span className="link-list__desc">{item.desc}</span>}
              <Arrow />
            </a>
          ) : (
            <div className="link-list__row">
              <span className="link-list__name">{item.label}</span>
              {item.desc && <span className="link-list__desc">{item.desc}</span>}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
