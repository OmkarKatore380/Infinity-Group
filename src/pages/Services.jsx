import { useState } from 'react'
import services from '../data/services.json'

export default function Services() {
  const [open, setOpen] = useState(null)

  return (
    <div className="container-pro py-16">
      <h1 className="heading-lg">Services</h1>
      <p className="text-slate-700 mt-2 max-w-2xl">
        Minimal, structured, and reliable — tailored for residential, commercial, and renovation requirements.
      </p>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="mt-8 grid grid-cols-1 gap-6">
          {services.map((s) => (
            <div key={s.key} className="rounded-lg border border-slate-200 bg-white shadow-card">
              <div className="p-6">
                <div className="w-10 h-10 rounded bg-navy/10 grid place-items-center max-md:w-8 max-md:h-8">
                  <span className="text-navy font-bold max-md:text-sm">{s.icon.toUpperCase().slice(0,1)}</span>
                </div>
                <h3 className="heading-md mt-4 max-md:text-xl">{s.title}</h3>
                <p className="text-slate-700 mt-2 max-md:text-sm">{s.description}</p>
                <button
                  className="btn-outline mt-4 max-md:text-sm max-md:px-4 max-md:py-2"
                  onClick={() => setOpen((o) => (o === s.key ? null : s.key))}
                >
                  {open === s.key ? 'Hide Details' : 'Learn More'}
                </button>
              </div>
              <div className={`border-t border-slate-200 overflow-hidden transition-all duration-300 ${open === s.key ? 'max-h-40' : 'max-h-0'}`}>
                <div className="p-6 text-slate-700 max-md:p-4 max-md:text-sm">
                  Detailed scope, compliance checklist, and deliverables preview. UI placeholder for future CMS.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Carousel - Hidden on desktop */}
      <div className="block md:hidden">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {services.map((s) => (
            <div 
              key={s.key} 
              className="min-w-[85vw] snap-center rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/10 grid place-items-center">
                <span className="text-navy font-bold text-lg">{s.icon.toUpperCase().slice(0,1)}</span>
              </div>
              <h3 className="text-2xl font-semibold text-navy mt-4">{s.title}</h3>
              <p className="text-slate-700 mt-2 leading-relaxed">{s.description}</p>
              <button
                className="btn-outline mt-4 text-sm px-4 py-2"
                onClick={() => setOpen((o) => (o === s.key ? null : s.key))}
              >
                {open === s.key ? 'Hide Details' : 'Learn More'}
              </button>
              <div className={`border-t border-white/40 overflow-hidden transition-all duration-300 ${open === s.key ? 'max-h-40 mt-4' : 'max-h-0 mt-0'}`}>
                <div className="p-4 text-slate-700 text-sm">
                  Detailed scope, compliance checklist, and deliverables preview. UI placeholder for future CMS.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
