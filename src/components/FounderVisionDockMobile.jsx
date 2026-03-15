import React from 'react'
import { motion } from 'framer-motion'

export default function FounderVisionDockMobile() {
  return (
    <section className="relative py-16 md:hidden">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Mobile Founder Card - Stacked Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[rgba(15,15,15,0.9)] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        >
          {/* Founder Image at Top - Centered */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow Ring */}
              <div className="absolute inset-0 w-[140px] h-[140px] rounded-full shadow-[0_0_40px_rgba(255,68,51,0.7)]"></div>
              
              {/* Circle Border */}
              <div className="relative w-[140px] h-[140px] rounded-full border-4 border-white overflow-hidden mx-auto">
                <img
                  src="/founder-image.jpg"
                  alt="Mr Ashay Nalamwar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Founder Text Content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Mr. Ashay Nalamwar
            </h3>

            <p className="text-xs tracking-[0.35em] text-[#FF6655] uppercase font-semibold mb-4">
              CO-OWNER • INFINITY GROUP
            </p>

            <p className="text-white/85 leading-relaxed text-base text-justify">
              Mr. Ashay Nalamwar (Co-Owner, Infinity Group) has always had a natural curiosity
              toward buildings and large structures since childhood. He completed his Civil
              Engineering from GH Raisoni College of Engineering and later pursued a Master's
              in Advanced Construction Management from the National Institute of Construction
              Management and Research (NICMAR).

              After working for several years in the real estate industry, he founded DNC
              Associates, a company focused on delivering quality construction, customer
              satisfaction, timely execution, and engineering excellence.

              Under his leadership, the company has delivered high-quality residential
              developments that provide families with a comfortable and holistic living
              experience.

              Outside the construction field, he enjoys spending time with family and friends
              and is also a passionate Yoga instructor. Practicing yoga helps him stay
              grounded, focused, and committed to delivering the best possible experience
              to every customer.

              His vision has always been to create value in people's lives — whether by
              building homes that families cherish or by helping individuals live healthier
              lives.
            </p>
          </div>

          {/* Signature watermark */}
          <div className="absolute bottom-4 right-6 text-white/10 text-lg font-semibold">
            ∞ Infinity Group
          </div>
        </motion.div>
      </div>
    </section>
  )
}