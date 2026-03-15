export default function BrandLogo({ className = '', size = 40 }) {
  const src = '/logo.png'
  const plate = size + 20
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: plate, height: plate }}>
      <span className="absolute inset-0 rounded-full bg-white/80 blur-md" aria-hidden="true" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-white/20 to-transparent blur-xl" aria-hidden="true" />
      <div className="relative inline-flex items-center justify-center rounded-full bg-white ring-1 ring-slate-200 shadow-2xl shadow-blue-900/10">
        <img
          src={src}
          width={size}
          height={size}
          alt="Infinity Group logo"
          className="object-contain rounded-full"
        />
      </div>
    </div>
  )
}
