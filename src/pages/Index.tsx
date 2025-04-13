
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const [revealElements, setRevealElements] = useState([]);
  const blobRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Dynamic gradient background effect
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.2]);
  const gradientRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  useEffect(() => {
    // Pre-load main content to prevent white flash
    const preloadImages = () => {
      const images = [
        "https://imgur.com/ku5rlCk.jpg",
        "https://i.imgur.com/YQSL3gr.jpg",
        "https://i.imgur.com/VIVNtTM.jpg",
        "https://i.imgur.com/Tm5t9pp.jpg",
        "https://i.imgur.com/1qjWa6d.jpg",
        "https://i.imgur.com/V3ZYKie.jpg",
        "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
        "https://i.postimg.cc/vBpHhk8h/image.png", 
        "https://i.postimg.cc/XqdNzLpb/image.png",
        "https://i.postimg.cc/dVmnGZmN/image.png",
        "https://i.postimg.cc/MHQmHnpD/image.png",
        "https://i.postimg.cc/rF59LRby/image.png",
        "https://i.postimg.cc/nhkYXbp6/image.png",
        "https://i.postimg.cc/d0VRdH0D/image.png",
        "https://i.postimg.cc/vB1W24fs/image.png"
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    // Set document background to black during transition to prevent white flash
    document.body.style.backgroundColor = '#000';
    
    // Reduced loading time to 2.5 seconds for a quicker experience
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reset background color after content is loaded
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 300);
    }, 2500); // Reduced from 5000ms to 2500ms
    
    // Setup scroll reveal observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    // Store elements for cleanup
    setRevealElements(Array.from(elements));
    
    // Mouse move handler for blob animation
    const handleMouseMove = (e) => {
      if (blobRef.current) {
        const { clientX, clientY } = e;
        const x = clientX;
        const y = clientY;
        
        // Delay blob movement for smooth effect
        setTimeout(() => {
          if (blobRef.current) {
            blobRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
          }
        }, 100);
      }
      
      // Update cursor position with smooth transition
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      if (revealElements.length > 0) {
        revealElements.forEach(el => {
          if (el && observer) observer.unobserve(el);
        });
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [revealElements.length]);

  // Update cursor position with smooth animation
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  const handleContactAction = (type) => {
    if (type === "phone") {
      window.location.href = "tel:9773552334";
      toast({
        title: "Dialing...",
        description: "Calling 9773552334",
      });
    } else if (type === "email") {
      // Check if we're on desktop and use Gmail web interface
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      let mailtoUrl = '';
      
      const subject = "Inquiry from Lionvest Realty Website";
      const body = "Hi, I'm interested in knowing more about your services.";
      
      if (!isMobileDevice) {
        // For desktop, open Gmail in browser
        mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sales@lionvestrealty.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
      } else {
        // For mobile, use mailto:
        mailtoUrl = `mailto:sales@lionvestrealty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
      }
      
      toast({
        title: "Opening email client",
        description: "Composing email to sales@lionvestrealty.com",
      });
    }
  };

  // Enhanced SimpleContact component with advanced glassmorphism and claymorphism
  const SimpleContact = () => {
    const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.95, 1]);

    return (
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Enhanced glassmorphism decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-lion-gold/10 filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-lion-gold/15 filter blur-[120px]"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16 reveal-on-scroll"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2 brutalist-text">Get In Touch</h2>
            <h3 className="text-4xl font-display text-lion-black mb-4">Contact Us</h3>
            <div className="h-1 w-24 bg-gradient-to-r from-lion-gold to-lion-lightgold mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to learn more about our properties or have questions? Reach out to us directly!
            </p>
          </motion.div>
          
          <motion.div
            className="clay-gold mb-10 mx-auto max-w-xl overflow-hidden relative"
            style={{ opacity, scale }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Glass shimmer effect overlay */}
            <div className="absolute inset-0 glass-shimmer pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full relative z-10">
              <MagneticButton 
                onClick={() => handleContactAction("phone")}
                className="bg-lion-gold hover:bg-lion-darkgold text-black w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-3 shadow-lg btn-3d"
                icon={<Phone className="h-5 w-5" />}
                label="Call Us"
              />
              
              <MagneticButton 
                onClick={() => handleContactAction("email")}
                className="bg-lion-black hover:bg-lion-darkgray text-white w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-3 shadow-lg btn-glow overflow-hidden relative"
                icon={<Mail className="h-5 w-5" />}
                label="Email Us"
              />
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Magnetic Button Component
  const MagneticButton = ({ onClick, className, icon, label }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Calculate distance from center (0-1)
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt((width/2) * (width/2) + (height/2) * (height/2));
      const distanceRatio = Math.min(distance / maxDistance, 1);
      
      // Scale movement based on distance (stronger when closer)
      const moveX = x * (0.15 - distanceRatio * 0.1);
      const moveY = y * (0.15 - distanceRatio * 0.1);
      
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
          size="lg"
        >
          <span className="relative z-10 flex items-center gap-3">
            {icon}
            {label}
          </span>
        </Button>
      </motion.div>
    );
  };

  return (
    <>
      {/* Dynamic blob background that follows the cursor */}
      <div 
        ref={blobRef}
        className="fixed w-[400px] h-[400px] pointer-events-none z-0 opacity-5 blob-animation" 
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            fill="#D4AF37"
            d="M44.2,-67.2C57.7,-59.6,69.5,-48.6,73.5,-35.3C77.5,-22,73.7,-6.3,69.8,8.5C65.8,23.3,61.7,37.1,53,48.1C44.4,59.1,31.3,67.2,17.7,69C4,70.8,-10.2,66.3,-23.1,60.2C-36,54.2,-47.5,46.5,-53.6,36C-59.6,25.4,-60.1,12.7,-60.2,0C-60.3,-12.8,-60,-25.5,-53.6,-34.9C-47.3,-44.2,-34.9,-50.1,-22.9,-58.1C-10.9,-66.1,0.8,-76.3,14.5,-78.5C28.2,-80.7,55.5,-75,69.6,-63.2C83.7,-51.4,84.8,-33.7,84,-16.7C83.1,0.4,80.4,16.7,70.6,25.9C60.9,35.1,44.1,37.2,30.3,47.1C16.5,57.1,5.7,74.9,-4.9,81.5C-15.5,88.2,-30.9,83.6,-44.6,75.7C-58.3,67.9,-70.2,56.7,-74.4,42.9C-78.6,29.1,-74.9,12.8,-71.7,-2.2C-68.4,-17.3,-65.5,-31.3,-57.8,-42.2C-50.1,-53.1,-37.6,-61,-24.6,-67.9C-11.6,-74.9,1.9,-81,15.9,-79.9C29.8,-78.9,44.3,-70.8,44.2,-67.2Z" 
            animate={{
              d: [
                "M44.2,-67.2C57.7,-59.6,69.5,-48.6,73.5,-35.3C77.5,-22,73.7,-6.3,69.8,8.5C65.8,23.3,61.7,37.1,53,48.1C44.4,59.1,31.3,67.2,17.7,69C4,70.8,-10.2,66.3,-23.1,60.2C-36,54.2,-47.5,46.5,-53.6,36C-59.6,25.4,-60.1,12.7,-60.2,0C-60.3,-12.8,-60,-25.5,-53.6,-34.9C-47.3,-44.2,-34.9,-50.1,-22.9,-58.1C-10.9,-66.1,0.8,-76.3,14.5,-78.5C28.2,-80.7,55.5,-75,69.6,-63.2C83.7,-51.4,84.8,-33.7,84,-16.7C83.1,0.4,80.4,16.7,70.6,25.9C60.9,35.1,44.1,37.2,30.3,47.1C16.5,57.1,5.7,74.9,-4.9,81.5C-15.5,88.2,-30.9,83.6,-44.6,75.7C-58.3,67.9,-70.2,56.7,-74.4,42.9C-78.6,29.1,-74.9,12.8,-71.7,-2.2C-68.4,-17.3,-65.5,-31.3,-57.8,-42.2C-50.1,-53.1,-37.6,-61,-24.6,-67.9C-11.6,-74.9,1.9,-81,15.9,-79.9C29.8,-78.9,44.3,-70.8,44.2,-67.2Z",
                "M63.4,-69.8C79.2,-60.8,87,-37.6,86.9,-17.6C86.8,2.3,78.9,19,68.1,33.1C57.2,47.2,43.2,58.7,27.7,64.1C12.2,69.5,-4.8,68.7,-23.1,65.5C-41.5,62.3,-61.2,56.6,-71.5,43.1C-81.8,29.7,-82.7,8.5,-77.2,-9.6C-71.7,-27.7,-59.9,-42.8,-45,-54C-30.2,-65.1,-12.2,-72.5,6.4,-79.8C25,-87.2,47.5,-94.6,59.3,-86C71.1,-77.4,79.2,-53.8,74.6,-37.8C70,-21.8,52.8,-13.3,52.6,-0.1C52.3,13,69,30.8,65.4,36.9C61.9,43,38.1,37.3,29.4,32.6C20.7,27.9,27.1,24.1,25.6,22.8C24.1,21.4,14.8,22.4,5.4,23.5",
                "M44.2,-67.2C57.7,-59.6,69.5,-48.6,73.5,-35.3C77.5,-22,73.7,-6.3,69.8,8.5C65.8,23.3,61.7,37.1,53,48.1C44.4,59.1,31.3,67.2,17.7,69C4,70.8,-10.2,66.3,-23.1,60.2C-36,54.2,-47.5,46.5,-53.6,36C-59.6,25.4,-60.1,12.7,-60.2,0C-60.3,-12.8,-60,-25.5,-53.6,-34.9C-47.3,-44.2,-34.9,-50.1,-22.9,-58.1C-10.9,-66.1,0.8,-76.3,14.5,-78.5C28.2,-80.7,55.5,-75,69.6,-63.2C83.7,-51.4,84.8,-33.7,84,-16.7C83.1,0.4,80.4,16.7,70.6,25.9C60.9,35.1,44.1,37.2,30.3,47.1C16.5,57.1,5.7,74.9,-4.9,81.5C-15.5,88.2,-30.9,83.6,-44.6,75.7C-58.3,67.9,-70.2,56.7,-74.4,42.9C-78.6,29.1,-74.9,12.8,-71.7,-2.2C-68.4,-17.3,-65.5,-31.3,-57.8,-42.2C-50.1,-53.1,-37.6,-61,-24.6,-67.9C-11.6,-74.9,1.9,-81,15.9,-79.9C29.8,-78.9,44.3,-70.8,44.2,-67.2Z"
              ],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut" 
            }}
          />
        </svg>
      </div>
      
      {/* Custom cursor */}
      <div 
        ref={cursorRef} 
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[999] hidden md:block"
      ></div>
      
      {/* Dynamic background gradient that reacts to scroll */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{ 
          opacity: gradientOpacity, 
          backgroundImage: "linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(255, 255, 255, 0.05), rgba(212, 175, 55, 0.15))",
          rotate: gradientRotation
        }}
      ></motion.div>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-lion-gold to-lion-lightgold"
        style={{
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
      />
      
      <motion.div
        className="fixed bottom-6 right-6 w-12 h-12 bg-lion-gold/90 backdrop-blur-lg rounded-full flex items-center justify-center cursor-pointer z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.div>
      
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {["home", "about", "projects", "properties", "contact"].map((section, i) => (
          <motion.a
            key={section}
            href={`#${section}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
            }}
            className="w-3 h-3 rounded-full bg-white/50 backdrop-blur-sm"
            whileHover={{ scale: 1.4, backgroundColor: "#D4AF37" }}
            animate={{
              scale: scrollYProgress.get() > (i * 0.2) && scrollYProgress.get() < ((i + 1) * 0.2) ? 1.4 : 1,
              backgroundColor: scrollYProgress.get() > (i * 0.2) && scrollYProgress.get() < ((i + 1) * 0.2) ? "#D4AF37" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div 
              key="content"
              className="min-h-screen w-full overflow-hidden bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Navbar />
              <Hero />
              <AboutUs />
              <VisionMission />
              <Projects />
              <Team />
              <FeaturedProperties />
              <SimpleContact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Index;
