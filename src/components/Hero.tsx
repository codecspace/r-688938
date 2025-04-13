
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
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
      {/* Parallax background with gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          y
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-lion-black/90 to-lion-black/50" 
          style={{ opacity }}
        />
        
        {/* Modern blur element */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </motion.div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-28 right-16 w-40 h-40 rounded-full bg-lion-gold/20 backdrop-blur-xl"
        animate={{ 
          y: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      <motion.div 
        className="absolute top-48 left-[10%] w-16 h-16 rounded-full bg-lion-gold/10 backdrop-blur-lg"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <div className="relative z-10 container mx-auto px-8 text-left max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-xl glass-depth-dark p-10 rounded-2xl"
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
              className="bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-black shadow-lg btn-3d px-8 py-6 rounded-md"
              size="lg"
              onClick={() => scrollToSection('properties')}
            >
              <span className="relative z-10">Explore Properties</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white btn-glow overflow-hidden px-8 py-6 rounded-md shadow-md"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10">Contact Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
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
            className="w-1.5 h-1.5 bg-white rounded-full"
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
