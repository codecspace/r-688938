
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        background: "linear-gradient(to right, #D4AF37, #F5D76E)",
        transformOrigin: "0%",
        zIndex: 1000,
        scaleX: scrollYProgress
      }}
    />
  );
};

export default ScrollProgress;
