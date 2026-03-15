import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import testimonials from "../data/testimonials.json"

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[index]

  return (
    <div className="fixed bottom-6 left-6 z-[999] w-[340px] md:w-[400px] max-md:bottom-20 max-md:left-4 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: -100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-auto group"
        >
          {/* Futuristic Glass Widget with Intense #FF4433 Glow */}
          <div className="bg-white/20 backdrop-blur-[30px] border border-white/40 rounded-2xl p-5 shadow-[0_0_50px_rgba(255,68,51,0.5)] hover:shadow-[0_0_70px_rgba(255,68,51,0.7)] transition-all duration-500 max-md:p-4">
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-start">
              
              {/* Profile Side - High Visibility */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative p-0.5 rounded-full border border-white/50">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover shadow-xl max-md:w-12 max-md:h-12"
                  />
                  {/* Live Pulse Indicator */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full max-md:w-3 max-md:h-3">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                  </span>
                </div>
                
                {/* Architectural Rating */}
                <div className="flex gap-0.5 text-[#FFD700] text-[9px] mt-3 tracking-tighter max-md:text-[8px]">
                  ◆ ◆ ◆ ◆ ◆
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] max-md:text-[10px]">
                    {t.name}
                  </h4>
                  <span className="text-[8px] text-white/50 font-mono tracking-widest bg-white/10 px-2 py-0.5 rounded max-md:text-[7px] max-md:px-1 max-md:py-0.5">
                    VERIFIED
                  </span>
                </div>

                {/* Feedback Quote */}
                <p className="text-white text-xs md:text-sm font-medium leading-relaxed italic line-clamp-4 max-md:text-xs">
                  "{t.quote}"
                </p>
              </div>
            </div>

            {/* Bottom Tech Bar (Visualizer + Progress) */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-[#FF4433]"
                />
              </div>
              
              {/* Micro Visualizer */}
              <div className="flex gap-0.5 items-end h-3">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["30%", "100%", "30%"] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    className="w-1 bg-white/60 rounded-full"
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
