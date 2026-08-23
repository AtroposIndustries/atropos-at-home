/**
 * initCircuitPulses
 * Injects a canvas into the given container and animates
 * electrical signal pulses along the architectural lines.
 *
 * Returns a cleanup function — call it in useEffect's return.
 *
 * @param {HTMLElement} container — the .hero-architecture element
 * @param {object}      options   — optional overrides
 */
export function initCircuitPulses(container, options = {}) {
  const {
    pulseColor    = 'rgba(201,185,154,',
    headColor     = 'rgba(232,217,194,',
    minOpacity    = 0.3,
    maxOpacity    = 0.4,
    glowMultiplier = 0.9,
    minInterval   = 2000,
    maxInterval   = 3000,
    longInterval  = 6000,
    longChance    = 0.15,
    burstChance   = 0.2,
  } = options

  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;'
  container.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let W, H, rafId

  function resize() {
    W = canvas.width  = container.offsetWidth
    H = canvas.height = container.offsetHeight
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })

  function getPaths() {
    return [
      { axis: 'x', fixed: 0.85, start: 0, end: 1,    color: pulseColor },
      { axis: 'x', fixed: 0.15, start: 0, end: 1,    color: pulseColor },
      { axis: 'y', fixed: 0.20, start: 0.15, end: 0.85, color: pulseColor },
      { axis: 'y', fixed: 0.80, start: 0.15, end: 0.85, color: pulseColor },
    ]
  }

  class Pulse {
    constructor(path) {
      this.path     = path
      this.progress = 0
      this.speed    = 0.0008 + Math.random() * 0.0012
      this.length   = 0.06  + Math.random() * 0.08
      this.opacity  = minOpacity + Math.random() * (maxOpacity - minOpacity)
      this.done     = false
    }

    update(delta) {
      this.progress += this.speed * delta
      if (this.progress > 1 + this.length) this.done = true
    }

    draw() {
      const p = this.path
      const steps = 40

      for (let i = 0; i < steps; i++) {
        const t = this.progress - (i / steps) * this.length
        if (t < 0 || t > 1) continue

        const fade  = 1 - (i / steps)
        const alpha = fade * fade * this.opacity * glowMultiplier

        let x, y
        if (p.axis === 'x') {
          x = (p.start + t * (p.end - p.start)) * W
          y = p.fixed * H
        } else {
          x = p.fixed * W
          y = (p.start + t * (p.end - p.start)) * H
        }

        const glowSize = i === 0 ? 6 : 3
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        grd.addColorStop(0, `${p.color}${alpha})`)
        grd.addColorStop(1, `${p.color}0)`)

        ctx.beginPath()
        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      // Sharp head dot
      if (this.progress >= 0 && this.progress <= 1) {
        let hx, hy
        if (p.axis === 'x') {
          hx = (p.start + this.progress * (p.end - p.start)) * W
          hy = p.fixed * H
        } else {
          hx = p.fixed * W
          hy = (p.start + this.progress * (p.end - p.start)) * H
        }

        ctx.beginPath()
        ctx.arc(hx, hy, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `${headColor}${this.opacity})`
        ctx.fill()
      }
    }
  }

  const pulses = []
  const schedulers = getPaths().map((path) => ({
    path,
    nextFire: 1000 + Math.random() * 3000,
  }))

  let lastTime = performance.now()

  function tick(now) {
    const delta = now - lastTime
    lastTime = now

    ctx.clearRect(0, 0, W, H)

    schedulers.forEach((s) => {
      s.nextFire -= delta
      if (s.nextFire <= 0) {
        const burst = Math.random() < burstChance ? 2 : 1
        for (let b = 0; b < burst; b++) {
          const p = new Pulse(s.path)
          p.progress = -b * 0.12
          pulses.push(p)
        }
        s.nextFire =
          Math.random() < longChance
            ? longInterval + Math.random() * 4000
            : minInterval + Math.random() * (maxInterval - minInterval)
      }
    })

    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].update(delta)
      pulses[i].draw()
      if (pulses[i].done) pulses.splice(i, 1)
    }

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)

  // Cleanup function
  return function cleanup() {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
  }
}
