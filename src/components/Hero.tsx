
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { LucideCircle, LucideStar, LucideSquare, LucideTriangle } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize floating navbar
  useEffect(() => {
    const navbar = document.querySelector(".site-navbar");
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="home" ref={heroRef}>
      {/* Modern 3D background with depth and texture */}
      <div className="absolute inset-0 bg-black">
        {/* Base mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lion-black via-[#20222b] to-[#252734] opacity-90"></div>
        
        {/* Modern noise texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}></div>
        
        {/* Abstract 3D rings */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full border border-white/5 left-1/2 top-1/2"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ 
            rotateZ: 360,
            rotateX: 15,
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full border border-white/5 left-1/2 top-1/2"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ 
            rotateZ: -360,
            rotateX: 25,
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border border-lion-gold/10 left-1/2 top-1/2"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ 
            rotateZ: 360,
            rotateY: 45,
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
      
      {/* Animated floating elements */}
      <motion.div 
        className="absolute top-20 right-[30%] w-32 h-32 rounded-full bg-gradient-to-br from-lion-gold/10 to-white/5 backdrop-blur-xl border border-white/10"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-[15%] w-44 h-44 rounded-full bg-gradient-to-tr from-white/5 to-lion-gold/10 backdrop-blur-xl border border-white/10"
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Modern geometric elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute -top-20 -left-20 text-white/10"
          animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <LucideSquare size={180} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div
          className="absolute top-[40%] right-[10%] text-white/10"
          animate={{ rotate: -360, y: [0, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <LucideCircle size={140} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-[20%] left-[20%] text-lion-gold/20"
          animate={{ rotate: 360, scale: [0.7, 1, 0.7] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <LucideTriangle size={120} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div
          className="absolute top-[15%] left-[40%] text-lion-gold/15"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <LucideStar size={100} strokeWidth={0.5} />
        </motion.div>
      </div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-[120%] w-[100px] bg-gradient-to-b from-lion-gold/5 via-white/5 to-transparent transform -rotate-[30deg] -left-[5%] top-[-10%]"></div>
        <div className="absolute h-[120%] w-[70px] bg-gradient-to-b from-lion-gold/5 via-white/5 to-transparent transform -rotate-[30deg] left-[30%] top-[-10%]"></div>
      </div>
      
      {/* Content section with modern glass effect */}
      <div className="relative z-10 container mx-auto px-8 text-left max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-black/30 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-10 rounded-2xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight brutalist-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Right Home for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-lightgold"> Every Lifestyle</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From browsing listings to unlocking your dream home, your journey begins with us—where every search leads to a new beginning.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              className="bg-gradient-to-br from-lion-gold to-lion-darkgold hover:brightness-110 text-black shadow-lg btn-3d px-8 py-6 rounded-md"
              size="lg"
              onClick={() => scrollToSection('properties')}
            >
              <span className="relative z-10">Explore Properties</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white btn-glow overflow-hidden px-8 py-6 rounded-md shadow-md"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10">Contact Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modern scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-lion-gold rounded-full"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
