
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
      </motion.div>
      
      <motion.div className="mt-8 relative">
        <motion.h1 
          className="text-center font-display text-4xl tracking-wider relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Golden animated text with letter-by-letter animation */}
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              L
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              i
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              o
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              n
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              v
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              e
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              s
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              t
            </motion.span>
          </motion.span>
          <motion.span className="inline-block ml-3 relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              R
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              e
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              l
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              t
            </motion.span>
          </motion.span>
          <motion.span className="inline-block relative overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              style={{ 
                background: "linear-gradient(180deg, #fff 0%, #D4AF37 50%, #85754E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              y
            </motion.span>
          </motion.span>
        </motion.h1>
        
        {/* Animated shine overlay effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ 
            delay: 2.5, 
            duration: 1.5, 
            repeat: Infinity, 
            repeatDelay: 3 
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
        transition={{ duration: 4.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
