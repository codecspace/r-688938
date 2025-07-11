
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
      {/* Clean gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background"></div>
      </motion.div>
      
      <div className="relative z-10 container mx-auto px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
          <motion.h1 
            className="text-5xl md:text-7xl font-display text-foreground mb-6 leading-tight font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Right Home for
            <span className="text-primary font-medium"> Every Lifestyle</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From browsing listings to unlocking your dream home, your journey begins with us—where every search leads to a new beginning.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              className="px-8 py-6 rounded-full"
              size="lg"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 rounded-full"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Minimal scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <motion.div 
            className="w-1 h-1 bg-muted-foreground rounded-full"
            animate={{ 
              y: [0, 3, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 2, 
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
