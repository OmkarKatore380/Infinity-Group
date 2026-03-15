import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollReveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px", once: false });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial={{ opacity: 0, y: 140, scale: 0.9, filter: "blur(8px)" }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)"
            }
          : {
              opacity: 0,
              y: -120,
              scale: 0.92,
              filter: "blur(6px)"
            }
      }
      exit={{
        opacity: 0,
        y: -120,
        scale: 0.95
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.6
      }}
      whileInView={{
        y: 0
      }}
    >
      {children}
    </motion.div>
  );
}
