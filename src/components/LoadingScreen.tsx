
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
      className="fixed inset-0 bg-lion-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
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
