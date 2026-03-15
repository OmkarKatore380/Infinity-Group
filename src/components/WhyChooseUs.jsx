import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Smooth transition settings - using easeOut for a sleek entrance
const smoothTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1], // Standard "cubic-bezier" for premium UI
  duration: 0.9
};

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: smoothTransition }
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: smoothTransition }
};

const WhyChooseUs = () => {
  const data = [
    {
      title: "Quality Construction",
      description: "We use premium materials and follow strict quality standards to ensure every structure stands the test of time.",
      image: "Quality-const.jpeg",
      isRight: true
    },
    {
      title: "On-time Delivery",
      description: "Punctuality is our hallmark. We employ advanced project management to ensure your home is ready exactly when promised.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      isRight: false
    },
    {
      title: "Experienced Team",
      description: "Our engineers and architects bring decades of combined expertise to deliver structural precision and innovative designs.",
      image: "team.jpeg",
      isRight: true
    },
    {
      title: "Transparent",
      description: "No hidden costs or fine print. We maintain clear communication and integrity through every phase of development.",
      image: "transparent.jpeg",
      isRight: false
    }
  ];

  const { scrollY } = useScroll();
  // Reduced the parallax range slightly to prevent "stuck" sensations
  const imageY = useTransform(scrollY, [2000, 4000], [0, -30]);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-slate-50">
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

        <div className="space-y-16">
          {data.map((item, index) => (
            <motion.div
              key={index}
              layout // Helps with smooth layout shifts
              variants={item.isRight ? slideLeft : slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1, margin: "-100px" }} // margin helps trigger earlier
              className="flex flex-col items-center gap-0 group"
            >
              <motion.div
                style={{ y: imageY }}
                className="w-full h-64 overflow-hidden rounded-2xl shadow-xl z-10 border-4 border-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              <div
                className="relative h-16 flex items-center justify-center px-10 text-white font-bold text-xl shadow-xl z-20 w-full max-w-md"
                style={{ 
                  background: '#FF4433',
                  clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                }}
              >
                <span className="uppercase tracking-tight text-center">{item.title}</span>
              </div>

              <div className="w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-slate-200 border border-white/10 shadow-inner relative overflow-hidden">
                <p className="text-lg leading-relaxed font-light text-center">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;