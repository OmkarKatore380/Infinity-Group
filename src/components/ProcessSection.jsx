import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 1. DATA: Explicitly mapped to your requirements
const processData = [
  { id: 1, title: "Consultation", description: "Understanding client vision, requirements, and project goals.", icon: "📋", side: "right" },
  { id: 2, title: "Planning & Design", description: "Architectural planning, layout design, and approvals.", icon: "📐", side: "left" },
  { id: 3, title: "Architectural Planning", description: "Detailed structural engineering and blueprint finalization.", icon: "🏗️", side: "right" },
  { id: 4, title: "Layout Design", description: "Interior spatial planning and 3D visualization of your space.", icon: "🔍", side: "left" },
  { id: 5, title: "Material Selection", description: "Selecting high-quality materials and construction standards.", icon: "💎", side: "right" },
  { id: 6, title: "Construction Execution", description: "Professional construction following engineering standards.", icon: "🔨", side: "left" }
];

const StepCard = ({ step }) => {
  const isRightSide = step.side === "right";
  const cardRef = useRef(null);

  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.25
  });

  return (
    <div
      ref={cardRef}
      className="relative w-full py-10 md:py-16 overflow-hidden"
    >
      <motion.div
        className={`flex items-center w-full px-6 md:px-0 ${
          isRightSide ? "md:justify-end" : "md:justify-start"
        }`}
        initial={{
          x: isRightSide ? 120 : -120,
          opacity: 0
        }}
        animate={
          isInView
            ? { x: 0, opacity: 1 }
            : { x: isRightSide ? 120 : -120, opacity: 0 }
        }
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20
        }}
      >

        <div
          className={`flex flex-col md:flex-row items-center gap-6 max-w-full md:max-w-[45%] ${
            isRightSide
              ? "md:flex-row"
              : "md:flex-row-reverse md:text-right"
          }`}
        >

          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {step.id}. {step.title}
            </h3>

            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              {step.description}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl flex items-center justify-center text-4xl"
          >
            {step.icon}
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

const HowWeWork = () => {
  return (
    <section className="py-24 bg-[#FF4433] relative overflow-x-hidden">
      {/* Visual Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-white/70 text-sm font-bold mb-4">
            Our Construction Process
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            How We Work
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* The Central Vertical Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/0 via-white/40 to-white/0 transform -translate-x-1/2" />

          <div className="flex flex-col">
            {processData.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;