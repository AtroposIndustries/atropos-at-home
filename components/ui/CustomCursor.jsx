'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef     = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    const cursor     = cursorRef.current
    const cursorRing = cursorRingRef.current
    if (!cursor || !cursorRing) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top  = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      cursorRing.style.left = ringX + 'px'
      cursorRing.style.top  = ringY + 'px'
      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      cursorRing.style.width        = '56px'
      cursorRing.style.height       = '56px'
      cursorRing.style.borderColor  = 'rgba(222,224,219,0.6)'
    }

    const onLeave = () => {
      cursorRing.style.width        = '32px'
      cursorRing.style.height       = '32px'
      cursorRing.style.borderColor  = 'rgba(222,224,219,0.4)'
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor"      ref={cursorRef}     />
      <div className="cursor-ring" ref={cursorRingRef} />
    </>
  )
}