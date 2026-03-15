import { useRef } from "react"

export default function MagneticButton({ children }) {

  const ref = useRef(null)

  function handleMove(e) {

    const rect = ref.current.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width/2
    const y = e.clientY - rect.top - rect.height/2

    ref.current.style.transform =
      `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  function reset() {
    ref.current.style.transform = "translate(0px,0px)"
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md text-white tracking-wider transition-transform duration-200"
    >
      {children}
    </button>
  )
}