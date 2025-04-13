
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setShowButton(v > 0.1);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 w-12 h-12 bg-lion-gold/90 backdrop-blur-lg rounded-full flex items-center justify-center cursor-pointer z-50 shadow-lg"
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0 }}
      animate={{ opacity: showButton ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.div>
  );
};

export default ScrollToTop;
