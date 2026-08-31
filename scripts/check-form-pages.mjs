/**
 * Fails the build if a page renders ContactForm but its route is not in
 * FORM_ROUTES — which is what docs/LAUNCH.md tells a human to register in
 * Zoho. An unregistered page still creates leads; it just never confirms
 * them to the visitor, and nothing on the site says so.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { FORM_ROUTES } from '../lib/routes.js'

const APP = 'app'

// Next.js's default `pageExtensions` — a future page.js or page.tsx must not
// silently bypass this guard the way a literal 'page.jsx' match would.
const PAGE_FILE = /^page\.(js|jsx|ts|tsx)$/

function pageFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) pageFiles(full, found)
    else if (PAGE_FILE.test(entry)) found.push(full)
  }
  return found
}

const problems = []

for (const file of pageFiles(APP)) {
  if (!readFileSync(file, 'utf8').includes('<ContactForm')) continue
  const dir   = relative(APP, file).split(sep).slice(0, -1).join('/')
  const route = dir ? `/${dir}` : ''
  if (!FORM_ROUTES.includes(route)) problems.push({ file, route })
}

if (problems.length) {
  console.error('\nPages render ContactForm but are not in FORM_ROUTES:\n')
  for (const p of problems) console.error(`  ${p.file}  ->  route "${p.route}"`)
  console.error('\nAdd them to lib/routes.js with form: true, then register')
  console.error('their URLs in Zoho (Setup > Channels > Webforms > Form')
  console.error('Location URL). See docs/LAUNCH.md.\n')
  process.exit(1)
}

console.log(`form-page guard: ${FORM_ROUTES.length} form routes, all registered`)
