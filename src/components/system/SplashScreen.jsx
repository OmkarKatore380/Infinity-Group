import { useEffect, useState } from 'react'
import BrandLogo from '../BrandLogo.jsx'

export default function SplashScreen({ visible = false }) {
  const [show, setShow] = useState(visible)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      setFade(false)
      const timer = setTimeout(() => setFade(true), 2500)
      const off = setTimeout(() => setShow(false), 3200)
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
      className={`fixed inset-0 z-50 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-[700ms] ease-out`}
    >
      <div className="absolute inset-0 bg-[#f8fafc]" />
      <div className="absolute inset-0 bg-architect opacity-[0.08]" />
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
      <div className="relative h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-slow-float">
            <BrandLogo size={120} />
          </div>
          <h1 className="mt-6 text-2xl md:text-3xl font-semibold text-[#0f172a] tracking-tight animate-fade-in">
            Infinity Group
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#334155] animate-fade-in" style={{ animationDelay: '150ms' }}>
            Built With Precision
          </p>
          <div className="mt-6 h-0.5 w-40 bg-gradient-to-r from-transparent via-[#0f172a] to-transparent relative overflow-hidden rounded">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-white/40 translate-x-[-100%] animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}
