
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-lion-black to-zinc-900 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Abstract background elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lion-gold/5 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-white/5 filter blur-[120px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
        
        {/* Main logo container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-8"
        >
          <motion.div
            className="relative w-48 h-48"
            animate={{ 
              filter: ["drop-shadow(0 0 0px rgba(212, 175, 55, 0))", 
                       "drop-shadow(0 0 25px rgba(212, 175, 55, 0.5))", 
                       "drop-shadow(0 0 5px rgba(212, 175, 55, 0.2))"],
            }}
            transition={{ 
              filter: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }
            }}
          >
            <motion.img 
              src="https://i.postimg.cc/CxxJP0fq/logo.webp" 
              alt="Lionvest Realty" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
        
        {/* Elegant text with animation */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1 
            className="text-center font-display text-4xl tracking-wider"
            style={{ 
              background: "linear-gradient(to bottom, #fff 0%, #D4AF37 60%, #85754E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LIONVEST REALTY
          </motion.h1>
          
          {/* Animated line */}
          <motion.div 
            className="mt-4 mx-auto h-[1px] bg-gradient-to-r from-transparent via-lion-gold to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          
          {/* Subtle tagline */}
          <motion.p 
            className="mt-4 text-center text-white/70 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            LUXURY REAL ESTATE
          </motion.p>
        </motion.div>
        
        {/* Loading indicator */}
        <motion.div 
          className="absolute bottom-16 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div 
            className="w-64 h-0.5 bg-white/10 mx-auto rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-lion-gold/40 via-lion-gold to-lion-gold/40"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
