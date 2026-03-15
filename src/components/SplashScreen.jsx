import { useEffect, useState } from 'react'

export default function SplashScreen({ visible = false }) {
  const [show, setShow] = useState(visible)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      setFade(false)
      const timer = setTimeout(() => {
        setFade(true)
      }, 2500)
      const off = setTimeout(() => {
        setShow(false)
      }, 3200)
      return () => {
        clearTimeout(timer)
        clearTimeout(off)
      }
    } else {
      setFade(true)
      const off = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(off)
    }
  }, [visible])

  if (!show) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-[700ms] ease-out ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 bg-navy/95" />
      <div className="absolute inset-0 bg-architect opacity-10" />
      <div className="relative h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 grid place-items-center animate-subtle-float">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cta to-yellow-400/80 opacity-90" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Infinity Group</h1>
          <p className="text-sm text-white/80">Reliable Construction. Built for Generations.</p>
        </div>
      </div>
    </div>
  )
}
