import { useState } from 'react'

const faqs = [
  { q: 'Payment terms', a: 'Stage-wise payments aligned to construction milestones.' },
  { q: 'Construction timeline', a: 'Typical 24–30 months for mid-segment developments.' },
  { q: 'Warranty', a: 'Structural warranty as per industry standards; fixtures per manufacturer.' },
  { q: 'Materials used', a: 'Certified materials, documented supply chain, and audits.' }
]

export default function OurStandard() {
  const [open, setOpen] = useState(null)
  return (
    <div className="container-pro py-16">
      <h1 className="heading-lg">Our Standard</h1>
      <p className="text-slate-700 mt-2 max-w-2xl">Safety-driven processes and certifications forming our baseline standards.</p>

      <h2 className="heading-md mt-8">Safety Certifications</h2>
      <div className="mt-4 grid grid-cols-1 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3 max-md:gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B2149" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
              <span className="font-semibold text-navy max-md:text-base">Certification {i + 1}</span>
            </div>
            <p className="text-slate-700 mt-2 max-md:text-sm">Compliance and audit-ready documentation.</p>
          </div>
        ))}
      </div>

      <h2 className="heading-md mt-10">Licenses & memberships</h2>
      <div className="mt-4 grid grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4">License {i + 1}</div>
        ))}
      </div>

      <h2 className="heading-md mt-10">Industry affiliations</h2>
      <div className="mt-4 grid grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4">Affiliation {i + 1}</div>
        ))}
      </div>

      <h2 className="heading-md mt-10">FAQ</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-md border border-slate-200 bg-white">
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between"
              onClick={() => setOpen((o) => (o === i ? null : i))}
            >
              <span className="font-semibold text-navy">{f.q}</span>
              <span className="text-slate-600">{open === i ? '-' : '+'}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40' : 'max-h-0'}`}>
              <p className="px-4 pb-4 text-slate-700">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
