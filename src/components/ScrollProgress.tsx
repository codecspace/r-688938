
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-lion-gold to-lion-lightgold"
      style={{
        transformOrigin: "0%",
        zIndex: 1000,
        scaleX: scrollYProgress
      }}
    />
  );
};

export default ScrollProgress;
