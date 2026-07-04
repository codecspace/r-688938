
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
        className="bg-gradient-to-r from-lion-darkgold via-lion-gold to-lion-lightgold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
      />

      <motion.div
        style={{
          position: "fixed",
          top: 3,
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
    </>
  );
};

export default ScrollProgress;
