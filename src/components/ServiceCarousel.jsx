import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import services from "../data/services.json"

export default function ServiceCarousel() {
  const [active, setActive] = useState(0)

  const items = useMemo(() => {
    return services.map((s) => ({
      ...s,
      slug:
        s.slug ||
        s.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }))
  }, [])

  const CARD_W = 460
  const CARD_H = 520

  function next() {
    setActive((i) => (i + 1) % items.length)
  }

  function prev() {
    setActive((i) => (i - 1 + items.length) % items.length)
  }

  // Reveal Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      } 
    }
  }

  function getStyle(index) {
    const diff = index - active
    const total = items.length
    let pos = diff
    if (diff > total / 2) pos -= total
    if (diff < -total / 2) pos += total

    const base = {
      position: "absolute",
      width: CARD_W,
      height: CARD_H,
      transition: "all 700ms cubic-bezier(.22,1,.36,1)"
    }

    if (pos === 0)
      return { ...base, transform: `translateX(0px) scale(1) rotateY(0deg)`, zIndex: 5, opacity: 1, filter: "blur(0px)" }
    if (pos === 1)
      return { ...base, transform: `translateX(${CARD_W * 0.9}px) scale(.85) rotateY(-18deg)`, zIndex: 4, opacity: 1, filter: "blur(0px)" }
    if (pos === -1)
      return { ...base, transform: `translateX(-${CARD_W * 0.9}px) scale(.85) rotateY(18deg)`, zIndex: 4, opacity: 1, filter: "blur(0px)" }
    if (pos === 2)
      return { ...base, transform: `translateX(${CARD_W * 1.6}px) scale(.7) rotateY(-25deg)`, zIndex: 3, opacity: .6, filter: "blur(2px)" }
    if (pos === -2)
      return { ...base, transform: `translateX(-${CARD_W * 1.6}px) scale(.7) rotateY(25deg)`, zIndex: 3, opacity: .6, filter: "blur(2px)" }

    return { ...base, transform: `translateX(${pos * CARD_W}px) scale(.6)`, opacity: 0, zIndex: 1 }
  }

  return (
    <section className="relative bg-transparent py-16 overflow-hidden">
      <motion.div 
        className="max-w-[1600px] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="text-center mb-16">
            <h2
              className="uppercase text-slate-900 text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide max-md:text-3xl"
              style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif" }}
            >
              SERVICES
            </h2>
            <p className="text-slate-600 text-xl md:text-2xl italic mt-3 max-md:text-lg">
              Premium offerings built for growth.
            </p>
          </div>

          <div
            className="relative flex items-center justify-center"
            style={{ height: 600, perspective: "2000px" }}
          >
            {items.map((s, i) => {
              const style = getStyle(i)
              const isActive = i === active
              return (
                <div
                  key={s.slug || i}
                  style={{
                    ...style,
                    borderRadius: 22,
                    padding: 36,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.18)",
                    borderTop: isActive ? "2px solid #E25822" : "none"
                  }}
                >
                  <div style={{ height: 240, borderRadius: 16, background: "linear-gradient(135deg,#e9ecef,#f8f9fa)" }} />
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold max-md:text-xl">{s.title}</h3>
                    <p className="mt-3 text-slate-700 leading-relaxed max-md:text-sm">{s.shortDesc || s.description}</p>
                    <div className="mt-6">
                      <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-300 bg-white hover:bg-orange-500 hover:text-white transition shadow max-md:px-4 max-md:py-2">
                        <span className="max-md:text-sm">Learn More</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center gap-10 mt-8">
            <button onClick={prev} className="h-14 w-14 rounded-full border border-slate-300 bg-white hover:bg-orange-500 hover:text-white shadow-lg flex items-center justify-center max-md:h-12 max-md:w-12 transition-colors">◀</button>
            <button onClick={next} className="h-14 w-14 rounded-full border border-slate-300 bg-white hover:bg-orange-500 hover:text-white shadow-lg flex items-center justify-center max-md:h-12 max-md:w-12 transition-colors">▶</button>
          </div>
        </div>

        {/* Mobile Layout - Hidden on desktop */}
        <div className="block md:hidden">
          <div className="text-center mb-12">
            <h2
              className="uppercase text-slate-900 text-3xl font-bold tracking-wide"
              style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif" }}
            >
              SERVICES
            </h2>
            <p className="text-slate-600 text-lg italic mt-3">
              Premium offerings built for growth.
            </p>
          </div>

          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 py-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {items.map((s, i) => (
              <motion.div
                key={s.slug || i}
                className="min-w-[85vw] snap-center rounded-3xl bg-white/80 backdrop-blur-lg border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
              >
                <div className="h-48 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-700 leading-relaxed text-sm">{s.shortDesc || s.description}</p>
                  <div className="mt-6">
                    <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition shadow">
                      <span className="text-sm">Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
