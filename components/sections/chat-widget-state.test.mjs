import test from 'node:test'
import assert from 'node:assert/strict'

import { appendLeadCaptureIfMissing } from './chat-widget-state.js'

test('appends lead capture when requested and absent', () => {
  const result = appendLeadCaptureIfMissing([{ id: 1, role: 'assistant', content: 'Hello' }])

  assert.equal(result.at(-1).role, 'lead-capture')
})

test('does not duplicate an existing lead capture row', () => {
  const messages = [
    { id: 1, role: 'assistant', content: 'Hello' },
    { id: 2, role: 'lead-capture' },
  ]

  const result = appendLeadCaptureIfMissing(messages)
  assert.equal(result.filter((message) => message.role === 'lead-capture').length, 1)
})
