
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      {/* Main progress bar with glassmorphism */}
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
        className="bg-gradient-to-r from-lion-gold via-lion-lightgold to-amber-300 backdrop-blur-sm shadow-[0_0_10px_rgba(212,175,55,0.5)]"
      />
      
      {/* Subtle glow effect underneath */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          transformOrigin: "0%",
          zIndex: 999,
          scaleX: scrollYProgress,
          filter: "blur(1px)"
        }}
        className="bg-lion-gold/50"
      />
    </>
  );
};

export default ScrollProgress;
