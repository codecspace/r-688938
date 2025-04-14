
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      {/* Main progress bar with enhanced glassmorphism */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
        className="bg-gradient-to-r from-lion-gold via-lion-lightgold to-amber-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.7)]"
      />
      
      {/* Enhanced glow effect underneath */}
      <motion.div
        style={{
          position: "fixed",
          top: 4,
          left: 0,
          right: 0,
          height: "2px",
          transformOrigin: "0%",
          zIndex: 999,
          scaleX: scrollYProgress,
          filter: "blur(3px)"
        }}
        className="bg-lion-gold/60"
      />
      
      {/* Subtle shimmer animation */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          transformOrigin: "0%",
          zIndex: 1001,
          scaleX: scrollYProgress,
          opacity: 0.5
        }}
        className="glass-shimmer"
      />
    </>
  );
};

export default ScrollProgress;
