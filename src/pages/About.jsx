export default function About() {
  return (
    <div className="container-pro py-16">
      <h1 className="heading-lg">About Infinity Group</h1>
      <p className="text-slate-700 mt-2 max-w-3xl">
        Nagpur-based construction company focused on delivering reliable mid-segment 2 & 3 BHK developments with
        structured processes, certified materials, and transparent communication.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6">
        {['Reliable Delivery', 'Structured Processes', 'Certified Materials'].map((t, i) => (
          <div key={i} className="rounded-md border border-slate-200 bg-white p-6 shadow-card max-md:p-4">
            <h3 className="heading-md max-md:text-xl">{t}</h3>
            <p className="text-slate-700 mt-2 max-md:text-sm">Premium B2B discipline aligned to safety-first construction.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
