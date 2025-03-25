
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-lion-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }} // Faster fade in
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ 
          duration: 0.8, // Faster logo animation
        }}
        className="w-64 h-64 relative"
      >
        <motion.img 
          src="https://i.postimg.cc/CxxJP0fq/logo.webp" 
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
              duration: 1.2 // Faster glow effect
            }
          }}
        />
      </motion.div>
      
      <motion.div 
        className="mt-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className="text-center font-display text-4xl tracking-wider relative"
          style={{ 
            background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LIONVEST REALTY
        </motion.h1>
        
        {/* Animated shine overlay effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: [0, 0.8, 0], x: 100 }}
          transition={{ 
            duration: 1.2, 
            repeat: 1,
            repeatDelay: 0.8
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            transform: "skewX(-20deg)",
          }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85754E] via-[#D4AF37] to-[#85754E] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
