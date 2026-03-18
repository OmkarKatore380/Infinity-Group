import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = [
    {
      title: "Quality Construction",
      description: "We use premium materials and follow strict quality standards to ensure every structure stands the test of time.",
      image: "Quality-const.jpeg",
    },
    {
      title: "On-time Delivery",
      description: "Punctuality is our hallmark. We employ advanced project management to ensure your home is ready exactly when promised.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Experienced Team",
      description: "Our engineers and architects bring decades of combined expertise to deliver structural precision and innovative designs.",
      image: "team.jpeg",
    },
    {
      title: "Transparent",
      description: "No hidden costs or fine print. We maintain clear communication and integrity through every phase of development.",
      image: "transparent.jpeg",
    }
  ];

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [2000, 4000], [0, -30]);

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle at 20% 20%, #ffffff, #f1f5f9)" }}
      />

      <div className="relative max-w-7xl mx-auto backdrop-blur-md bg-white/30 border border-white/20 rounded-[40px] p-8 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.1 }}
          className="text-center mb-24"
        >
          <h2 className="uppercase text-slate-900 text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
            style={{ fontFamily: "'Bebas Neue','Impact','Arial Black',sans-serif", lineHeight: 1.1 }}>
            Why Choose Us ?
          </h2>
          <div className="w-16 h-1 bg-[#FF4433] mx-auto mt-4"></div>
          <p className="text-slate-600 text-xl md:text-2xl italic mt-6 max-w-3xl mx-auto">
            Built on trust, engineered with precision, and delivered with uncompromising quality.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-24 px-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* --- MOBILE VIEW (UNTOUCHED) --- */}
              <div className="md:hidden bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-950 text-slate-200">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
              </div>

              {/* --- DESKTOP ZIGZAG VIEW --- */}
              <div className={`hidden md:flex items-center gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* Image Section */}
                <motion.div
                  style={{ y: imageY }}
                  className="w-[45%] h-64 overflow-hidden rounded-2xl shadow-xl border-4 border-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{ filter: hoveredIndex === index ? "grayscale(0%)" : "grayscale(100%)" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                {/* Animated Arrow with Heading */}
                <motion.div
                  className="relative flex items-center justify-center min-w-[220px]"
                  animate={{ 
                    x: index % 2 === 0 ? (hoveredIndex === index ? 15 : 0) : (hoveredIndex === index ? -15 : 0) 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative flex items-center justify-center">
                    <svg
                      width="240"
                      height="60"
                      viewBox="0 0 240 60"
                      fill="none"
                      className={`${index % 2 === 0 ? '' : 'rotate-180'}`}
                    >
                      {/* Custom Arrow Shape */}
                      <path
                        d="M0 0H200L240 30L200 60H0L40 30L0 0Z"
                        fill="#FF4433"
                      />
                    </svg>
                    {/* Text Overlay (No rotation for text) */}
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs uppercase tracking-tighter px-8 text-center leading-none">
                      {item.title}
                    </span>
                  </div>
                </motion.div>

                {/* Description Box */}
                <motion.div
                  className="w-[45%] p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-slate-200 shadow-2xl relative"
                  animate={{ scale: hoveredIndex === index ? 1.02 : 1 }}
                >
                  <div className="absolute top-0 left-0 h-full w-2 bg-[#FF4433]" />
                  <p className="text-slate-300 leading-relaxed pl-2">
                    {item.description}
                  </p>
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;