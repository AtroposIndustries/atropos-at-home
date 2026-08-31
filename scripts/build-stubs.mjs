/**
 * Generates redirect stubs for URLs that have moved.
 *
 * GitHub Pages serves a static export with no server-side redirects, so a
 * retired path needs a real file. Written into public/ before the Next build
 * so the export copies them verbatim.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { SITE_URL } from '../lib/site.js'

const MOVED = {
  'smart-home':   '/residential/smart-home',
  'home-theatre': '/residential/home-theatre',
  'audio':        '/residential/audio',
  'network':      '/residential/network',
  'acoustic':     '/residential/acoustic',
  'support':      '/residential/support',
}

const page = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>This page has moved</title>
<link rel="canonical" href="${SITE_URL}${to}/">
<script>location.replace('${SITE_URL}${to}/' + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0; url=${SITE_URL}${to}/">
<style>
  :root { color-scheme: dark }
  body { margin:0; min-height:100vh; display:flex; align-items:center;
         justify-content:center; background:#1f2e30; color:#dee0db;
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
         text-align:center; padding:24px; line-height:1.7 }
  a { color:#c9b89a }
</style>
</head>
<body>
  <main>
    <p>This page has moved.</p>
    <p><a href="${SITE_URL}${to}/">Continue to ${to}</a></p>
  </main>
</body>
</html>
`

for (const [from, to] of Object.entries(MOVED)) {
  const dir = join('public', from)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), page(to), 'utf8')
  console.log(`stub: /${from}/ -> ${to}/`)
}
