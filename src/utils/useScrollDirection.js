import { useEffect, useState } from 'react'

export default function useScrollDirection(threshold = 6) {
  const [direction, setDirection] = useState('up')
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      const diff = Math.abs(y - lastY)
      if (diff >= threshold) {
        setDirection(y > lastY ? 'down' : 'up')
        setLastY(y)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY, threshold])

  return direction
}
