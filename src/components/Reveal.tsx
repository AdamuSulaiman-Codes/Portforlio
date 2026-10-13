import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger offset in milliseconds. Keep steps around 80–100ms. */
  delay?: number
  className?: string
}

/**
 * Fades and lifts its children once they scroll into view. Content is visible
 * immediately when the user prefers reduced motion, and if IntersectionObserver
 * is unavailable the animation is skipped rather than leaving content hidden.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-shown={shown}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
