export function appendLeadCaptureIfMissing(messages) {
  if (messages.some((message) => message.role === 'lead-capture')) return messages
  return [...messages, { id: Date.now(), role: 'lead-capture' }]
}
