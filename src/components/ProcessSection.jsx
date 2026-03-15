import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';

// Step component
const StepCard = ({ step, index, getStepIcon }) => {
  const isLeft = index % 2 === 0;

  const iconControls = useAnimation();
  const textControls = useAnimation();

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (isInView) {
      iconControls.start({
        x: 0,
        opacity: 1,
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.8, ease: "easeOut" }
      });

      textControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      });
    }
  }, [isInView, iconControls, textControls]);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Watermark */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-[120px] font-extrabold text-white opacity-5 pointer-events-none select-none max-md:hidden">
        {step.stepNumber.toString().padStart(2, '0')}
      </div>

      {/* Card */}
      <motion.div
        className="glass-card bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-[0_10px_40px_rgba(204,51,34,0.5)] cursor-pointer transition-all duration-300 hover:bg-white/8 hover:translate-y-[-6px] hover:shadow-[0_15px_50px_rgba(204,51,34,0.7)] w-full"
        initial={{ x: 0, opacity: 0 }}
        animate={textControls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >

        <div className="flex items-start justify-between mb-6">

          <motion.div
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl max-md:w-14 max-md:h-14"
            initial={{ x: 0, opacity: 0 }}
            animate={iconControls}
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            {getStepIcon(step.icon)}
          </motion.div>

        </div>

        <h3 className="text-2xl font-semibold text-white mb-4 max-md:text-xl">
          {step.title}
        </h3>

        <p className="text-gray-200 leading-relaxed max-md:text-sm">
          {step.description}
        </p>

      </motion.div>

      {/* Connection Dot */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-[#FF4433] z-20 max-md:hidden"
      ></div>

    </motion.div>
  );
};

const ProcessSection = () => {

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  // FIX: hooks must be at top level
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const lineControls = useAnimation();

  const lineRef = useRef(null);

  const isLineInView = useInView(lineRef, {
    once: false,
    margin: "-50% 0px -50% 0px"
  });

  useEffect(() => {
    fetchProcessSteps();
  }, []);

  useEffect(() => {

    if (isLineInView) {
      lineControls.start({
        scaleY: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    }

  }, [isLineInView, lineControls]);

  const fetchProcessSteps = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/process`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch process steps");
      }

      const data = await response.json();

      setSteps(data.slice(0, 4));

    } catch (error) {

      console.error("Error fetching process steps:", error);

    } finally {

      setLoading(false);

    }

  };

  const getStepIcon = (iconName) => {

    switch (iconName) {

      case "consultation":
        return "📋";

      case "planning":
        return "📐";

      case "materials":
        return "🏗️";

      case "construction":
        return "🔨";

      case "inspection":
        return "🔍";

      case "delivery":
        return "🏠";

      default:
        return "📋";

    }

  };

  if (loading) {

    return (
      <section className="py-32 bg-[#FF4433]">

        <div className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto mb-24">

            <p className="uppercase tracking-[0.45em] text-sm font-semibold text-white/80 mb-4">
              Our Construction Process
            </p>

            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight tracking-tight">
              How We Work
            </h2>

          </div>

        </div>

      </section>
    );
  }

  return (

    <section
      className="py-32 bg-[#FF4433] relative overflow-hidden"
      ref={containerRef}
    >

      <div className="absolute inset-0 bg-gradient-radial from-white/6 to-transparent pointer-events-none"></div>

      {/* Floating indicator */}

      <motion.div
        className="fixed right-8 top-1/2 w-32 h-32 border-2 border-white/30 rounded-full flex items-center justify-center"
        style={{
          rotate: rotate,
          y: translateY
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 border border-white/50 rounded-full"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-24">

          <p className="uppercase tracking-[0.45em] text-sm font-semibold text-white/80 mb-4">
            Our Construction Process
          </p>

          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight tracking-tight">
            How We Work
          </h2>

        </div>

        <div className="max-w-5xl mx-auto relative">

      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 top-0 w-[4px] h-full bg-white/20 transform -translate-x-1/2">
        <motion.div
          ref={lineRef}
          className="absolute top-0 left-0 w-full bg-white"
          style={{
            scaleY: 0,
            opacity: 0,
            originY: 0
          }}
          animate={lineControls}
        />
      </div>

      <div className="space-y-16 md:space-y-32">

        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            getStepIcon={getStepIcon}
          />
        ))}

      </div>

        </div>

      </div>

    </section>
  );
};

export default ProcessSection;