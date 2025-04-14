
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

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
    <AnimatePresence>
      {showButton && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.button
            className="glass-depth-dark w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.6)] border border-white/10 group overflow-hidden"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(212,175,55,0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Enhanced animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-lion-gold/30 to-lion-darkgold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Enhanced animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5, ease: "linear" }}
            />
            
            <ChevronUp className="h-6 w-6 text-white/90 relative z-10 group-hover:text-white transition-colors" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
