
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds as requested
    
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-lion-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ 
          duration: 1.5,
        }}
        className="w-64 h-64 relative"
      >
        <motion.img 
          src="https://imgur.com/ku5rlCk.jpg" 
          alt="Lionvest Realty" 
          className="w-full h-full object-contain"
          animate={{ 
            filter: ["drop-shadow(0 0 0px rgba(212, 175, 55, 0))", 
                     "drop-shadow(0 0 20px rgba(212, 175, 55, 0.7))", 
                     "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))"],
          }}
          transition={{ 
            filter: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }
          }}
        />
        
        <motion.h1 
          className="text-center text-lion-gold font-display text-3xl mt-8 tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                "0 0 5px rgba(212, 175, 55, 0.3)",
                "0 0 15px rgba(212, 175, 55, 0.8)",
                "0 0 5px rgba(212, 175, 55, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Lionvest Realty
          </motion.span>
        </motion.h1>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-lion-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
