'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { appendLeadCaptureIfMissing } from './chat-widget-state'

const WELCOME = "Hi, I'm Zephyrus, the Atropos Technologies assistant. Ask me anything about our services, or tell me about your technology challenge."

function playChime(ctx) {
  try {
    // Two-note soft chime: C5 then E5
    const notes = [523.25, 659.25]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq

      const env = ctx.createGain()
      const start = ctx.currentTime + i * 0.18
      env.gain.setValueAtTime(0, start)
      env.gain.linearRampToValueAtTime(0.18, start + 0.02)
      env.gain.exponentialRampToValueAtTime(0.0001, start + 0.7)

      osc.connect(env)
      env.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.7)
    })
  } catch {
    // Fail silently
  }
}

/**
 * ChatWidget
 *
 * Props:
 *   apiEndpoint — where to POST chat messages (default: '/api/chat')
 *   contactEndpoint — where to POST lead captures (default: '/api/contact')
 */
export function ChatWidget({
  apiEndpoint = '/api/chat',
  contactEndpoint = '/api/contact',
}) {
  const [open, setOpen]           = useState(false)
  const [msgs, setMsgs]           = useState([{ id: 0, role: 'assistant', content: WELCOME }])
  const [input, setInput]         = useState('')
  const [streaming, setStreaming] = useState(false)
  const [unread, setUnread]       = useState(true)
  const [leadShown, setLeadShown] = useState(false)

  const bottomRef      = useRef(null)
  const inputRef       = useRef(null)
  const streamingIdRef = useRef(null)
  const audioCtxRef    = useRef(null)

  const userCount = msgs.filter((m) => m.role === 'user').length

  // Unlock AudioContext on first user gesture so the chime is allowed to play
  useEffect(() => {
    if (typeof window === 'undefined') return
    const unlock = () => {
      if (audioCtxRef.current) return
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      // Resume in case browser created it in 'suspended' state
      ctx.resume().catch(() => {})
      audioCtxRef.current = ctx
    }
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, unlock))
  }, [])

  // Auto-open once, 5 seconds after first-ever page load
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('zephyrus_opened')) return
    const t = setTimeout(() => {
      if (audioCtxRef.current) playChime(audioCtxRef.current)
      setOpen(true)
      localStorage.setItem('zephyrus_opened', '1')
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  // Inject lead capture card after 4th user message, with a short delay
  useEffect(() => {
    if (userCount >= 4 && !leadShown && !streaming) {
      const t = setTimeout(() => {
        setLeadShown(true)
        setMsgs((prev) => appendLeadCaptureIfMissing(prev))
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [userCount, leadShown, streaming])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return

    const userMsg = { id: Date.now(), role: 'user', content: text }
    // Snapshot conversation history (exclude UI-only rows) for the API
    const history = msgs
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map(({ role, content }) => ({ role, content }))

    setMsgs((prev) => [...prev, userMsg])
    setInput('')
    setStreaming(true)

    const botId = Date.now() + 1
    streamingIdRef.current = botId
    setMsgs((prev) => [...prev, { id: botId, role: 'assistant', content: '' }])

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: text }] }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const { content, error, showLeadCapture } = await res.json()

      if (error) throw new Error(error)

      setMsgs((prev) => {
        const updated = prev.map((m) => (m.id === botId ? { ...m, content: content ?? '' } : m))
        return showLeadCapture ? appendLeadCaptureIfMissing(updated) : updated
      })

      if (showLeadCapture) setLeadShown(true)
    } catch (err) {
      console.error('[chat widget]', err?.message)
      setMsgs((prev) =>
        prev.map((m) =>
          m.id === botId
            ? { ...m, content: `Error: ${err?.message ?? 'unknown'}` }
            : m
        )
      )
    } finally {
      streamingIdRef.current = null
      setStreaming(false)
    }
  }, [input, streaming, msgs, apiEndpoint])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="chat-widget">
      {/* ── Panel ──────────────────────────────────────────── */}
      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`} aria-hidden={!open}>
        <div className="chat-panel-header">
          <div className="chat-panel-title">
            <span className="chat-panel-dot" aria-hidden="true" />
            <span>Zephyrus</span>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="chat-messages" role="log" aria-live="polite">
          {msgs.map((msg) => {
            if (msg.role === 'lead-capture') {
              return <LeadCapture key={msg.id} contactEndpoint={contactEndpoint} />
            }
            return (
              <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
                {msg.role === 'assistant' && msg.content === '' && streaming
                  ? <span className="chat-typing"><span /><span /><span /></span>
                  : <MarkdownText text={msg.content} />
                }
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a question…"
            disabled={streaming}
            aria-label="Chat message"
          />
          <button
            className="chat-send"
            onClick={send}
            disabled={streaming || !input.trim()}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Bubble ─────────────────────────────────────────── */}
      <button
        className="chat-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {unread && !open && <span className="chat-unread" aria-hidden="true" />}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M2 16.5C2 18.433 3.567 20 5.5 20H16.5C18.433 20 20 18.433 20 16.5V5.5C20 3.567 18.433 2 16.5 2H5.5C3.567 2 2 3.567 2 5.5V16.5Z" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M7 8h8M7 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </div>
  )
}

// ── Lead capture form ──────────────────────────────────────
function LeadCapture({ contactEndpoint }) {
  const [fields, setFields]   = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone]       = useState(false)

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: false }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!fields.firstName.trim()) errs.firstName = true
    if (!fields.lastName.trim())  errs.lastName  = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = true
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    try {
      await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: fields.firstName,
          lastName:  fields.lastName,
          email:     fields.email,
          phone:     fields.phone,
          message:   fields.message.trim() || 'Chat widget lead — requested follow-up.',
          channel:   'Technologies-Zephyrus',
          brand:     'tech',
        }),
      })
      setDone(true)
    } catch {
      setSending(false)
    }
  }

  return (
    <div className="chat-lead">
      {done ? (
        <p className="chat-lead-done">Got it — we&apos;ll be in touch shortly.</p>
      ) : (
        <>
          <p className="chat-lead-prompt">Want us to follow up? Leave your details.</p>
          <form className="chat-lead-form" onSubmit={handleSubmit} noValidate>
            <input
              className={`chat-lead-field${errors.firstName ? ' invalid' : ''}`}
              placeholder="First name"
              value={fields.firstName}
              onChange={set('firstName')}
              autoComplete="given-name"
            />
            <input
              className={`chat-lead-field${errors.lastName ? ' invalid' : ''}`}
              placeholder="Last name"
              value={fields.lastName}
              onChange={set('lastName')}
              autoComplete="family-name"
            />
            <input
              className={`chat-lead-field${errors.email ? ' invalid' : ''}`}
              placeholder="Email address"
              type="email"
              value={fields.email}
              onChange={set('email')}
              autoComplete="email"
            />
            <input
              className="chat-lead-field"
              placeholder="Phone (optional)"
              type="tel"
              value={fields.phone}
              onChange={set('phone')}
              autoComplete="tel"
            />
            <textarea
              className="chat-lead-field chat-lead-textarea"
              placeholder="Anything specific you'd like to discuss? (optional)"
              value={fields.message}
              onChange={set('message')}
              rows={3}
            />
            <button className="chat-lead-submit" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

// ── Minimal inline markdown renderer (bold, links, line breaks) ──
function MarkdownText({ text }) {
  if (!text) return null

  // Split on newlines first, then process each line
  return (
    <>
      {text.split('\n').map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {renderInline(line)}
        </span>
      ))}
    </>
  )
}

function renderInline(text) {
  // Match **bold**, [label](href), and bare https?:// URLs
  const parts = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s<>)"]+)/g
  let last = 0
  let m

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(<strong key={m.index}>{m[1]}</strong>)
    } else {
      const href = m[3] ?? m[4]
      const label = m[2] ?? m[4]
      const isExternal = /^https?:\/\//.test(href) && !href.includes('atropostechnologies.com.au')
      parts.push(
        <a
          key={m.index}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}
