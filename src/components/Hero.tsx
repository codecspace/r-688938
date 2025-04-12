
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
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

  // SVG path for the animated wave
  const wavePath = "M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,181.3C672,192,768,192,864,176C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="home" ref={heroRef}>
      {/* Dynamic gradient overlay with noise texture */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          y,
          scale
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-lion-black/90 to-lion-black/50 noise-texture" 
          style={{ opacity }}
        />
        
        {/* Modern blur element */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </motion.div>
      
      {/* Animated blob decorative elements */}
      <motion.div className="absolute top-28 right-16 w-40 h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            fill="#D4AF37"
            initial={{ 
              d: "M47.4,-52.7C58.8,-39.5,64.2,-21.7,64.5,-4.3C64.8,13.2,59.9,30.2,48.6,40.8C37.3,51.3,19.6,55.3,3.4,52.6C-12.9,49.8,-27.7,40.2,-42.6,28.2C-57.5,16.1,-72.3,1.7,-70.3,-11.4C-68.3,-24.5,-49.5,-36.3,-33.6,-48C-17.7,-59.7,-4.4,-71.4,9.3,-71.5C23.1,-71.6,36.1,-60.2,47.4,-47.2Z" 
            }}
            animate={{ 
              d: [
                "M47.4,-52.7C58.8,-39.5,64.2,-21.7,64.5,-4.3C64.8,13.2,59.9,30.2,48.6,40.8C37.3,51.3,19.6,55.3,3.4,52.6C-12.9,49.8,-27.7,40.2,-42.6,28.2C-57.5,16.1,-72.3,1.7,-70.3,-11.4C-68.3,-24.5,-49.5,-36.3,-33.6,-48C-17.7,-59.7,-4.4,-71.4,9.3,-71.5C23.1,-71.6,36.1,-60.2,47.4,-47.2Z",
                "M56.9,-57.5C71.2,-48.5,78.7,-28.5,77.5,-10.3C76.3,7.9,66.4,24.4,54.1,33.1C41.9,41.9,27.2,43.1,11.4,49.2C-4.4,55.4,-21.5,66.8,-35.2,64C-48.9,61.2,-59.3,44.3,-65.3,26.7C-71.3,9.1,-72.8,-9.1,-68,-26C-63.3,-42.8,-52.3,-58.1,-38,-63.7C-23.7,-69.2,-5.9,-64.9,9.6,-62.2C25,-59.4,42.6,-58.2,56.9,-48.5Z",
                "M40.1,-41.5C50.3,-28.8,56,-14.4,57.5,1.5C59,17.4,56.5,34.8,46.3,42.6C36.1,50.5,18,48.9,0.2,48.7C-17.7,48.5,-35.4,49.6,-47.7,41.6C-59.9,33.6,-66.8,16.8,-65.4,1.3C-64.1,-14.1,-54.6,-28.1,-42.3,-40.7C-30.1,-53.4,-15,-64.7,0,-64.7C15.1,-64.7,30.1,-53.4,40.1,-41.5Z",
                "M47.4,-52.7C58.8,-39.5,64.2,-21.7,64.5,-4.3C64.8,13.2,59.9,30.2,48.6,40.8C37.3,51.3,19.6,55.3,3.4,52.6C-12.9,49.8,-27.7,40.2,-42.6,28.2C-57.5,16.1,-72.3,1.7,-70.3,-11.4C-68.3,-24.5,-49.5,-36.3,-33.6,-48C-17.7,-59.7,-4.4,-71.4,9.3,-71.5C23.1,-71.6,36.1,-60.2,47.4,-47.2Z"
              ] 
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
      
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-lightgold dynamic-gradient"> Every Lifestyle</span>
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
            <MagneticButton 
              className="bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-black shadow-lg btn-3d px-8 py-6 rounded-md"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </MagneticButton>
            <MagneticButton 
              variant="outline" 
              className="border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white btn-glow overflow-hidden px-8 py-6 rounded-md shadow-md"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated SVG wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <motion.svg
          viewBox="0 0 1440 320"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.path
            fill="#D4AF37"
            fillOpacity="0.2"
            d={wavePath}
            animate={{
              d: [
                wavePath,
                "M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,117.3C672,117,768,171,864,192C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                wavePath
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
      
      {/* Enhanced scroll indicator */}
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

// Magnetic Button Component
const MagneticButton = ({ children, onClick, className, variant }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Calculate distance from center (0-1)
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.sqrt((width/2) * (width/2) + (height/2) * (height/2));
    const distanceRatio = Math.min(distance / maxDistance, 1);
    
    // Scale movement based on distance (stronger when closer)
    const moveX = x * (0.2 - distanceRatio * 0.1);
    const moveY = y * (0.2 - distanceRatio * 0.1);
    
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      className="relative inline-block" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: position.x, 
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      <Button 
        onClick={onClick} 
        className={className}
        variant={variant}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};

export default Hero;
