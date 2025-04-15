
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
        {/* Luxurious background elements with more subtle animations */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lion-gold/10 filter blur-[120px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-white/10 filter blur-[140px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
        
        {/* Main logo container with enhanced luxurious animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0.7, 1, 0.9, 1],
            scale: [0.95, 1, 0.98, 1],
            boxShadow: [
              "0 0 0px rgba(212, 175, 55, 0)",
              "0 0 40px rgba(212, 175, 55, 0.3)",
              "0 0 20px rgba(212, 175, 55, 0.2)",
              "0 0 10px rgba(212, 175, 55, 0.1)"
            ]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative z-10 mb-8"
        >
          <motion.img 
            src="https://i.postimg.cc/CxxJP0fq/logo.webp" 
            alt="Lionvest Realty" 
            className="w-48 h-48 object-contain"
          />
        </motion.div>
        
        {/* Elegant text with refined animation */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 0.9, 1],
            y: [20, 0, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.3 
          }}
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
          
          {/* Animated line with subtle movement */}
          <motion.div 
            className="mt-4 mx-auto h-[1px] bg-gradient-to-r from-transparent via-lion-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ["0%", "200px", "180px", "200px"],
              opacity: [0, 1, 0.8, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5 
            }}
          />
          
          {/* Subtle tagline with gentle animation */}
          <motion.p 
            className="mt-4 text-center text-white/70 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8, 1],
              scale: [0.98, 1, 0.99, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.9 
            }}
          >
            LUXURY REAL ESTATE
          </motion.p>
        </motion.div>
        
        {/* Loading indicator with refined animation */}
        <motion.div 
          className="absolute bottom-16 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.9, 1] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1.2 
          }}
        >
          <motion.div 
            className="w-64 h-0.5 bg-white/10 mx-auto rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-lion-gold/40 via-lion-gold to-lion-gold/40"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "90%", "100%"] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
